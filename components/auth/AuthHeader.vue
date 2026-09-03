<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
  title: string;
  backTo: RouteLocationRaw;
}>();
</script>

<template>
  <!-- TODO: #232631 진한 헤더 색상 토큰 등록 검토 -->
  <header
    class="sticky top-0 z-10 grid h-[54px] shrink-0 grid-cols-[40px_1fr_40px] items-center border-b border-dm-gray/20 bg-white px-3.5"
  >
    <RouterLink
      class="grid h-9 w-9 place-items-center rounded-[10px] text-[#292d38] transition hover:bg-dm-gray/10"
      :to="backTo"
      :aria-label="`${title}에서 이전 화면으로 이동`"
    >
      <svg
        class="h-[22px] w-[22px] fill-none stroke-current stroke-[2.2] [stroke-linecap:round] [stroke-linejoin:round]"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </RouterLink>
    <h1 class="m-0 text-center text-base font-extrabold tracking-[-0.025em] text-[#232631]">
      {{ title }}
    </h1>
    <span aria-hidden="true"></span>
  </header>
</template>
