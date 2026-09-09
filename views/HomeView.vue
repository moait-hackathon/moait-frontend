<script setup lang="ts">
import { ArrowRight, ChevronRight, CircleUserRound, Sparkles } from 'lucide-vue-next';

import { useHomeView } from '@/composables/useHomeView';

const {
  home,
  formatAmount,
  formatDate,
  formatRate,
  formatChangeAmount,
  achievementDegree,
  graphPoints,
  goToAiReport,
  goToAiChat,
} = useHomeView();
</script>

<template>
  <main class="min-h-dvh w-full bg-white">
    <div class="flex min-h-dvh w-full flex-col bg-dm-mint-light">
      <header class="flex h-10 items-center justify-between px-5">
        <span class="text-base font-bold text-foreground">MoAI</span>
        <button
          type="button"
          aria-label="마이페이지"
          class="grid h-6 w-6 place-items-center"
        >
          <CircleUserRound
            class="h-5 w-5 text-deep-green"
            :stroke-width="2.5"
          />
        </button>
      </header>

      <section class="bg-dm-mint-light px-7 pb-8 pt-5">
        <p class="text-sm font-semibold text-dm-gray-dark">
          {{ home?.userName ?? '' }}님과 {{ home?.coupleName ?? '' }}님이
        </p>
        <h1 class="mt-1 text-xl font-bold tracking-tight text-foreground">
          함께 만들어가는 우리의 목표
        </h1>

        <div class="mt-7 flex items-center justify-between">
          <div>
            <p class="text-base font-bold text-foreground">우리의 목표</p>
            <p class="mt-1 text-xs text-dm-gray-dark">
              목표일: {{ formatDate(home?.targetDate ?? '') }}
            </p>
            <div class="mt-4 flex items-end gap-2">
              <strong class="text-2xl font-extrabold text-deep-green">
                {{ formatAmount(home?.currentAmount ?? 0) }}원
              </strong>
              <div class="mb-1 text-xs text-end leading-5 text-dm-gray-dark">
                <span>목표 금액</span>
                <br />
                <span>/ {{ formatAmount(home?.targetAmount ?? 0) }}원</span>
              </div>
            </div>
          </div>

          <div
            class="relative flex h-22 w-22 items-center justify-center rounded-full"
            :style="{
              background: `conic-gradient(#328c87 ${achievementDegree}, #D0ECEB 0deg)`,
            }"
          >
            <div class="flex h-17 w-17 items-center justify-center rounded-full bg-dm-mint-light">
              <span class="text-2xl font-bold text-deep-green">
                {{ home?.achievementRate ?? 0 }}%
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="-mt-1 flex-1 rounded-t-3xl bg-white px-5 pb-8 pt-6">
        <div class="rounded-2xl border border-dm-gray/20 px-4 py-4">
          <p class="text-xs font-medium text-dm-gray-dark">전체 자산</p>
          <div class="mt-2 flex items-end justify-between">
            <div>
              <p
                class="text-xl font-extrabold"
                :class="
                  (home?.totalAssetChangeAmount ?? 0) >= 0 ? 'text-brand-dark' : 'text-sky-09'
                "
              >
                {{ formatChangeAmount(home?.totalAssetChangeAmount ?? 0) }}
              </p>
              <p class="mt-1 text-xs text-dm-gray">
                {{ formatRate(home?.totalAssetReturnRate ?? 0) }}
              </p>
            </div>

            <div class="h-18 w-42">
              <svg
                v-if="graphPoints"
                viewBox="0 0 170 70"
                class="h-full w-full"
                preserveAspectRatio="none"
                aria-label="전체 자산 수익률 그래프"
              >
                <line
                  x1="5"
                  y1="35"
                  x2="165"
                  y2="35"
                  class="text-dm-gray"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-dasharray="4 3"
                />
                <polyline
                  :points="graphPoints"
                  fill="none"
                  class="text-deep-green"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="mt-3 grid grid-cols-2 gap-3">
          <div class="rounded-2xl border border-dm-gray/20 px-4 py-5">
            <p class="text-xs font-medium text-dm-gray-dark">오늘 수익률</p>
            <p
              class="mt-3 text-xl font-extrabold"
              :class="(home?.todayAssetReturnRate ?? 0) >= 0 ? 'text-sky-09' : 'text-brand-dark'"
            >
              {{ formatRate(home?.todayAssetReturnRate ?? 0) }}
            </p>
            <p class="mt-1 text-xs text-dm-gray">
              {{ formatChangeAmount(home?.todayAssetChangeAmount ?? 0) }}
            </p>
          </div>

          <button
            type="button"
            class="flex cursor-pointer items-center justify-between rounded-2xl border border-dm-gray/20 px-5 text-left"
            @click="goToAiReport"
          >
            <span class="text-base font-semibold text-dm-gray-dark">AI 리포트</span>
            <ChevronRight
              :size="20"
              class="text-dm-gray-dark"
            />
          </button>
        </div>

        <div class="mt-10">
          <h2 class="text-base font-bold text-foreground">오늘은 무엇을 해볼까요?</h2>
          <button
            type="button"
            class="mt-3 flex h-16 w-full cursor-pointer items-center gap-3 rounded-2xl border border-dm-gray/10 bg-white px-4 shadow-md"
            @click="goToAiChat"
          >
            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dm-mint-light"
            >
              <Sparkles
                :size="17"
                class="text-foreground"
                fill="currentColor"
              />
            </span>
            <span class="text-sm font-bold text-sky-09">MoAI</span>
            <span class="flex-1 text-left text-sm text-dm-gray">무엇이든 물어보세요</span>
            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-deep-green"
            >
              <ArrowRight
                :size="18"
                class="text-white"
              />
            </span>
          </button>
        </div>
      </section>
    </div>
  </main>
</template>
