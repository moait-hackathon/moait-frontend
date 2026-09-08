<script setup lang="ts">
import { computed } from 'vue';

import type { AgreedProfile, ReportPerson } from '@/types/aiReport';

const props = defineProps<{
  personA: ReportPerson;
  personB: ReportPerson;
  agreed: AgreedProfile;
}>();

interface Gauge {
  name: string;
  score: number;
  label: string;
  initial: string | null;
  fillClass: string;
  chipClass: string;
}

const gauges = computed<Gauge[]>(() => [
  {
    name: props.personA.name,
    score: props.personA.preferenceScore,
    label: props.personA.profileTypeLabel,
    initial: props.personA.name.slice(0, 1),
    fillClass: 'bg-blue',
    chipClass: 'bg-blue text-white',
  },
  {
    name: props.personB.name,
    score: props.personB.preferenceScore,
    label: props.personB.profileTypeLabel,
    initial: props.personB.name.slice(0, 1),
    fillClass: 'bg-pink-05',
    chipClass: 'bg-pink-05 text-white',
  },
  {
    name: '공동 합의',
    score: props.agreed.score,
    label: props.agreed.profileTypeLabel,
    initial: null,
    fillClass: 'bg-deep-green',
    chipClass: '',
  },
]);
</script>

<template>
  <div class="rounded-3xl border border-dm-gray/15 bg-white p-5">
    <div class="grid grid-cols-3 gap-3">
      <div
        v-for="gauge in gauges"
        :key="gauge.name"
        class="flex flex-col items-center"
      >
        <div class="flex h-6 items-center gap-1.5">
          <span
            v-if="gauge.initial"
            class="grid size-5 place-items-center rounded-full text-[10px] font-black"
            :class="gauge.chipClass"
            aria-hidden="true"
          >
            {{ gauge.initial }}
          </span>
          <span class="text-[12px] font-extrabold text-foreground">{{ gauge.name }}</span>
        </div>

        <div class="mt-2 flex h-28 w-8 items-end overflow-hidden rounded-full bg-dm-gray-light">
          <div
            class="w-full rounded-full transition-[height]"
            :class="gauge.fillClass"
            :style="{ height: `${Math.min(Math.max(gauge.score, 6), 100)}%` }"
          ></div>
        </div>

        <p class="mt-2 text-[15px] font-black text-foreground">{{ gauge.score }}점</p>
        <p class="text-[11px] text-dm-gray-dark">{{ gauge.label }}</p>
      </div>
    </div>

    <p
      class="mt-5 break-keep rounded-2xl bg-green-01 px-4 py-3.5 text-[12.5px] font-medium leading-[1.65] text-deep-green"
    >
      {{ agreed.summary }}
    </p>
  </div>
</template>
