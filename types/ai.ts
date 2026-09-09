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
  userLimit: number | null;
  serviceLimit: number | null;
  finalLimit: number | null;
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
  requiredAnnualReturnRate: number | null;
  rangeMin: number | null;
  rangeMax: number | null;
  realistic: boolean;
  investmentMonths: number;
  calculationMethod: string;
  calculationMethodLabel: string;
}

export interface InvestmentAgreement {
  status: string;
  statusLabel: string;
  recommendedRiskScore: number | null;
  summary: string;
  rationale: string;
  recommendedStrategy: string | null;
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
