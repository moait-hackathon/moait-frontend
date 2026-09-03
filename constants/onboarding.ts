import type {
  HoldingAssetType,
  InvestmentExperience,
  InvestmentHorizon,
  LossReaction,
} from '@/types/onboarding';

interface Option<T> {
  value: T;
  label: string;
}

// Q1. 투자 경험이 어느 정도인가요?
export const INVESTMENT_EXPERIENCE_OPTIONS = [
  { value: 'NONE', label: '없다' },
  { value: 'SAVINGS_ONLY', label: '예적금만 해봤다' },
  { value: 'ETF_ONLY', label: 'ETF만 해봤다' },
  { value: 'STOCK_ALL', label: '주식까지 다 해봤다' },
  { value: 'ETC', label: '기타' },
] as const satisfies readonly Option<InvestmentExperience>[];

// Q2. 투자 손실이 발생하면 어떻게 대응하나요?
export const LOSS_REACTION_OPTIONS = [
  { value: 'SELL_ALL', label: '전량 매도한다' },
  { value: 'SELL_PART', label: '일부 매도한다' },
  { value: 'HOLD', label: '그대로 보유한다' },
  { value: 'BUY_MORE', label: '추가 매수한다' },
] as const satisfies readonly Option<LossReaction>[];

// Q3. 감당할 수 있는 최대 손실률은? (전송값은 숫자)
export const MAX_TOLERABLE_LOSS_RATE_OPTIONS = [
  { value: 0, label: '원금 손실은 안 된다' },
  { value: 5, label: '-5% 이내' },
  { value: 10, label: '-10% 이내' },
  { value: 20, label: '-20% 이내' },
  { value: 30, label: '-30% 이내' },
  { value: 40, label: '-30% 이상도 감내' },
] as const satisfies readonly Option<number>[];

// Q4. 투자 가능 기간은?
export const INVESTMENT_HORIZON_OPTIONS = [
  { value: 'UNDER_1Y', label: '1년 미만' },
  { value: 'Y1_3', label: '1~3년' },
  { value: 'Y3_5', label: '3~5년' },
  { value: 'OVER_5Y', label: '5년 이상' },
] as const satisfies readonly Option<InvestmentHorizon>[];

// Q5. 보유 투자자산 자산군.
export const HOLDING_ASSET_TYPE_OPTIONS = [
  { value: 'DEPOSIT', label: '예금' },
  { value: 'SAVINGS', label: '적금' },
  { value: 'BOND', label: '채권' },
  { value: 'FUND', label: '펀드' },
  { value: 'ETF', label: 'ETF' },
  { value: 'STOCK', label: '주식' },
  { value: 'PENSION', label: '연금' },
  { value: 'CRYPTO', label: '가상자산' },
  { value: 'CASH', label: '현금' },
  { value: 'OTHER', label: '기타' },
] as const satisfies readonly Option<HoldingAssetType>[];

// 금액 입력 상한(원).
export const AMOUNT_LIMITS = {
  ANNUAL_INCOME: 1_000_000_000,
  TOTAL_ASSET: 100_000_000_000,
  MONTHLY_INVESTABLE: 1_000_000_000,
  HOLDING_ASSET: 1_000_000_000,
} as const;
