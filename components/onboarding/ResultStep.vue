<script setup lang="ts">
import { useRouter } from 'vue-router';

import { ROUTE_NAMES } from '@/constants/routes';
import type { InvestmentProfileResponseDto } from '@/types/dto/onboarding.dto';

defineProps<{
  result: InvestmentProfileResponseDto;
}>();

const router = useRouter();

function goHome() {
  router.replace({ name: ROUTE_NAMES.HOME });
}
</script>

<template>
  <section class="flex flex-1 flex-col px-5 pb-8 pt-10 text-center sm:px-10">
    <span
      class="text-[44px]"
      aria-hidden="true"
      >🎉</span
    >
    <p class="mt-4 text-xs font-extrabold text-brand-dark">나의 투자성향 유형</p>
    <h2 class="mt-1 text-[26px] font-black tracking-[-0.04em] text-foreground">
      {{ result.riskProfileTypeLabel }}
    </h2>

    <div class="mt-6 rounded-2xl border border-dm-gray/30 bg-white p-5 text-left">
      <div class="flex items-center justify-between">
        <span class="text-sm font-bold text-dm-gray-dark">투자성향 점수</span>
        <span class="text-lg font-black text-foreground">{{ result.riskProfileScore }}</span>
      </div>
      <p class="mt-3 break-keep text-sm leading-6 text-dm-gray-dark">{{ result.summary }}</p>
    </div>

    <button
      class="mt-auto grid min-h-[50px] w-full place-items-center rounded-xl bg-brand text-[15px] font-extrabold text-white transition hover:bg-brand-dark"
      type="button"
      @click="goHome"
    >
      홈으로 가기
    </button>
  </section>
</template>
