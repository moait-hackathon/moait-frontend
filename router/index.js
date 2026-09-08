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

const PUBLIC_ROUTE_NAMES = [ROUTE_NAMES.LOGIN, ROUTE_NAMES.SIGNUP, ROUTE_NAMES.TERMS];

// 온보딩 단계별로 머물러야 하는 라우트. 다른 온보딩/홈 화면 접근 시 되돌린다.
const STEP_ALLOWED_ROUTE_NAMES = {
  COUPLE_CONNECT: [ROUTE_NAMES.COUPLE_CONNECT],
  GOAL_ONBOARDING: [ROUTE_NAMES.COUPLE_CONNECT, ROUTE_NAMES.GOAL_ONBOARDING],
  DONE: [ROUTE_NAMES.HOME],
};

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
    { path: '/:pathMatch(.*)*', redirect: { name: ROUTE_NAMES.HOME } },
  ],
  scrollBehavior: () => ({ top: 0 }),
});

// 인증 가드. 토큰이 없으면 비공개 라우트 접근을 막고, 로그인된 사용자는 인증 화면에서 되돌린다.
// (온보딩 단계 기반 차단은 PR-2/PR-3 에서 확장)
router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  await authStore.init();

  const authed = hasAccessToken();
  const isPublic = PUBLIC_ROUTE_NAMES.includes(to.name);

  if (!authed && !isPublic) {
    return { name: ROUTE_NAMES.LOGIN };
  }

  if (!authed) return true;

  const step = authStore.onboardingStep;

  if (to.name === ROUTE_NAMES.LOGIN || to.name === ROUTE_NAMES.SIGNUP) {
    return { name: ONBOARDING_STEP_ROUTE[step ?? 'COUPLE_CONNECT'] };
  }

  // 진행 단계를 아는 경우에만 게이팅한다(모르면 통과시켜 화면에서 처리).
  if (step && !STEP_ALLOWED_ROUTE_NAMES[step].includes(to.name)) {
    return { name: ONBOARDING_STEP_ROUTE[step] };
  }

  return true;
});

export default router;
