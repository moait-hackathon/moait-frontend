<script setup lang="ts">
import { computed } from 'vue';

import type { GoalDiagnosis } from '@/types/aiReport';
import { formatKrwUnit } from '@/utils/format';

const props = defineProps<{ diagnosis: GoalDiagnosis }>();

const scaleMax = computed(() =>
  Math.max(props.diagnosis.projectedAmount, props.diagnosis.targetAmount, 1)
);
const pct = (value: number) => `${Math.max(0, (value / scaleMax.value) * 100)}%`;

const currentWidth = computed(() => pct(props.diagnosis.currentAmount));
const projectedExtraWidth = computed(() =>
  pct(Math.max(0, props.diagnosis.projectedAmount - props.diagnosis.currentAmount))
);
const targetTickLeft = computed(() => pct(props.diagnosis.targetAmount));

const isSurplus = computed(() => props.diagnosis.gapAmount >= 0);
</script>

<template>
  <div class="rounded-3xl border border-dm-gray/15 bg-white p-5">
    <div class="flex items-center justify-between text-[12px] font-semibold text-dm-gray-dark">
      <span>현재 {{ formatKrwUnit(diagnosis.currentAmount) }}</span>
      <span>목표 {{ formatKrwUnit(diagnosis.targetAmount) }}</span>
    </div>

    <div class="relative mt-2 h-2.5 rounded-full bg-dm-gray-light">
      <div
        class="absolute inset-y-0 left-0 rounded-l-full bg-blue"
        :style="{ width: currentWidth }"
      ></div>
      <div
        class="absolute inset-y-0 bg-deep-green"
        :style="{ left: currentWidth, width: projectedExtraWidth }"
      ></div>
      <span
        class="absolute -top-1 h-[18px] w-0.5 -translate-x-1/2 rounded bg-foreground"
        :style="{ left: targetTickLeft }"
      ></span>
    </div>

    <ul class="mt-3 flex gap-4">
      <li class="flex items-center gap-1.5 text-[11px] font-semibold text-dm-gray-dark">
        <span class="size-2.5 rounded-full bg-blue"></span>현재 마련액
      </li>
      <li class="flex items-center gap-1.5 text-[11px] font-semibold text-dm-gray-dark">
        <span class="size-2.5 rounded-full bg-deep-green"></span>목표 시점 예상 자산
      </li>
    </ul>

    <dl class="mt-4 grid grid-cols-4 gap-2 border-t border-dm-gray/15 pt-4 text-center">
      <div>
        <dt class="text-[11px] text-dm-gray-dark">목표 금액</dt>
        <dd class="mt-1 text-[13px] font-extrabold text-foreground">
          {{ formatKrwUnit(diagnosis.targetAmount) }}
        </dd>
      </div>
      <div>
        <dt class="text-[11px] text-dm-gray-dark">현재 금액</dt>
        <dd class="mt-1 text-[13px] font-extrabold text-foreground">
          {{ formatKrwUnit(diagnosis.currentAmount) }}
        </dd>
      </div>
      <div>
        <dt class="text-[11px] text-dm-gray-dark">예상 자산</dt>
        <dd class="mt-1 text-[13px] font-extrabold text-foreground">
          {{ formatKrwUnit(diagnosis.projectedAmount) }}
        </dd>
      </div>
      <div>
        <dt class="text-[11px] text-dm-gray-dark">
          {{ isSurplus ? '예상 초과액' : '예상 부족액' }}
        </dt>
        <dd
          class="mt-1 text-[13px] font-extrabold"
          :class="isSurplus ? 'text-deep-green' : 'text-red'"
        >
          {{ formatKrwUnit(Math.abs(diagnosis.gapAmount)) }}
        </dd>
      </div>
    </dl>
  </div>
</template>
