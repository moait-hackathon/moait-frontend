import { JOINT_RISK_PROFILE_TYPE_LABEL } from '@/constants/goal';
import type { GoalResponseDto } from '@/types/dto/goal.dto';
import type { Goal } from '@/types/goal';

// GET /goals/me · POST /goals 응답 → 공동 목표 도메인.
export function toGoal(dto: GoalResponseDto): Goal {
  return {
    goalId: dto.goalId,
    coupleId: dto.coupleId,
    targetAmount: dto.targetAmount,
    targetDate: dto.targetDate,
    currentAmount: dto.currentAmount,
    currentAmountUpdatedAt: dto.currentAmountUpdatedAt,
    monthlyInvestableAmount: dto.monthlyInvestableAmount,
    investmentPeriodMonths: dto.investmentPeriodMonths,
    emergencyFundMonths: dto.emergencyFundMonths,
    monthlySurplusBand: dto.monthlySurplusBand,
    maxAllowedLossRate: dto.maxAllowedLossRate,
    lossReaction: dto.lossReaction,
    investmentExperience: dto.investmentExperience,
    riskProfileScore: dto.riskProfileScore,
    jointRiskProfileType: dto.jointRiskProfileType,
    jointRiskProfileTypeLabel:
      dto.jointRiskProfileTypeLabel ||
      JOINT_RISK_PROFILE_TYPE_LABEL[dto.jointRiskProfileType],
    status: dto.status,
    progress: { ...dto.progress },
    hasReport: dto.hasReport ?? false,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt ?? null,
  };
}
