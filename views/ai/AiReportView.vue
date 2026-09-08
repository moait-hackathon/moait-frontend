<script setup lang="ts">
import { computed } from 'vue';

import badImage from '@/assets/bad.png';
import goodImage from '@/assets/good.png';
import AdjustmentPlanCard from '@/components/ai/report/AdjustmentPlanCard.vue';
import AssetAllocationCard from '@/components/ai/report/AssetAllocationCard.vue';
import GoalDiagnosisCard from '@/components/ai/report/GoalDiagnosisCard.vue';
import GoalProjectionChart from '@/components/ai/report/GoalProjectionChart.vue';
import LossSimulationCard from '@/components/ai/report/LossSimulationCard.vue';
import PeerComparisonCard from '@/components/ai/report/PeerComparisonCard.vue';
import PlanComparisonCard from '@/components/ai/report/PlanComparisonCard.vue';
import ReportHeader from '@/components/ai/report/ReportHeader.vue';
import ReportHero from '@/components/ai/report/ReportHero.vue';
import ReportSection from '@/components/ai/report/ReportSection.vue';
import RiskProfileResultCard from '@/components/ai/report/RiskProfileResultCard.vue';
import RiskReasonCard from '@/components/ai/report/RiskReasonCard.vue';
import StrategyOptionsCard from '@/components/ai/report/StrategyOptionsCard.vue';
import { useAiReport } from '@/composables/useAiReport';

const { report, loading, error, reload, goBack, viewStrategy } = useAiReport();

const heroImage = computed(() => (report.value?.needsAdjustment ? badImage : goodImage));
</script>

<template>
  <main
    class="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-dm-mint-light font-sans text-foreground antialiased"
  >
    <ReportHeader
      :report-date="report?.meta.reportDate ?? ''"
      @back="goBack"
    />

    <div
      v-if="loading"
      class="flex flex-1 items-center justify-center py-24 text-sm font-semibold text-dm-gray-dark"
    >
      리포트를 불러오는 중이에요…
    </div>

    <div
      v-else-if="error || !report"
      class="flex flex-1 flex-col items-center justify-center gap-3 py-24"
    >
      <p class="text-sm font-semibold text-dm-gray-dark">리포트를 불러오지 못했어요.</p>
      <button
        type="button"
        class="rounded-xl bg-brand px-4 py-2 text-sm font-extrabold text-white transition hover:bg-brand-dark"
        @click="reload"
      >
        다시 시도
      </button>
    </div>

    <template v-else>
      <!-- 상단: 히어로 + 요약 + 진단 근거 (흰 배경) -->
      <div class="bg-white">
        <ReportHero
          :headline="report.headline"
          :image-src="heroImage"
        />
        <div class="flex flex-col gap-5 px-5 pb-9 pt-1">
          <GoalProjectionChart :projection="report.goalProjection" />
          <RiskReasonCard
            :person-a="report.personA"
            :person-b="report.personB"
            :risk-reason="report.riskReason"
          />
          <AdjustmentPlanCard
            v-if="report.needsAdjustment && report.adjustmentOptions.length"
            :options="report.adjustmentOptions"
            @view-strategy="viewStrategy"
          />
        </div>
      </div>

      <!-- 하단: 상세 섹션 (민트 배경) -->
      <div class="flex flex-col gap-9 pb-12 pt-8">
        <ReportSection
          title="목표 달성 진단 상세"
          caption="현재 계획 기준"
        >
          <GoalDiagnosisCard :diagnosis="report.goalDiagnosis" />
        </ReportSection>

        <ReportSection
          title="부부 위험성향과 합의 결과"
          caption="100점 만점"
        >
          <RiskProfileResultCard
            :person-a="report.personA"
            :person-b="report.personB"
            :agreed="report.agreedProfile"
          />
        </ReportSection>

        <ReportSection
          title="또래 커플 평균과 비교"
          caption="같은 목표 유형 기준"
        >
          <PeerComparisonCard :peer="report.peerComparison" />
        </ReportSection>

        <ReportSection
          title="현재 계획 vs AI 추천 계획"
          caption="목표 시점까지 예상 자산"
        >
          <PlanComparisonCard :plan="report.planComparison" />
        </ReportSection>

        <ReportSection
          v-if="report.strategyComparison"
          title="지키는 안 vs 키우는 안"
          caption="월 300만 원 투자 기준"
        >
          <StrategyOptionsCard :strategy="report.strategyComparison" />
        </ReportSection>

        <ReportSection
          title="최종 추천 자산 배분"
          :caption="report.assetAllocation.strategyLabel"
        >
          <AssetAllocationCard :allocation="report.assetAllocation" />
        </ReportSection>

        <ReportSection
          title="손실 위험 시뮬레이션"
          :caption="`허용 손실 ${report.lossSimulation.allowedLossRate}% 기준`"
        >
          <LossSimulationCard :loss="report.lossSimulation" />
        </ReportSection>

        <p class="px-5 text-[11px] leading-[1.65] text-dm-gray-dark">{{ report.disclaimer }}</p>
      </div>
    </template>
  </main>
</template>
