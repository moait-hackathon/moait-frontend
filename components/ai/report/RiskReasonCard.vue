<script setup lang="ts">
import { computed } from 'vue';

import type { ReportPerson, RiskReason } from '@/types/aiReport';

const props = defineProps<{
  personA: ReportPerson;
  personB: ReportPerson;
  riskReason: RiskReason;
}>();

const SCALE_MAX = 100;
const pct = (value: number) => `${(value / SCALE_MAX) * 100}%`;

const agreedWidth = computed(() => pct(props.riskReason.maxScore));
const requiredLeft = computed(() => pct(props.riskReason.requiredMin));
const requiredWidth = computed(() =>
  pct(props.riskReason.requiredMax - props.riskReason.requiredMin)
);
</script>

<template>
  <div class="rounded-3xl border border-dm-gray/15 bg-white p-5">
    <h3 class="text-[15px] font-black tracking-[-0.02em] text-foreground">
      왜 이런 결과가 나왔을까요?
    </h3>

    <div class="mt-4 grid grid-cols-2 gap-2.5">
      <div class="flex items-center gap-2.5 rounded-2xl bg-dm-gray-light px-3 py-2.5">
        <span
          class="grid size-8 shrink-0 place-items-center rounded-full bg-blue text-[12px] font-black text-white"
          aria-hidden="true"
        >
          {{ personA.name.slice(0, 1) }}
        </span>
        <span class="min-w-0">
          <strong class="block truncate text-[13px] font-extrabold text-foreground">
            {{ personA.name }}
          </strong>
          <span class="block text-[11px] text-dm-gray-dark">
            {{ personA.preferenceScore }}점 · {{ personA.profileTypeLabel }}
          </span>
        </span>
      </div>

      <div class="flex items-center gap-2.5 rounded-2xl bg-dm-gray-light px-3 py-2.5">
        <span
          class="grid size-8 shrink-0 place-items-center rounded-full bg-pink-05 text-[12px] font-black text-white"
          aria-hidden="true"
        >
          {{ personB.name.slice(0, 1) }}
        </span>
        <span class="min-w-0">
          <strong class="block truncate text-[13px] font-extrabold text-foreground">
            {{ personB.name }}
          </strong>
          <span class="block text-[11px] text-dm-gray-dark">
            {{ personB.preferenceScore }}점 · {{ personB.profileTypeLabel }}
          </span>
        </span>
      </div>
    </div>

    <p class="mt-4 break-keep text-[13px] font-medium leading-[1.65] text-foreground">
      {{ riskReason.body }}
    </p>

    <div class="mt-6 px-1">
      <div class="relative h-6">
        <span
          class="absolute -top-0.5 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-dm-gray-dark"
          :style="{ left: pct((riskReason.preferredScore + riskReason.maxScore) / 2) }"
        >
          선호 {{ riskReason.preferredScore }} · 최대 {{ riskReason.maxScore }}
        </span>
      </div>

      <div class="relative h-3 rounded-full bg-dm-gray-light">
        <div
          class="absolute inset-y-0 left-0 rounded-full bg-dm-mint"
          :style="{ width: agreedWidth }"
        ></div>
        <div
          class="absolute inset-y-0 rounded-full border border-pink-04 bg-pink-03/35"
          :style="{ left: requiredLeft, width: requiredWidth }"
        ></div>
        <span
          class="absolute -top-1 h-5 w-0.5 -translate-x-1/2 rounded bg-foreground/70"
          :style="{ left: pct(riskReason.preferredScore) }"
        ></span>
        <span
          class="absolute -top-1 h-5 w-0.5 -translate-x-1/2 rounded bg-foreground/70"
          :style="{ left: pct(riskReason.maxScore) }"
        ></span>
      </div>
    </div>

    <ul class="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
      <li class="flex items-center gap-1.5 text-[11px] font-semibold text-dm-gray-dark">
        <span class="size-3 rounded border border-dm-mint-darker bg-dm-mint"></span>
        두 분의 합의 범위
      </li>
      <li class="flex items-center gap-1.5 text-[11px] font-semibold text-dm-gray-dark">
        <span class="size-3 rounded border border-pink-05 bg-pink-03/35"></span>
        목표 달성에 필요한 위험
      </li>
    </ul>

    <p
      class="mt-4 whitespace-pre-line rounded-2xl bg-pink-01 px-4 py-3.5 text-[12.5px] font-medium leading-[1.65] text-brand-dark"
    >
      {{ riskReason.callout }}
    </p>
  </div>
</template>
