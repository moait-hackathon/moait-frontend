import { createRouter, createWebHistory } from 'vue-router';

import { ROUTE_NAMES } from '@/constants/routes';
import LoginView from '@/views/auth/LoginView.vue';
import SignupView from '@/views/auth/SignupView.vue';
import TermDetailView from '@/views/auth/TermDetailView.vue';
import HomeView from '@/views/HomeView.vue';
import OnboardingView from '@/views/onboarding/OnboardingView.vue';
import AiChatView from '@/views/ai/AiChatView.vue';

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
    { path: '/onboarding', name: ROUTE_NAMES.ONBOARDING, component: OnboardingView },
    { path: '/home', name: ROUTE_NAMES.HOME, component: HomeView },
    { path: '/ai', name: 'ai', component: AiChatView },
    { path: '/:pathMatch(.*)*', redirect: { name: ROUTE_NAMES.HOME } },
  ],
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
