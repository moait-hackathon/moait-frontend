export type AiChatRole = 'assistant' | 'user';

export interface AiChatMessage {
  id: number;
  role: AiChatRole;
  content: string;
}

export interface AiFeature {
  title: string;
  description: string;
  icon: 'wallet' | 'chart';
}

export interface RiskScore {
  preferenceScore: number;
  userLimit: number;
  serviceLimit: number;
  finalLimit: number;
  profileType: string;
  profileTypeLabel: string;
}

export interface RiskRecommendation {
  weightedScore: number;
  centerScore: number;
  rangeMin: number;
  rangeMax: number;
  finalMax: number;
}

export interface GoalRequirement {
  requiredAnnualReturnRate: number;
  rangeMin: number;
  rangeMax: number;
  realistic: boolean;
  investmentMonths: number;
  calculationMethod: string;
  calculationMethodLabel: string;
}

export interface InvestmentAgreement {
  status: string;
  statusLabel: string;
  recommendedRiskScore: number;
  summary: string;
  rationale: string;
  recommendedStrategy: string;
  alternatives: string[];
  cautions: string[];
  aiGenerated: boolean;
}

export interface InvestmentAgreementAnalysis {
  personA: RiskScore;
  personB: RiskScore;
  jointFund: RiskScore;
  recommendation: RiskRecommendation;
  goalRequirement: GoalRequirement;
  agreement: InvestmentAgreement;
}
