export type LossToleranceDto =
  'NO_LOSS' | 'UP_TO_5' | 'UP_TO_10' | 'UP_TO_20' | 'UP_TO_30' | 'OVER_30';

export type CapitalProtectionDto = 'P100' | 'P95' | 'P90' | 'P80' | 'BELOW_80';

export type AnalysisLossReactionDto = 'SELL_ALL' | 'SELL_MOST' | 'SELL_PART' | 'HOLD' | 'BUY_MORE';

export type PsychologicalBurdenDto =
  'VERY_ANXIOUS' | 'ANXIOUS_AT_5' | 'TOLERATE_10' | 'TOLERATE_20';

export type IncomeStabilityDto =
  'NONE' | 'HIGHLY_VARIABLE' | 'POSSIBLY_DECREASING' | 'STABLE' | 'MULTIPLE_STABLE';

export type PlannedExpenseDto = 'NONE' | 'SOME' | 'MOST';

export type AnalysisInvestmentHorizonDto = 'UNDER_1Y' | 'Y1_2' | 'Y3_5' | 'Y5_10' | 'OVER_10Y';

export type WithdrawalPlanDto = 'NONE' | 'FIXED_PARTIAL' | 'FULL';

export type AnalysisInvestmentExperienceDto =
  'NONE' | 'SAVINGS_ONLY' | 'BOND_FUND_ETF' | 'STOCK' | 'DERIVATIVES';

export interface RiskAssessmentRequestDto {
  lossTolerance: LossToleranceDto;
  capitalProtection: CapitalProtectionDto;
  lossReaction: AnalysisLossReactionDto;
  psychologicalBurden: PsychologicalBurdenDto;
  emergencyFundMonths: number;
  incomeStability: IncomeStabilityDto;
  fixedCostRatio: number;
  investmentAssetRatio: number;
  plannedExpense: PlannedExpenseDto;
  investmentHorizon: AnalysisInvestmentHorizonDto;
  withdrawalPlan: WithdrawalPlanDto;
  investmentExperience: AnalysisInvestmentExperienceDto;
  financialKnowledgeCorrectAnswers: number;
}

export interface GoalAnalysisRequestDto {
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  additionalDeposit: number;
  plannedWithdrawal: number;
  estimatedFeesAndTaxes: number;
  targetDate: string;
}

export interface InvestmentAgreementRequestDto {
  personA: RiskAssessmentRequestDto;
  personB: RiskAssessmentRequestDto;
  jointFund: RiskAssessmentRequestDto;
  goal: GoalAnalysisRequestDto;
}

export interface RiskScoreResponseDto {
  preferenceScore: number;
  userLimit: number;
  serviceLimit: number;
  finalLimit: number;
  profileType: string;
}

export interface RecommendationResponseDto {
  weightedScore: number;
  centerScore: number;
  rangeMin: number;
  rangeMax: number;
  finalMax: number;
}

export interface GoalRequirementResponseDto {
  requiredAnnualReturnRate: number;
  rangeMin: number;
  rangeMax: number;
  realistic: boolean;
  investmentMonths: number;
  calculationMethod: string;
}

export interface AgreementResponseDto {
  status: string;
  recommendedRiskScore: number;
  summary: string;
  rationale: string;
  recommendedStrategy: string;
  alternatives: string[];
  cautions: string[];
  aiGenerated: boolean;
}

export interface InvestmentAgreementResponseDto {
  personA: RiskScoreResponseDto;
  personB: RiskScoreResponseDto;
  jointFund: RiskScoreResponseDto;
  recommendation: RecommendationResponseDto;
  goalRequirement: GoalRequirementResponseDto;
  agreement: AgreementResponseDto;
}
