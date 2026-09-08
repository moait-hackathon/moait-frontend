// 온보딩 진행 단계. 회원가입/로그인 응답과 GET /couples/me 응답으로 전달된다.
// COUPLE_CONNECT → 커플 연결, GOAL_ONBOARDING → 공동 목표 5단계, DONE → 완료.
export type OnboardingStep = 'COUPLE_CONNECT' | 'GOAL_ONBOARDING' | 'DONE';
