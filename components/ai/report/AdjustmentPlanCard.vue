<script setup lang="ts">
import { BarChart3, CalendarClock, ChevronRight, ShieldCheck } from 'lucide-vue-next';

import type { AdjustmentOption, AdjustmentType } from '@/types/aiReport';

defineProps<{ options: AdjustmentOption[] }>();

defineEmits<{ viewStrategy: [] }>();

const ICON = {
  MONTHLY_CONTRIBUTION: ShieldCheck,
  TARGET_AMOUNT: BarChart3,
  TARGET_DATE: CalendarClock,
} satisfies Record<AdjustmentType, unknown>;

const ICON_CLASS = {
  MONTHLY_CONTRIBUTION: 'bg-blue-01 text-blue',
  TARGET_AMOUNT: 'bg-green-01 text-deep-green',
  TARGET_DATE: 'bg-pink-01 text-pink-05',
} satisfies Record<AdjustmentType, string>;
</script>

<template>
  <div class="rounded-3xl border border-dm-gray/15 bg-white p-5 shadow-sm">
    <h3 class="text-[15px] font-black tracking-[-0.02em] text-foreground">어떻게 조정할까요?</h3>

    <ul class="mt-4 flex flex-col gap-2.5">
      <li
        v-for="option in options"
        :key="option.type"
      >
        <button
          type="button"
          class="flex w-full items-center gap-3 rounded-2xl bg-green-01 px-3.5 py-3.5 text-left transition hover:bg-dm-mint-light"
          @click="$emit('viewStrategy')"
        >
          <span
            class="grid size-10 shrink-0 place-items-center rounded-xl"
            :class="ICON_CLASS[option.type]"
            aria-hidden="true"
          >
            <component
              :is="ICON[option.type]"
              :size="20"
              :stroke-width="2.2"
            />
          </span>

          <span class="min-w-0 flex-1">
            <strong class="block text-[14px] font-extrabold text-foreground">
              {{ option.title }}
            </strong>
            <span class="mt-0.5 flex flex-wrap items-center gap-1 text-[12.5px] text-dm-gray-dark">
              <span>{{ option.fromLabel }}</span>
              <span aria-hidden="true">→</span>
              <span class="font-extrabold text-foreground">{{ option.toLabel }}</span>
            </span>
            <span class="mt-0.5 block text-[11px] text-dm-gray-dark">{{ option.keeps }}</span>
          </span>

          <ChevronRight
            :size="18"
            :stroke-width="2.2"
            class="shrink-0 text-dm-gray"
            aria-hidden="true"
          />
        </button>
      </li>
    </ul>

    <button
      type="button"
      class="mt-5 flex h-[52px] w-full items-center justify-center gap-1 rounded-2xl bg-btn-mt-dark text-[15px] font-extrabold text-white transition hover:bg-btn-mt-darker"
      @click="$emit('viewStrategy')"
    >
      맞춤 전략 보기
      <ChevronRight
        :size="18"
        :stroke-width="2.6"
        aria-hidden="true"
      />
    </button>
  </div>
</template>
