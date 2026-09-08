<script setup lang="ts">
import { formatAmount } from '@/utils/format';
import type { Goal } from '@/types/goal';

defineProps<{ goal: Goal }>();
</script>

<template>
  <section class="flex flex-1 flex-col px-5 pb-8 pt-10 text-center sm:px-8">
    <span
      class="text-[44px]"
      aria-hidden="true"
      >🎯</span
    >
    <p class="mt-4 text-xs font-extrabold text-brand-dark">우리 커플의 공동 투자성향</p>
    <h2 class="mt-1 text-[26px] font-black tracking-[-0.04em] text-foreground">
      {{ goal.jointRiskProfileTypeLabel }}
    </h2>

    <div class="mt-6 rounded-2xl border border-dm-gray/30 bg-white p-5 text-left">
      <div class="flex items-center justify-between">
        <span class="text-sm font-bold text-dm-gray-dark">공동 위험점수</span>
        <span class="text-lg font-black text-foreground">{{ goal.riskProfileScore }}</span>
      </div>

      <dl class="mt-4 flex flex-col gap-2.5 text-sm">
        <div class="flex items-center justify-between">
          <dt class="text-dm-gray-dark">목표 금액</dt>
          <dd class="font-bold text-foreground">{{ formatAmount(goal.targetAmount) }}원</dd>
        </div>
        <div class="flex items-center justify-between">
          <dt class="text-dm-gray-dark">목표일</dt>
          <dd class="font-bold text-foreground">{{ goal.targetDate }}</dd>
        </div>
        <div class="flex items-center justify-between">
          <dt class="text-dm-gray-dark">투자 기간</dt>
          <dd class="font-bold text-foreground">{{ goal.investmentPeriodMonths }}개월</dd>
        </div>
        <div class="flex items-center justify-between">
          <dt class="text-dm-gray-dark">현재 달성률</dt>
          <dd class="font-bold text-foreground">{{ goal.progress.rate }}%</dd>
        </div>
        <div class="flex items-center justify-between">
          <dt class="text-dm-gray-dark">월 필요 금액</dt>
          <dd class="font-bold text-foreground">
            {{ formatAmount(goal.progress.requiredMonthlyAmount) }}원
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
