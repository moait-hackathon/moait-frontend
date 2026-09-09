<script setup lang="ts">
import { Bot, ChevronDown, CircleAlert, Sparkles, Target } from 'lucide-vue-next';

import AiRiskScoreCard from '@/components/ai/AiRiskScoreCard.vue';
import type { InvestmentAgreementAnalysis } from '@/types/ai';

defineProps<{
  analysis: InvestmentAgreementAnalysis;
}>();
</script>

<template>
  <section
    class="mt-5 overflow-hidden rounded-3xl border border-dm-gray/25 bg-white shadow-md"
    aria-labelledby="agreement-result-title"
  >
    <header class="bg-dm-mint-light px-5 py-5">
      <div class="flex items-center gap-2 text-btn-mt-dark">
        <span
          class="grid size-8 place-items-center rounded-full bg-white"
          aria-hidden="true"
        >
          <Bot
            :size="18"
            :stroke-width="2.2"
          />
        </span>
        <span class="text-xs font-extrabold">MoAI 투자 합의안</span>
        <span
          v-if="analysis.agreement.aiGenerated"
          class="ml-auto inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold"
        >
          <Sparkles :size="12" />
          AI 분석
        </span>
      </div>

      <h2
        id="agreement-result-title"
        class="mt-4 break-keep text-lg font-black leading-7 tracking-[-0.03em] text-foreground"
      >
        {{ analysis.agreement.statusLabel }}
      </h2>
      <p class="mt-2 break-keep text-sm font-medium leading-6 text-dm-gray-dark">
        {{ analysis.agreement.summary }}
      </p>
    </header>

    <div class="space-y-6 px-5 py-5">
      <section aria-labelledby="recommended-strategy-title">
        <div class="flex items-center gap-2">
          <Sparkles
            class="text-dm-mint-darker"
            :size="18"
            aria-hidden="true"
          />
          <h3
            id="recommended-strategy-title"
            class="text-sm font-black text-foreground"
          >
            추천 전략
          </h3>
        </div>
        <p
          v-if="analysis.agreement.recommendedStrategy"
          class="mt-2 break-keep rounded-2xl bg-dm-mint-light px-4 py-3 text-sm font-bold leading-6 text-btn-mt-dark"
        >
          {{ analysis.agreement.recommendedStrategy }}
        </p>
        <p
          v-else
          class="mt-2 break-keep rounded-2xl bg-pink-01 px-4 py-3 text-sm font-bold leading-6 text-brand-dark"
        >
          현재 조건에서는 추천 전략을 제시하기 어려워요. 아래 조정안을 확인해 주세요.
        </p>

        <dl class="mt-3 grid grid-cols-3 gap-2 text-center">
          <div class="rounded-2xl bg-dm-gray-light px-2 py-3">
            <dt class="text-[10px] font-semibold text-dm-gray-dark">추천 위험점수</dt>
            <dd class="mt-1 text-lg font-black text-foreground">
              {{ analysis.agreement.recommendedRiskScore ?? '-' }}
            </dd>
          </div>
          <div class="rounded-2xl bg-dm-gray-light px-2 py-3">
            <dt class="text-[10px] font-semibold text-dm-gray-dark">필요 연 수익률</dt>
            <dd class="mt-1 text-lg font-black text-foreground">
              <template v-if="analysis.goalRequirement.requiredAnnualReturnRate !== null">
                {{ analysis.goalRequirement.requiredAnnualReturnRate }}%
              </template>
              <template v-else>-</template>
            </dd>
          </div>
          <div class="rounded-2xl bg-dm-gray-light px-2 py-3">
            <dt class="text-[10px] font-semibold text-dm-gray-dark">투자 기간</dt>
            <dd class="mt-1 text-lg font-black text-foreground">
              {{ analysis.goalRequirement.investmentMonths }}개월
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="risk-score-title">
        <div class="flex items-center gap-2">
          <Target
            class="text-dm-mint-darker"
            :size="18"
            aria-hidden="true"
          />
          <h3
            id="risk-score-title"
            class="text-sm font-black text-foreground"
          >
            투자성향 분석
          </h3>
        </div>
        <div class="mt-3 grid gap-2 sm:grid-cols-3">
          <AiRiskScoreCard
            label="구성원 A"
            :score="analysis.personA"
          />
          <AiRiskScoreCard
            label="구성원 B"
            :score="analysis.personB"
          />
          <AiRiskScoreCard
            label="공동자금"
            :score="analysis.jointFund"
          />
        </div>
      </section>

      <section aria-labelledby="analysis-detail-title">
        <h3
          id="analysis-detail-title"
          class="text-sm font-black text-foreground"
        >
          분석 지표
        </h3>
        <dl class="mt-3 divide-y divide-dm-gray/25 rounded-2xl border border-dm-gray/25 px-4">
          <div class="flex items-center justify-between gap-3 py-3 text-xs">
            <dt class="font-semibold text-dm-gray-dark">가중·중심 점수</dt>
            <dd class="font-extrabold text-foreground">
              {{ analysis.recommendation.weightedScore }} ·
              {{ analysis.recommendation.centerScore }}
            </dd>
          </div>
          <div class="flex items-center justify-between gap-3 py-3 text-xs">
            <dt class="font-semibold text-dm-gray-dark">추천 위험 범위</dt>
            <dd class="font-extrabold text-foreground">
              {{ analysis.recommendation.rangeMin }}~{{ analysis.recommendation.rangeMax }}점
            </dd>
          </div>
          <div class="flex items-center justify-between gap-3 py-3 text-xs">
            <dt class="font-semibold text-dm-gray-dark">목표 위험 범위</dt>
            <dd class="font-extrabold text-foreground">
              <template
                v-if="
                  analysis.goalRequirement.rangeMin !== null &&
                  analysis.goalRequirement.rangeMax !== null
                "
              >
                {{ analysis.goalRequirement.rangeMin }}~{{ analysis.goalRequirement.rangeMax }}점
              </template>
              <template v-else>-</template>
            </dd>
          </div>
          <div class="flex items-center justify-between gap-3 py-3 text-xs">
            <dt class="font-semibold text-dm-gray-dark">최대 허용 점수</dt>
            <dd class="font-extrabold text-foreground">{{ analysis.recommendation.finalMax }}점</dd>
          </div>
          <div class="flex items-center justify-between gap-3 py-3 text-xs">
            <dt class="font-semibold text-dm-gray-dark">목표 현실성</dt>
            <dd class="font-extrabold text-foreground">
              {{ analysis.goalRequirement.realistic ? '달성 가능' : '조정 필요' }}
            </dd>
          </div>
          <div class="flex items-center justify-between gap-3 py-3 text-xs">
            <dt class="font-semibold text-dm-gray-dark">계산 기준</dt>
            <dd class="font-extrabold text-foreground">
              {{ analysis.goalRequirement.calculationMethodLabel }}
            </dd>
          </div>
        </dl>
      </section>

      <details class="group rounded-2xl border border-dm-gray/25 px-4 py-3">
        <summary
          class="flex cursor-pointer list-none items-center gap-2 text-sm font-extrabold text-foreground"
        >
          분석 근거
          <ChevronDown
            class="ml-auto text-dm-gray-dark transition group-open:rotate-180"
            :size="18"
            aria-hidden="true"
          />
        </summary>
        <p
          class="mt-3 break-keep border-t border-dm-gray/25 pt-3 text-xs font-medium leading-6 text-dm-gray-dark"
        >
          {{ analysis.agreement.rationale }}
        </p>
      </details>

      <details class="group rounded-2xl border border-dm-gray/25 px-4 py-3">
        <summary
          class="flex cursor-pointer list-none items-center gap-2 text-sm font-extrabold text-foreground"
        >
          다른 선택지 {{ analysis.agreement.alternatives.length }}개
          <ChevronDown
            class="ml-auto text-dm-gray-dark transition group-open:rotate-180"
            :size="18"
            aria-hidden="true"
          />
        </summary>
        <ol class="mt-3 space-y-3 border-t border-dm-gray/25 pt-3">
          <li
            v-for="(alternative, index) in analysis.agreement.alternatives"
            :key="alternative"
            class="flex gap-2.5 text-xs font-medium leading-6 text-dm-gray-dark"
          >
            <span
              class="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-dm-mint-light text-[10px] font-black text-btn-mt-dark"
            >
              {{ index + 1 }}
            </span>
            <span class="break-keep">{{ alternative }}</span>
          </li>
        </ol>
      </details>

      <section
        v-if="analysis.agreement.cautions.length"
        class="rounded-2xl bg-pink-01 px-4 py-3"
        aria-labelledby="agreement-caution-title"
      >
        <div class="flex items-center gap-2 text-brand-dark">
          <CircleAlert
            :size="17"
            aria-hidden="true"
          />
          <h3
            id="agreement-caution-title"
            class="text-xs font-extrabold"
          >
            확인해 주세요
          </h3>
        </div>
        <ul class="mt-2 space-y-1 pl-5 text-xs font-medium leading-5 text-dm-gray-dark">
          <li
            v-for="caution in analysis.agreement.cautions"
            :key="caution"
            class="list-disc"
          >
            {{ caution }}
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>
