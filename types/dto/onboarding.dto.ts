import type {
  HoldingAssetType,
  InvestmentExperience,
  InvestmentHorizon,
  LossReaction,
  OnboardingStep,
  RiskProfileType,
} from '@/types/onboarding';

export interface FinancialInfoRequestDto {
  annualIncome: number;
  totalAsset: number;
}

export interface FinancialInfoResponseDto {
  onboardingStep: OnboardingStep;
}

export interface HoldingAssetDto {
  type: HoldingAssetType;
  amount: number;
}

export interface InvestmentProfileRequestDto {
  investmentExperience: InvestmentExperience;
  lossReaction: LossReaction;
  maxTolerableLossRate: number;
  investmentHorizon: InvestmentHorizon;
  holdingAssets: HoldingAssetDto[];
  monthlyInvestableAmount: number;
  emergencyFundSecured: boolean;
}

export interface InvestmentProfileResponseDto {
  investmentProfileId: number;
  riskProfileType: RiskProfileType;
  riskProfileTypeLabel: string;
  riskProfileScore: number;
  summary: string;
  onboardingStep: OnboardingStep;
}
