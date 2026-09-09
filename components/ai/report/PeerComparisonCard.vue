<script setup lang="ts">
import { computed } from 'vue';

import type { PeerComparison } from '@/types/aiReport';
import { formatKrwUnit } from '@/utils/format';

const props = defineProps<{ peer: PeerComparison }>();

const R = 32;
const CIRCUMFERENCE = 2 * Math.PI * R;

const dashOffset = computed(
  () => CIRCUMFERENCE * (1 - Math.min(Math.max(props.peer.readinessRate, 0), 100) / 100)
);
const isStrong = computed(() => props.peer.readinessRate >= 75);
const arcClass = computed(() => (isStrong.value ? 'text-deep-green' : 'text-blue'));
</script>

<template>
  <div class="rounded-3xl border border-dm-gray/15 bg-white p-5">
    <div class="flex items-center gap-5">
      <div
        class="relative grid size-[92px] shrink-0 place-items-center"
        role="img"
        :aria-label="`준비율 ${peer.readinessRate}퍼센트`"
      >
        <svg
          viewBox="0 0 80 80"
          class="size-full -rotate-90"
        >
          <circle
            cx="40"
            cy="40"
            :r="R"
            fill="none"
            stroke="currentColor"
            class="text-dm-gray-light"
            stroke-width="10"
          />
          <circle
            cx="40"
            cy="40"
            :r="R"
            fill="none"
            stroke="currentColor"
            :class="arcClass"
            stroke-width="10"
            stroke-linecap="round"
            :stroke-dasharray="CIRCUMFERENCE"
            :stroke-dashoffset="dashOffset"
          />
        </svg>
        <div class="absolute flex flex-col items-center">
          <span class="text-[17px] font-black text-foreground">{{ peer.readinessRate }}%</span>
          <span class="text-[10px] font-semibold text-dm-gray-dark">준비율</span>
        </div>
      </div>

      <dl class="min-w-0 flex-1 text-[12.5px]">
        <div
          class="flex items-center justify-between border-b border-dashed border-dm-gray/30 py-2"
        >
          <dt class="text-dm-gray-dark">우리 커플 저축액</dt>
          <dd class="font-extrabold text-foreground">{{ formatKrwUnit(peer.ourSavings) }}</dd>
        </div>
        <div
          class="flex items-center justify-between border-b border-dashed border-dm-gray/30 py-2"
        >
          <dt class="text-dm-gray-dark">또래 평균 저축액</dt>
          <dd class="font-extrabold text-foreground">
            {{ formatKrwUnit(peer.peerAverageSavings) }}
          </dd>
        </div>
        <div class="flex items-center justify-between py-2">
          <dt class="text-dm-gray-dark">비교 순위</dt>
          <dd class="font-extrabold text-deep-green">{{ peer.percentileLabel }}</dd>
        </div>
      </dl>
    </div>

    <p class="mt-3 break-keep text-[11.5px] leading-[1.6] text-dm-gray-dark">{{ peer.note }}</p>
  </div>
</template>
