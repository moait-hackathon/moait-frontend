import type {
  AgreementResponseDto,
  GoalRequirementResponseDto,
  InvestmentAgreementResponseDto,
  RiskScoreResponseDto,
} from '@/types/dto/ai.dto';
import type {
  GoalRequirement,
  InvestmentAgreement,
  InvestmentAgreementAnalysis,
  RiskScore,
} from '@/types/ai';

const PROFILE_TYPE_LABELS: Record<string, string> = {
  STABLE: '안정형',
  STABLE_SEEKING: '안정추구형',
  NEUTRAL: '위험중립형',
  ACTIVE: '적극투자형',
  AGGRESSIVE: '공격투자형',
};

const AGREEMENT_STATUS_LABELS: Record<string, string> = {
  LOWER_RISK_SUFFICIENT: '낮은 위험으로도 목표 달성이 가능해요',
  ALIGNED: '투자성향과 목표가 잘 맞아요',
  ADJUSTMENT_REQUIRED: '목표 계획 조정이 필요해요',
};

const CALCULATION_METHOD_LABELS: Record<string, string> = {
  LEGACY_RETURN_BANDS: '수익률 구간 기준',
};

function toRiskScore(dto: RiskScoreResponseDto): RiskScore {
  return {
    preferenceScore: dto.preferenceScore,
    userLimit: dto.userLimit,
    serviceLimit: dto.serviceLimit,
    finalLimit: dto.finalLimit,
    profileType: dto.profileType,
    profileTypeLabel: PROFILE_TYPE_LABELS[dto.profileType] ?? dto.profileType,
  };
}

function toGoalRequirement(dto: GoalRequirementResponseDto): GoalRequirement {
  return {
    requiredAnnualReturnRate: dto.requiredAnnualReturnRate,
    rangeMin: dto.rangeMin,
    rangeMax: dto.rangeMax,
    realistic: dto.realistic,
    investmentMonths: dto.investmentMonths,
    calculationMethod: dto.calculationMethod,
    calculationMethodLabel:
      CALCULATION_METHOD_LABELS[dto.calculationMethod] ?? dto.calculationMethod,
  };
}

function toInvestmentAgreement(dto: AgreementResponseDto): InvestmentAgreement {
  return {
    status: dto.status,
    statusLabel: AGREEMENT_STATUS_LABELS[dto.status] ?? dto.status,
    recommendedRiskScore: dto.recommendedRiskScore,
    summary: dto.summary,
    rationale: dto.rationale,
    recommendedStrategy: dto.recommendedStrategy,
    alternatives: [...dto.alternatives],
    cautions: [...dto.cautions],
    aiGenerated: dto.aiGenerated,
  };
}

export function toInvestmentAgreementAnalysis(
  dto: InvestmentAgreementResponseDto
): InvestmentAgreementAnalysis {
  return {
    personA: toRiskScore(dto.personA),
    personB: toRiskScore(dto.personB),
    jointFund: toRiskScore(dto.jointFund),
    recommendation: { ...dto.recommendation },
    goalRequirement: toGoalRequirement(dto.goalRequirement),
    agreement: toInvestmentAgreement(dto.agreement),
  };
}
