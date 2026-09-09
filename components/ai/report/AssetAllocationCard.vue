<script setup lang="ts">
import { computed } from 'vue';

import type { AssetAllocation } from '@/types/aiReport';

const props = defineProps<{ allocation: AssetAllocation }>();

const R = 30;
const CIRCUMFERENCE = 2 * Math.PI * R;

// config 토큰 hex. (SVG stroke 는 클래스 대신 색상값이 필요)
const SLICE_COLORS = ['#6078e4', '#328c87', '#faac38', '#ffc700', '#ff9ebf'];

const segments = computed(() => {
  let acc = 0;
  return props.allocation.slices.map((slice, index) => {
    const dash = (slice.ratio / 100) * CIRCUMFERENCE;
    const offset = -(acc / 100) * CIRCUMFERENCE;
    acc += slice.ratio;
    return {
      key: slice.key,
      color: SLICE_COLORS[index % SLICE_COLORS.length],
      dashArray: `${dash} ${CIRCUMFERENCE - dash}`,
      dashOffset: offset,
    };
  });
});
</script>

<template>
  <div class="rounded-3xl border border-dm-gray/15 bg-white p-5">
    <div class="flex items-center gap-5">
      <svg
        viewBox="0 0 80 80"
        class="size-[92px] shrink-0 -rotate-90"
        role="img"
        aria-label="추천 자산 배분 비율"
      >
        <circle
          cx="40"
          cy="40"
          :r="R"
          fill="none"
          stroke="#f7f7fa"
          stroke-width="12"
        />
        <circle
          v-for="segment in segments"
          :key="segment.key"
          cx="40"
          cy="40"
          :r="R"
          fill="none"
          :stroke="segment.color"
          stroke-width="12"
          :stroke-dasharray="segment.dashArray"
          :stroke-dashoffset="segment.dashOffset"
        />
      </svg>

      <ul class="min-w-0 flex-1 text-[12.5px]">
        <li
          v-for="(slice, index) in allocation.slices"
          :key="slice.key"
          class="flex items-center justify-between py-1.5"
        >
          <span class="flex items-center gap-2 text-dm-gray-dark">
            <span
              class="size-2.5 shrink-0 rounded-full"
              :style="{ backgroundColor: SLICE_COLORS[index % SLICE_COLORS.length] }"
            ></span>
            {{ slice.label }}
          </span>
          <span class="font-extrabold text-foreground">{{ slice.ratio }}%</span>
        </li>
      </ul>
    </div>

    <p
      class="mt-4 break-keep rounded-2xl bg-dm-gray-light px-4 py-3 text-[11.5px] leading-[1.6] text-dm-gray-dark"
    >
      {{ allocation.note }}
    </p>
  </div>
</template>
