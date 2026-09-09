import type {
  EmergencyFundMonths,
  InvestmentExperience,
  JointRiskProfileType,
  LossReaction,
  MaxAllowedLossRate,
  MonthlySurplusBand,
} from '@/types/goal';

interface Option<T> {
  value: T;
  label: string;
}

// 공동 목표 온보딩은 5단계. (1·2단계 = 목표/계획 입력, 3~5단계 = 위험성향 문항)
export const GOAL_ONBOARDING_TOTAL_STEPS = 5;

// 3/5. "비상자금은 생활비 기준 몇 개월치인가요?"
export const EMERGENCY_FUND_MONTHS_OPTIONS = [
  { value: 'UNDER_1M', label: '1개월 미만' },
  { value: 'M1_3', label: '1~3개월' },
  { value: 'M3_6', label: '3~6개월' },
  { value: 'M6_12', label: '6~12개월' },
  { value: 'OVER_12M', label: '12개월 이상' },
] as const satisfies readonly Option<EmergencyFundMonths>[];

// 3/5. "한 달 소득에서 필수지출·대출상환을 빼면 얼마나 남나요?"
export const MONTHLY_SURPLUS_BAND_OPTIONS = [
  { value: 'UNDER_0', label: '거의 남지 않거나 부족함' },
  { value: 'UNDER_10', label: '10% 미만' },
  { value: 'B10_20', label: '10~20% 미만' },
  { value: 'B20_30', label: '20~30% 미만' },
  { value: 'OVER_30', label: '30% 이상' },
] as const satisfies readonly Option<MonthlySurplusBand>[];

// 4/5. "투자금이 일시적으로 얼마나 하락해도 계획을 유지할 수 있나요?" (전송값은 숫자)
export const MAX_ALLOWED_LOSS_RATE_OPTIONS = [
  { value: 0, label: '원금손실을 원하지 않음' },
  { value: 5, label: '5% 이내' },
  { value: 10, label: '10% 이내' },
  { value: 20, label: '20% 이내' },
  { value: 30, label: '30% 이내' },
  { value: 40, label: '30%를 초과해도 감수할 수 있음' },
] as const satisfies readonly Option<MaxAllowedLossRate>[];

// 4/5. "시장이 20% 급락한다면 어떻게 행동할 가능성이 큰가요?"
export const LOSS_REACTION_OPTIONS = [
  { value: 'SELL_ALL', label: '전부 매도한다' },
  { value: 'SELL_MOST', label: '대부분 매도한다' },
  { value: 'SELL_PART', label: '일부 매도한다' },
  { value: 'HOLD', label: '그대로 유지한다' },
  { value: 'BUY_MORE', label: '추가 매수한다' },
] as const satisfies readonly Option<LossReaction>[];

// 5/5. "현재 나와 가장 가까운 설명을 선택해주세요"
export const INVESTMENT_EXPERIENCE_OPTIONS = [
  { value: 'NONE', label: '투자 경험이 없고 기본 개념이 익숙하지 않다' },
  { value: 'SAVINGS_ONLY', label: '예·적금 위주이며 기본 금융용어를 알고 있다' },
  { value: 'ETF_ONLY', label: '펀드·ETF 경험이 있고 분산투자와 원금손실을 이해한다' },
  { value: 'STOCK_ALL', label: '주식·채권 경험이 있고 변동성과 투자비용을 이해한다' },
  { value: 'MULTI_ASSET', label: '여러 자산에 투자해봤고 위험관리와 리밸런싱을 이해한다' },
] as const satisfies readonly Option<InvestmentExperience>[];

// 2/5. 월 투자 가능 금액 빠른 선택(원).
export const MONTHLY_INVESTABLE_QUICK_AMOUNTS = [100_000, 300_000, 500_000, 1_000_000] as const;

// 금액 입력 상한(원).
export const GOAL_AMOUNT_LIMITS = {
  TARGET_AMOUNT: 100_000_000_000,
  CURRENT_AMOUNT: 100_000_000_000,
  MONTHLY_INVESTABLE: 1_000_000_000,
} as const;

// jointRiskProfileType 한글명. 응답 label 이 비었을 때의 fallback.
export const JOINT_RISK_PROFILE_TYPE_LABEL = {
  STABLE: '안정형',
  STABLE_SEEKING: '안정추구형',
  NEUTRAL: '위험중립형',
  ACTIVE: '적극투자형',
  AGGRESSIVE: '공격투자형',
} as const satisfies Record<JointRiskProfileType, string>;

// 유형별 결과 이미지. 파일은 public/risk-profile/ 에 둔다.
export const JOINT_RISK_PROFILE_TYPE_IMAGE = {
  STABLE: '/risk-profile/stable.png',
  STABLE_SEEKING: '/risk-profile/stable-seeking.png',
  NEUTRAL: '/risk-profile/neutral.png',
  ACTIVE: '/risk-profile/active.png',
  AGGRESSIVE: '/risk-profile/aggressive.png',
} as const satisfies Record<JointRiskProfileType, string>;
