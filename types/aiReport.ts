// AI 투자 합의안 리포트 도메인 타입.
// DTO(types/dto/aiReport.dto.ts)를 화면에서 쓰기 좋게 옮기고, 파생값(needsAdjustment 등)을 더한 형태.

import type {
  AdjustmentType,
  AgreementStatus,
  HeadlineTone,
  RiskProfileType,
  StrategyKey,
} from '@/types/dto/aiReport.dto';

export type { AdjustmentType, AgreementStatus, HeadlineTone, RiskProfileType, StrategyKey };

export interface SeriesPoint {
  x: number;
  y: number;
}

export interface PersonRisk {
  preferenceScore: number;
  userLimit: number;
  serviceLimit: number;
  finalLimit: number;
  profileType: RiskProfileType;
}

export interface ReportPerson extends PersonRisk {
  name: string;
  profileTypeLabel: string;
}

export interface AgreedProfile {
  score: number;
  profileType: RiskProfileType;
  profileTypeLabel: string;
  summary: string;
}

export interface Recommendation {
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
}

export interface Agreement {
  status: AgreementStatus;
  recommendedRiskScore: number | null;
  summary: string;
  rationale: string;
  recommendedStrategy: string | null;
  alternatives: string[];
  cautions: string[];
  aiGenerated: boolean;
}

export interface ReportMeta {
  reportDate: string;
  targetAmount: number;
  investmentMonths: number;
}

export interface Headline {
  tone: HeadlineTone;
  title: string;
  titleHighlight: string;
  description: string;
  summaryTitle: string;
  summaryHighlight: string;
  summaryDescription: string;
}

export interface GoalProjection {
  targetAmount: number;
  projectedAmount: number;
  gapAmount: number;
  timelineStart: string;
  timelineNow: string;
  timelineEnd: string;
  caption: string;
  actualSeries: SeriesPoint[];
  idealSeries: SeriesPoint[];
  projectedSeries: SeriesPoint[];
}

export interface RiskReason {
  body: string;
  preferredScore: number;
  maxScore: number;
  requiredMin: number;
  requiredMax: number;
  callout: string;
}

export interface AdjustmentOption {
  type: AdjustmentType;
  title: string;
  fromLabel: string;
  toLabel: string;
  keeps: string;
}

export interface GoalDiagnosis {
  currentAmount: number;
  targetAmount: number;
  projectedAmount: number;
  gapAmount: number;
}

export interface PeerComparison {
  readinessRate: number;
  ourSavings: number;
  peerAverageSavings: number;
  percentileLabel: string;
  note: string;
}

export interface PlanComparison {
  currentPlanAmount: number;
  aiPlanAmount: number;
  note: string;
  currentSeries: SeriesPoint[];
  aiSeries: SeriesPoint[];
  bandLowSeries: SeriesPoint[];
  bandHighSeries: SeriesPoint[];
}

export interface StrategyOption {
  key: StrategyKey;
  name: string;
  expectedReturnRate: number;
  maxDrawdownRate: number;
  targetAmountLabel: string;
  achievable: boolean;
  fitDescription: string;
}

export interface StrategyComparison {
  options: StrategyOption[];
  note: string;
}

export interface AssetAllocationSlice {
  key: string;
  label: string;
  ratio: number;
}

export interface AssetAllocation {
  strategyLabel: string;
  slices: AssetAllocationSlice[];
  note: string;
}

export interface LossSimulation {
  expectedDrawdownRate: number;
  cautionThresholdRate: number;
  allowedLossRate: number;
  callout: string;
}

export interface AiReport {
  meta: ReportMeta;
  headline: Headline;
  personA: ReportPerson;
  personB: ReportPerson;
  jointFund: PersonRisk;
  agreedProfile: AgreedProfile;
  recommendation: Recommendation;
  goalRequirement: GoalRequirement;
  agreement: Agreement;
  goalProjection: GoalProjection;
  riskReason: RiskReason;
  adjustmentOptions: AdjustmentOption[];
  goalDiagnosis: GoalDiagnosis;
  peerComparison: PeerComparison;
  planComparison: PlanComparison;
  strategyComparison: StrategyComparison | null;
  assetAllocation: AssetAllocation;
  lossSimulation: LossSimulation;
  disclaimer: string;
  // 파생값
  needsAdjustment: boolean; // agreement.status === 'UNSUITABLE'
  hasSurplus: boolean; // goalDiagnosis.gapAmount >= 0
}
