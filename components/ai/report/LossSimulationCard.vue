<script setup lang="ts">
import { computed } from 'vue';

import type { LossSimulation } from '@/types/aiReport';

const props = defineProps<{ loss: LossSimulation }>();

// 게이지 스케일: 0% ~ SCALE_MAX% 낙폭.
const SCALE_MAX = 20;
const clampPct = (rate: number) => `${Math.min((Math.abs(rate) / SCALE_MAX) * 100, 100)}%`;

const safeEnd = computed(() => clampPct(props.loss.cautionThresholdRate));
const cautionEnd = computed(() => clampPct(props.loss.allowedLossRate));
const expectedLeft = computed(() => clampPct(props.loss.expectedDrawdownRate));
const allowedLeft = computed(() => clampPct(props.loss.allowedLossRate));

const withinAllowed = computed(
  () => Math.abs(props.loss.expectedDrawdownRate) <= Math.abs(props.loss.allowedLossRate)
);
const withinSafe = computed(
  () => Math.abs(props.loss.expectedDrawdownRate) <= Math.abs(props.loss.cautionThresholdRate)
);
const expectedColor = computed(() =>
  withinSafe.value ? 'text-deep-green' : withinAllowed.value ? 'text-yellow-08' : 'text-red'
);
</script>

<template>
  <div class="rounded-3xl border border-dm-gray/15 bg-white p-5">
    <div class="relative h-7">
      <span
        class="absolute -translate-x-1/2 text-[11px] font-extrabold"
        :class="expectedColor"
        :style="{ left: expectedLeft }"
      >
        예상 {{ loss.expectedDrawdownRate }}%
      </span>
      <span
        class="absolute -translate-x-1/2 text-[11px] font-extrabold text-foreground"
        :style="{ left: allowedLeft }"
      >
        허용 {{ loss.allowedLossRate }}%
      </span>
    </div>

    <div class="relative h-3.5 overflow-hidden rounded-full bg-dm-gray-light">
      <div
        class="absolute inset-y-0 left-0 bg-deep-green"
        :style="{ width: safeEnd }"
      ></div>
      <div
        class="absolute inset-y-0 bg-orange"
        :style="{ left: safeEnd, right: `calc(100% - ${cautionEnd})` }"
      ></div>
      <div
        class="absolute inset-y-0 right-0 bg-red"
        :style="{ left: cautionEnd }"
      ></div>
      <span
        class="absolute -top-0.5 h-[18px] w-0.5 -translate-x-1/2 rounded bg-white"
        :style="{ left: expectedLeft }"
      ></span>
      <span
        class="absolute -top-0.5 h-[18px] w-0.5 -translate-x-1/2 rounded bg-foreground"
        :style="{ left: allowedLeft }"
      ></span>
    </div>

    <div class="mt-2 flex justify-between text-[11px] font-medium text-dm-gray-dark">
      <span>안전 구간</span>
      <span>주의 구간</span>
      <span>허용 범위 초과</span>
    </div>

    <p
      class="mt-4 break-keep rounded-2xl bg-green-01 px-4 py-3.5 text-[12.5px] font-medium leading-[1.65] text-deep-green"
    >
      {{ loss.callout }}
    </p>
  </div>
</template>
