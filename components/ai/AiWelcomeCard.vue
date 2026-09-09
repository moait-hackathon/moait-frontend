<script setup lang="ts">
import { ChartPie, WalletCards } from 'lucide-vue-next';

import type { AiFeature } from '@/types/ai';

const features: AiFeature[] = [
  {
    title: '맞춤 목표 예산 추천',
    description: '소비 내역을 바탕으로 항목별 예산을 구성해요',
    icon: 'wallet',
  },
  {
    title: '가입 후 소비 리포트',
    description: '전체 지출 흐름과 항목·요일별 소비를 분석해요',
    icon: 'chart',
  },
];
</script>

<template>
  <section
    class="rounded-3xl border border-dm-gray/25 bg-white p-5 shadow-md"
    aria-labelledby="ai-welcome-title"
  >
    <h2
      id="ai-welcome-title"
      class="break-keep text-base font-black leading-6 tracking-[-0.02em] text-foreground"
    >
      안녕하세요! MoAI예요 👋<br />
      아래 기능을 도와드릴 수 있어요.
    </h2>

    <ul class="mt-5 space-y-4">
      <li
        v-for="feature in features"
        :key="feature.title"
        class="flex gap-3"
      >
        <span
          class="mt-0.5 grid size-7 shrink-0 place-items-center text-dm-mint-darker"
          aria-hidden="true"
        >
          <WalletCards
            v-if="feature.icon === 'wallet'"
            :size="22"
            :stroke-width="2.2"
          />
          <ChartPie
            v-else
            :size="22"
            :stroke-width="2.2"
          />
        </span>

        <div>
          <h3 class="text-sm font-extrabold leading-5 text-foreground">{{ feature.title }}</h3>
          <p class="mt-0.5 break-keep text-xs font-medium leading-5 text-dm-gray-dark">
            {{ feature.description }}
          </p>
        </div>
      </li>
    </ul>

    <div class="mt-5 border-t border-dm-gray/25 pt-4">
      <p class="break-keep text-xs font-semibold leading-5 text-dm-gray-dark">
        궁금한 내용이나 필요한 도움을 자유롭게 말씀해 주세요.<br />
        더 다양한 자산 관리 AI 기능도 계속 추가될 예정이에요.
      </p>
    </div>
  </section>
</template>
