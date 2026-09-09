<script setup lang="ts">
import { computed, ref } from 'vue';

import { JOINT_RISK_PROFILE_TYPE_IMAGE } from '@/constants/goal';
import { formatAmount } from '@/utils/format';
import type { Goal } from '@/types/goal';

const props = defineProps<{ goal: Goal }>();

// 유형 이미지가 매핑에 없거나 로딩에 실패하면 이모지로 대체한다.
const imageFailed = ref(false);
const imageSrc = computed(() =>
  imageFailed.value
    ? null
    : (JOINT_RISK_PROFILE_TYPE_IMAGE[props.goal.jointRiskProfileType] ?? null)
);
</script>

<template>
  <section class="flex flex-1 flex-col px-5 pb-8 pt-10 text-center sm:px-8">
    <img
      v-if="imageSrc"
      :src="imageSrc"
      :alt="goal.jointRiskProfileTypeLabel"
      class="mx-auto h-24 w-24 object-contain"
      @error="imageFailed = true"
    />
    <span
      v-else
      class="text-[44px]"
      aria-hidden="true"
      >🎯</span
    >
    <p class="mt-4 text-xs font-extrabold text-primary">우리 커플의 공동 투자성향</p>
    <h2 class="mt-1 text-[26px] font-black tracking-[-0.04em] text-foreground">
      {{ goal.jointRiskProfileTypeLabel }}
    </h2>

    <div class="mt-6 rounded-2xl border border-border bg-white p-5 text-left">
      <dl class="flex flex-col gap-2.5 text-sm">
        <div class="flex items-center justify-between">
          <dt class="text-muted-foreground">목표 금액</dt>
          <dd class="font-bold text-foreground">{{ formatAmount(goal.targetAmount) }}원</dd>
        </div>
        <div class="flex items-center justify-between">
          <dt class="text-muted-foreground">목표일</dt>
          <dd class="font-bold text-foreground">{{ goal.targetDate }}</dd>
        </div>
        <div class="flex items-center justify-between">
          <dt class="text-muted-foreground">투자 기간</dt>
          <dd class="font-bold text-foreground">{{ goal.investmentPeriodMonths }}개월</dd>
        </div>
        <div class="flex items-center justify-between">
          <dt class="text-muted-foreground">현재 달성률</dt>
          <dd class="font-bold text-foreground">{{ goal.progress.rate }}%</dd>
        </div>
        <div class="flex items-center justify-between">
          <dt class="text-muted-foreground">월 필요 금액</dt>
          <dd class="font-bold text-foreground">
            {{ formatAmount(goal.progress.requiredMonthlyAmount) }}원
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
