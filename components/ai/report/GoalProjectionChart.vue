<script setup lang="ts">
import { computed } from 'vue';

import type { GoalProjection, SeriesPoint } from '@/types/aiReport';

const props = defineProps<{ projection: GoalProjection }>();

const W = 320;
const H = 188;
const PAD_X = 10;
const PAD_TOP = 16;
const PAD_BOTTOM = 12;

// 정규화 좌표(0~1) → SVG 좌표.
function toXY(point: SeriesPoint) {
  const x = PAD_X + point.x * (W - PAD_X * 2);
  const y = H - PAD_BOTTOM - point.y * (H - PAD_TOP - PAD_BOTTOM);
  return { x, y };
}

function path(points: SeriesPoint[]): string {
  return points
    .map((point, index) => {
      const { x, y } = toXY(point);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

const idealPath = computed(() => path(props.projection.idealSeries));
const actualPath = computed(() => path(props.projection.actualSeries));
const projectedPath = computed(() => path(props.projection.projectedSeries));

const targetLineY = toXY({ x: 0, y: 0.82 }).y;

const endPoint = computed(() => {
  const series = props.projection.projectedSeries;
  return toXY(series[series.length - 1] ?? { x: 1, y: 0.8 });
});
const startPoint = computed(() => toXY(props.projection.actualSeries[0] ?? { x: 0, y: 0 }));

const isSurplus = computed(() => props.projection.gapAmount >= 0);

const LEGEND = [
  { label: '실제 자산', kind: 'solid', color: 'text-deep-green' },
  { label: '목표 흐름대로 모았다면', kind: 'dotted', color: 'text-orange' },
  { label: '예상 자산 (현재 계획 유지 시)', kind: 'dashed', color: 'text-dm-gray' },
  { label: '목표 금액', kind: 'dotted', color: 'text-foreground' },
] as const;
</script>

<template>
  <div class="rounded-3xl border border-dm-gray/15 bg-white p-5">
    <h3 class="text-[15px] font-black tracking-[-0.02em] text-foreground">목표 달성 예상 그래프</h3>

    <ul class="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
      <li
        v-for="item in LEGEND"
        :key="item.label"
        class="flex items-center gap-1.5 text-[11px] font-semibold text-dm-gray-dark"
      >
        <span
          class="inline-block w-4 border-t-2"
          :class="[
            item.color,
            item.kind === 'dotted'
              ? 'border-dotted'
              : item.kind === 'dashed'
                ? 'border-dashed'
                : 'border-solid',
          ]"
        ></span>
        {{ item.label }}
      </li>
    </ul>

    <div class="relative mt-4">
      <span class="absolute left-0 top-0 text-[10px] font-semibold text-dm-gray-dark"
        >목표 금액</span
      >
      <svg
        :viewBox="`0 0 ${W} ${H}`"
        class="w-full"
        role="img"
        aria-label="목표 달성 예상 그래프"
      >
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
          :d="idealPath"
          fill="none"
          stroke="currentColor"
          class="text-orange"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-dasharray="1 4"
        />
        <path
          :d="projectedPath"
          fill="none"
          stroke="currentColor"
          class="text-dm-gray"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-dasharray="6 5"
        />
        <path
          :d="actualPath"
          fill="none"
          stroke="currentColor"
          class="text-deep-green"
          stroke-width="3.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle
          :cx="startPoint.x"
          :cy="startPoint.y"
          r="3.5"
          class="fill-dm-gray"
        />
        <circle
          :cx="endPoint.x"
          :cy="endPoint.y"
          r="5"
          :class="isSurplus ? 'fill-deep-green' : 'fill-dm-gray-dark'"
        />
        <circle
          :cx="endPoint.x"
          :cy="endPoint.y"
          r="8.5"
          fill="none"
          stroke="currentColor"
          :class="isSurplus ? 'text-deep-green' : 'text-dm-gray-dark'"
          stroke-width="1.5"
        />
      </svg>
    </div>

    <div class="mt-1 flex justify-between text-[11px] font-medium text-dm-gray-dark">
      <span>{{ projection.timelineStart }}</span>
      <span>{{ projection.timelineNow }}</span>
      <span>{{ projection.timelineEnd }}</span>
    </div>

    <p
      class="mt-4 rounded-2xl px-4 py-3 text-[12.5px] font-medium leading-[1.6]"
      :class="isSurplus ? 'bg-green-01 text-deep-green' : 'bg-dm-gray-light text-dm-gray-dark'"
    >
      {{ projection.caption }}
    </p>
  </div>
</template>
