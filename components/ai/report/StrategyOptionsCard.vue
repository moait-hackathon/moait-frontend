<script setup lang="ts">
import type { StrategyComparison, StrategyKey } from '@/types/aiReport';

defineProps<{ strategy: StrategyComparison }>();

const CARD_CLASS = {
  DEFENSIVE: 'bg-blue-01',
  GROWTH: 'bg-pink-01',
} satisfies Record<StrategyKey, string>;

const PILL_CLASS = {
  DEFENSIVE: 'bg-blue text-white',
  GROWTH: 'bg-pink-05 text-white',
} satisfies Record<StrategyKey, string>;
</script>

<template>
  <div class="rounded-3xl border border-dm-gray/15 bg-white p-5">
    <div class="grid grid-cols-2 gap-2.5">
      <div
        v-for="option in strategy.options"
        :key="option.key"
        class="rounded-2xl p-3.5"
        :class="CARD_CLASS[option.key]"
      >
        <span
          class="inline-flex rounded-full px-3 py-1 text-[12px] font-extrabold"
          :class="PILL_CLASS[option.key]"
        >
          {{ option.name }}
        </span>

        <dl class="mt-3 space-y-2 text-[12px]">
          <div class="flex items-center justify-between">
            <dt class="text-dm-gray-dark">기대 연수익률</dt>
            <dd class="font-extrabold text-foreground">{{ option.expectedReturnRate }}%</dd>
          </div>
          <div class="flex items-center justify-between">
            <dt class="text-dm-gray-dark">예상 최대 낙폭</dt>
            <dd class="font-extrabold text-foreground">{{ option.maxDrawdownRate }}%</dd>
          </div>
          <div class="flex items-center justify-between">
            <dt class="text-dm-gray-dark">목표 시점 자산</dt>
            <dd class="font-extrabold text-foreground">{{ option.targetAmountLabel }}</dd>
          </div>
          <div class="flex items-center justify-between">
            <dt class="text-dm-gray-dark">달성 여부</dt>
            <dd
              class="font-extrabold"
              :class="option.achievable ? 'text-deep-green' : 'text-red'"
            >
              {{ option.achievable ? '달성 가능' : '달성 어려움' }}
            </dd>
          </div>
        </dl>

        <p class="mt-3 break-keep text-[11.5px] leading-[1.55] text-dm-gray-dark">
          {{ option.fitDescription }}
        </p>
      </div>
    </div>

    <p class="mt-4 break-keep text-[11.5px] leading-[1.6] text-dm-gray-dark">{{ strategy.note }}</p>
  </div>
</template>
