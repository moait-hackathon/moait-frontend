// 온보딩 진행 단계. 회원가입/로그인 응답과 각 온보딩 API 응답으로 전달된다.
export type OnboardingStep = 'FINANCIAL_INFO' | 'INVESTMENT_PROFILE' | 'DONE';

// 산출된 투자성향 유형. 화면에는 응답의 riskProfileTypeLabel 을 그대로 쓴다.
export type RiskProfileType = 'STABLE' | 'STABLE_SEEKING' | 'NEUTRAL' | 'ACTIVE' | 'AGGRESSIVE';

// Q1. 투자 경험.
export type InvestmentExperience = 'NONE' | 'SAVINGS_ONLY' | 'ETF_ONLY' | 'STOCK_ALL' | 'ETC';

// Q2. 손실 발생 시 대응.
export type LossReaction = 'SELL_ALL' | 'SELL_PART' | 'HOLD' | 'BUY_MORE';

// Q4. 투자 가능 기간.
export type InvestmentHorizon = 'UNDER_1Y' | 'Y1_3' | 'Y3_5' | 'OVER_5Y';

// Q5. 보유 투자자산 자산군.
export type HoldingAssetType =
  | 'DEPOSIT'
  | 'SAVINGS'
  | 'BOND'
  | 'FUND'
  | 'ETF'
  | 'STOCK'
  | 'PENSION'
  | 'CRYPTO'
  | 'CASH'
  | 'OTHER';
