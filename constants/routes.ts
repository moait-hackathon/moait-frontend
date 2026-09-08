import type { OnboardingStep } from '@/types/onboarding';

// 라우트 이름. router.push 문자열 하드코딩 대신 이 상수를 쓴다.
export const ROUTE_NAMES = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  TERMS: 'signup-terms',
  COUPLE_CONNECT: 'couple-connect',
  GOAL_ONBOARDING: 'goal-onboarding',
  HOME: 'home',
} as const;

export type RouteName = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES];

// onboardingStep 값에 따라 이동할 라우트.
// COUPLE_CONNECT → 커플 연결, GOAL_ONBOARDING → 공동 목표 5단계, DONE → 홈.
export const ONBOARDING_STEP_ROUTE = {
  COUPLE_CONNECT: ROUTE_NAMES.COUPLE_CONNECT,
  GOAL_ONBOARDING: ROUTE_NAMES.GOAL_ONBOARDING,
  DONE: ROUTE_NAMES.HOME,
} as const satisfies Record<OnboardingStep, RouteName>;
