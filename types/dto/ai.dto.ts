export interface InvestmentAgreementRequestDto {
  userId: number;
}

export interface RiskScoreResponseDto {
  preferenceScore: number;
  userLimit: number | null;
  serviceLimit: number | null;
  finalLimit: number | null;
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
  requiredAnnualReturnRate: number | null;
  rangeMin: number | null;
  rangeMax: number | null;
  realistic: boolean;
  investmentMonths: number;
  calculationMethod: string;
}

export interface AgreementResponseDto {
  status: string;
  recommendedRiskScore: number | null;
  summary: string;
  rationale: string;
  recommendedStrategy: string | null;
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
