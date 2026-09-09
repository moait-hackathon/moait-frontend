import type { AiReportDataDto } from '@/types/dto/aiReport.dto';
import type { AiReport } from '@/types/aiReport';

// GET /ai-report/me 응답(data) → AI 리포트 도메인.
// 대부분 필드는 그대로 옮기고, 화면 분기용 파생값만 계산한다.
export function toAiReport(dto: AiReportDataDto): AiReport {
  return {
    meta: { ...dto.meta },
    headline: { ...dto.headline },
    personA: { ...dto.personA },
    personB: { ...dto.personB },
    jointFund: { ...dto.jointFund },
    agreedProfile: { ...dto.agreedProfile },
    recommendation: { ...dto.recommendation },
    goalRequirement: { ...dto.goalRequirement },
    agreement: {
      ...dto.agreement,
      alternatives: [...dto.agreement.alternatives],
      cautions: [...dto.agreement.cautions],
    },
    goalProjection: {
      ...dto.goalProjection,
      actualSeries: dto.goalProjection.actualSeries.map((point) => ({ ...point })),
      idealSeries: dto.goalProjection.idealSeries.map((point) => ({ ...point })),
      projectedSeries: dto.goalProjection.projectedSeries.map((point) => ({ ...point })),
    },
    riskReason: { ...dto.riskReason },
    adjustmentOptions: dto.adjustmentOptions.map((option) => ({ ...option })),
    goalDiagnosis: { ...dto.goalDiagnosis },
    peerComparison: { ...dto.peerComparison },
    planComparison: {
      ...dto.planComparison,
      currentSeries: dto.planComparison.currentSeries.map((point) => ({ ...point })),
      aiSeries: dto.planComparison.aiSeries.map((point) => ({ ...point })),
      bandLowSeries: dto.planComparison.bandLowSeries.map((point) => ({ ...point })),
      bandHighSeries: dto.planComparison.bandHighSeries.map((point) => ({ ...point })),
    },
    strategyComparison: dto.strategyComparison
      ? {
          note: dto.strategyComparison.note,
          options: dto.strategyComparison.options.map((option) => ({ ...option })),
        }
      : null,
    assetAllocation: {
      ...dto.assetAllocation,
      slices: dto.assetAllocation.slices.map((slice) => ({ ...slice })),
    },
    lossSimulation: { ...dto.lossSimulation },
    disclaimer: dto.disclaimer,
    needsAdjustment: dto.agreement.status === 'UNSUITABLE',
    hasSurplus: dto.goalDiagnosis.gapAmount >= 0,
  };
}
