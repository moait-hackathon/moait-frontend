<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next';

import { formatDotDate } from '@/utils/format';

defineProps<{ reportDate: string }>();

defineEmits<{ back: [] }>();
</script>

<template>
  <header
    class="sticky top-0 z-20 flex min-h-[52px] items-center gap-2 border-b border-dm-mint bg-dm-mint-light px-4"
  >
    <button
      type="button"
      class="-ml-2 grid size-9 shrink-0 place-items-center rounded-full text-dm-gray-dark transition hover:bg-white/70 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-dm-mint-dark/40"
      aria-label="뒤로 가기"
      @click="$emit('back')"
    >
      <ChevronLeft
        :size="22"
        :stroke-width="2.4"
      />
    </button>

    <span class="text-[15px] font-black tracking-[-0.02em] text-sky-09">MoAI</span>

    <span
      v-if="reportDate"
      class="ml-auto text-[11px] font-semibold text-dm-gray-dark"
    >
      {{ formatDotDate(reportDate) }} 기준 리포트
    </span>
  </header>
</template>
