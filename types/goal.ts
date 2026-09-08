// 공동 목표 도메인 타입. 온보딩 5단계 설문 값 + 서버 산출값(R·성향·진척률).
// 문항/선택지/배점 정의는 docs/api-spec.md 부록(온보딩 설문 문항 정의)이 진실.

// 3/5. 비상자금(생활비 기준 개월수).
export type EmergencyFundMonths = 'UNDER_1M' | 'M1_3' | 'M3_6' | 'M6_12' | 'OVER_12M';

// 3/5. 월 소득에서 필수지출·대출상환 제외 후 남는 비율.
export type MonthlySurplusBand = 'UNDER_0' | 'UNDER_10' | 'B10_20' | 'B20_30' | 'OVER_30';

// 4/5. 최대 허용손실(%). 40 = 30% 초과도 감수.
export type MaxAllowedLossRate = 0 | 5 | 10 | 20 | 30 | 40;

// 4/5. 시장 20% 급락 시 예상 행동.
export type LossReaction = 'SELL_ALL' | 'SELL_MOST' | 'SELL_PART' | 'HOLD' | 'BUY_MORE';

// 5/5. 투자 경험·지식 수준.
export type InvestmentExperience =
  | 'NONE'
  | 'SAVINGS_ONLY'
  | 'ETF_ONLY'
  | 'STOCK_ALL'
  | 'MULTI_ASSET';

// 서버가 산출하는 커플 공동 투자성향. 화면에는 jointRiskProfileTypeLabel 을 그대로 쓴다.
export type JointRiskProfileType =
  | 'STABLE'
  | 'STABLE_SEEKING'
  | 'NEUTRAL'
  | 'ACTIVE'
  | 'AGGRESSIVE';

export type GoalStatus = 'ACTIVE' | 'ACHIEVED' | 'CANCELLED';

export interface GoalProgress {
  rate: number;
  remainingAmount: number;
  remainingMonths: number;
  requiredMonthlyAmount: number;
}

export interface Goal {
  goalId: number;
  coupleId: number;
  targetAmount: number;
  targetDate: string;
  currentAmount: number;
  currentAmountUpdatedAt: string;
  monthlyInvestableAmount: number;
  investmentPeriodMonths: number;
  emergencyFundMonths: EmergencyFundMonths;
  monthlySurplusBand: MonthlySurplusBand;
  maxAllowedLossRate: MaxAllowedLossRate;
  lossReaction: LossReaction;
  investmentExperience: InvestmentExperience;
  riskProfileScore: number;
  jointRiskProfileType: JointRiskProfileType;
  jointRiskProfileTypeLabel: string;
  status: GoalStatus;
  progress: GoalProgress;
  hasReport: boolean;
  createdAt: string;
  updatedAt: string | null;
}
