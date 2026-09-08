import { createRouter, createWebHistory } from 'vue-router';

import { ONBOARDING_STEP_ROUTE, ROUTE_NAMES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import { hasAccessToken } from '@/utils/auth';
import LoginView from '@/views/auth/LoginView.vue';
import SignupView from '@/views/auth/SignupView.vue';
import TermDetailView from '@/views/auth/TermDetailView.vue';
import HomeView from '@/views/HomeView.vue';
import CoupleConnectView from '@/views/onboarding/CoupleConnectView.vue';
import GoalOnboardingView from '@/views/onboarding/GoalOnboardingView.vue';
import AiChatView from '@/views/ai/AiChatView.vue';

const PUBLIC_ROUTE_NAMES = [ROUTE_NAMES.LOGIN, ROUTE_NAMES.SIGNUP, ROUTE_NAMES.TERMS];

// 온보딩 미완료 단계에서 머물 수 있는 라우트. 그 외 화면 접근 시 현재 단계로 되돌린다.
const STEP_ALLOWED_ROUTE_NAMES = {
  COUPLE_CONNECT: [ROUTE_NAMES.COUPLE_CONNECT],
  GOAL_ONBOARDING: [ROUTE_NAMES.COUPLE_CONNECT, ROUTE_NAMES.GOAL_ONBOARDING],
};

// 온보딩 완료(DONE) 후에는 다시 들어가면 안 되는 온보딩 라우트.
const ONBOARDING_ROUTE_NAMES = [ROUTE_NAMES.COUPLE_CONNECT, ROUTE_NAMES.GOAL_ONBOARDING];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: ROUTE_NAMES.HOME } },
    { path: '/login', name: ROUTE_NAMES.LOGIN, component: LoginView },
    { path: '/signup', name: ROUTE_NAMES.SIGNUP, component: SignupView },
    {
      path: '/signup/terms/:termsType',
      name: ROUTE_NAMES.TERMS,
      component: TermDetailView,
    },
    {
      path: '/onboarding/couple',
      name: ROUTE_NAMES.COUPLE_CONNECT,
      component: CoupleConnectView,
    },
    {
      path: '/onboarding/goal',
      name: ROUTE_NAMES.GOAL_ONBOARDING,
      component: GoalOnboardingView,
    },
    { path: '/home', name: ROUTE_NAMES.HOME, component: HomeView },
    { path: '/ai', name: 'ai', component: AiChatView },
    { path: '/:pathMatch(.*)*', redirect: { name: ROUTE_NAMES.HOME } },
  ],
  scrollBehavior: () => ({ top: 0 }),
});

// 인증 가드. 토큰이 없으면 비공개 라우트 접근을 막고, 온보딩 단계에 따라 화면을 고정한다.
router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  await authStore.init();

  const authed = hasAccessToken();
  const isPublic = PUBLIC_ROUTE_NAMES.includes(to.name);

  if (!authed) {
    return isPublic ? true : { name: ROUTE_NAMES.LOGIN };
  }

  const step = authStore.onboardingStep;

  if (to.name === ROUTE_NAMES.LOGIN || to.name === ROUTE_NAMES.SIGNUP) {
    return { name: ONBOARDING_STEP_ROUTE[step ?? 'COUPLE_CONNECT'] };
  }

  // 온보딩 미완료: 현재 단계 화면 밖으로 못 나가게 막는다. (단계를 모르면 통과)
  if (step && step !== 'DONE' && !STEP_ALLOWED_ROUTE_NAMES[step].includes(to.name)) {
    return { name: ONBOARDING_STEP_ROUTE[step] };
  }

  // 온보딩 완료: 온보딩 화면으로 되돌아가지 못하게 막는다.
  if (step === 'DONE' && ONBOARDING_ROUTE_NAMES.includes(to.name)) {
    return { name: ROUTE_NAMES.HOME };
  }

  return true;
});

export default router;
