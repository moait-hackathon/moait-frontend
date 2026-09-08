<script setup lang="ts">
import { computed } from 'vue';

import type { PlanComparison, SeriesPoint } from '@/types/aiReport';
import { formatKrwUnit } from '@/utils/format';

const props = defineProps<{ plan: PlanComparison }>();

const W = 320;
const H = 150;
const PAD_X = 8;
const PAD_TOP = 14;
const PAD_BOTTOM = 10;

function toXY(point: SeriesPoint) {
  return {
    x: PAD_X + point.x * (W - PAD_X * 2),
    y: H - PAD_BOTTOM - point.y * (H - PAD_TOP - PAD_BOTTOM),
  };
}

function line(points: SeriesPoint[]): string {
  return points
    .map((point, index) => {
      const { x, y } = toXY(point);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

const hasBand = computed(
  () => props.plan.bandLowSeries.length > 0 && props.plan.bandHighSeries.length > 0
);

const bandPath = computed(() => {
  if (!hasBand.value) return '';
  const top = props.plan.bandHighSeries.map(toXY);
  const bottom = [...props.plan.bandLowSeries].reverse().map(toXY);
  const all = [...top, ...bottom];
  return (
    all
      .map(
        (point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`
      )
      .join(' ') + ' Z'
  );
});

const currentPath = computed(() => line(props.plan.currentSeries));
const aiPath = computed(() => line(props.plan.aiSeries));
const targetLineY = toXY({ x: 0, y: 0.86 }).y;
</script>

<template>
  <div class="rounded-3xl border border-dm-gray/15 bg-white p-5">
    <ul class="flex flex-wrap gap-x-4 gap-y-1.5">
      <li class="flex items-center gap-1.5 text-[11px] font-semibold text-dm-gray-dark">
        <span class="inline-block w-4 border-t-2 border-dashed border-dm-gray"></span>현재 계획 유지
      </li>
      <li class="flex items-center gap-1.5 text-[11px] font-semibold text-dm-gray-dark">
        <span class="inline-block w-4 border-t-2 border-solid border-deep-green"></span>AI 추천 계획
      </li>
      <li class="flex items-center gap-1.5 text-[11px] font-semibold text-dm-gray-dark">
        <span class="inline-block w-4 border-t-2 border-dotted border-foreground"></span>목표 금액
      </li>
    </ul>

    <svg
      :viewBox="`0 0 ${W} ${H}`"
      class="mt-3 w-full"
      role="img"
      aria-label="현재 계획과 AI 추천 계획 비교 그래프"
    >
      <path
        v-if="hasBand"
        :d="bandPath"
        class="fill-dm-mint/40"
      />
      <line
        :x1="PAD_X"
        :y1="targetLineY"
        :x2="W - PAD_X"
        :y2="targetLineY"
        stroke="currentColor"
        class="text-foreground/70"
        stroke-width="1.5"
        stroke-dasharray="2 3"
      />
      <path
        :d="currentPath"
        fill="none"
        stroke="currentColor"
        class="text-dm-gray"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-dasharray="6 5"
      />
      <path
        :d="aiPath"
        fill="none"
        stroke="currentColor"
        class="text-deep-green"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <div class="mt-4 grid grid-cols-2 gap-2.5">
      <div class="rounded-2xl bg-dm-gray-light px-3.5 py-3">
        <p class="text-[11px] text-dm-gray-dark">현재 계획 · 목표 시점</p>
        <p class="mt-1 text-[15px] font-black text-foreground">
          {{ formatKrwUnit(plan.currentPlanAmount) }}
        </p>
      </div>
      <div class="rounded-2xl bg-green-01 px-3.5 py-3">
        <p class="text-[11px] text-dm-gray-dark">AI 추천 · 목표 시점</p>
        <p class="mt-1 text-[15px] font-black text-deep-green">
          {{ formatKrwUnit(plan.aiPlanAmount) }}
        </p>
      </div>
    </div>

    <p class="mt-3 whitespace-pre-line text-[11.5px] leading-[1.6] text-dm-gray-dark">
      {{ plan.note }}
    </p>
  </div>
</template>
