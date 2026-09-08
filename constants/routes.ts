import type { OnboardingStep } from '@/types/onboarding';

// 라우트 이름. router.push 문자열 하드코딩 대신 이 상수를 쓴다.
export const ROUTE_NAMES = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  TERMS: 'signup-terms',
  ONBOARDING: 'onboarding',
  HOME: 'home',
} as const;

export type RouteName = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES];

// onboardingStep 값에 따라 이동할 라우트. 온보딩은 단일 뷰라 DONE 만 홈으로 분기한다.
export const ONBOARDING_STEP_ROUTE = {
  FINANCIAL_INFO: ROUTE_NAMES.ONBOARDING,
  INVESTMENT_PROFILE: ROUTE_NAMES.ONBOARDING,
  DONE: ROUTE_NAMES.HOME,
} as const satisfies Record<OnboardingStep, RouteName>;
