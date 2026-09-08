import type {
  EmergencyFundMonths,
  GoalStatus,
  InvestmentExperience,
  JointRiskProfileType,
  LossReaction,
  MaxAllowedLossRate,
  MonthlySurplusBand,
} from '@/types/goal';
import type { OnboardingStep } from '@/types/onboarding';

// 공동 목표 API DTO. 백엔드 스펙(docs/api-spec.md - 공동 목표)이 진실이다.

// POST /goals — 온보딩 5단계 폼 제출.
export interface GoalOnboardingRequestDto {
  targetAmount: number;
  targetDate: string;
  currentAmount: number;
  monthlyInvestableAmount: number;
  emergencyFundMonths: EmergencyFundMonths;
  monthlySurplusBand: MonthlySurplusBand;
  maxAllowedLossRate: MaxAllowedLossRate;
  lossReaction: LossReaction;
  investmentExperience: InvestmentExperience;
}

// PATCH /goals/me — 마이페이지 부분 수정.
export type GoalPatchRequestDto = Partial<GoalOnboardingRequestDto>;

export interface GoalProgressDto {
  rate: number;
  remainingAmount: number;
  remainingMonths: number;
  requiredMonthlyAmount: number;
}

// POST /goals · GET /goals/me · PATCH /goals/me 공통 응답.
export interface GoalResponseDto {
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
  progress: GoalProgressDto;
  // POST /goals 응답에만 포함.
  onboardingStep?: OnboardingStep;
  // GET /goals/me 응답에만 포함.
  hasReport?: boolean;
  createdAt: string;
  updatedAt?: string;
}

// PATCH /goals/me/current-amount
export interface GoalCurrentAmountRequestDto {
  currentAmount: number;
}

export interface GoalCurrentAmountResponseDto {
  goalId: number;
  currentAmount: number;
  currentAmountUpdatedAt: string;
  status: GoalStatus;
  progress: GoalProgressDto;
}
