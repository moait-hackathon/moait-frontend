<script setup lang="ts">
import { ArrowRight, ChevronRight, CircleUserRound, Sparkles, TrendingUp } from 'lucide-vue-next';
import { nextTick, ref, watch, type Ref, type WatchSource } from 'vue';

import { useHomeView } from '@/composables/useHomeView';

const {
  home,
  formatKrwUnit,
  formatDate,
  formatRate,
  formatChangeAmount,
  achievementFraction,
  graphPoints,
  graphAreaPoints,
  allocationSegments,
  goToAiReport,
  goToAiChat,
  goToMyPage,
} = useHomeView();

// 홈 첫 진입 시 그래프·도넛이 그려지는 애니메이션. 데이터가 준비되면 한 번만 재생한다.
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const graphDrawn = ref(false);
const ringsDrawn = ref(false);

function playOnce(source: WatchSource<unknown>, flag: Ref<boolean>) {
  watch(
    source,
    async (value) => {
      if (!value || flag.value) return;
      if (prefersReducedMotion) {
        flag.value = true;
        return;
      }
      await nextTick();
      requestAnimationFrame(() => {
        flag.value = true;
      });
    },
    { immediate: true }
  );
}

playOnce(graphPoints, graphDrawn);
playOnce(() => home.value, ringsDrawn);

// TODO: 아래 신규 HEX(#1B2440 · #7C8983 · #202B26 · #E3F6F3 · #42BDB8 · #E46962 ·
// #6B7392 · #B7FFE7 · #F5FBF9 · #16241D · #1FAE86 · #8A90AE · #EEFDFA · #26CD9E ·
// #7EEDE9 · #14241C · #282828 · #030303 · #F1F2F3 · #F9F9F9 · #A6ABC4 · #666666 ·
// #52605A)는 토큰 등록 검토 대상.
const AI_CHIPS = ['위험도 낮춰도 될까?', '이번 달 얼마 모았어?'];
</script>

<template>
  <main class="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col bg-white">
    <header class="flex h-16 items-center justify-between px-4 pt-1.5">
      <span class="px-3 text-base font-bold tracking-tight text-[#1B2440]">MoAIT</span>
      <button
        type="button"
        aria-label="마이페이지"
        class="grid size-[33px] shrink-0 place-items-center"
        @click="goToMyPage"
      >
        <CircleUserRound
          class="size-[30px] text-foreground"
          :stroke-width="2"
        />
      </button>
    </header>

    <div class="flex flex-1 flex-col gap-3.5 px-4 pb-2.5 pt-px">
      <!-- 인사말 + 진행 상태 -->
      <section>
        <p class="text-sm font-medium text-[#7C8983]">
          {{ home?.userName ?? '' }}님과 {{ home?.coupleName ?? '' }}님은
        </p>
        <h1 class="mt-1 text-2xl font-extrabold tracking-tight text-[#202B26]">
          목표까지 순조롭게 가고 있어요
        </h1>

        <div class="mt-4 flex items-end gap-3">
          <span
            class="shrink-0 rounded-[20px] bg-[#E3F6F3] px-2.5 py-1.5 text-xs font-semibold text-[#7C8983]"
          >
            목표일 · {{ formatDate(home?.targetDate ?? '') }}
          </span>

          <svg
            v-if="graphPoints"
            viewBox="0 0 170 70"
            class="ml-auto h-[88px] w-1/2 min-w-0 max-w-[200px]"
            preserveAspectRatio="none"
            aria-label="자산 수익률 추이"
          >
            <polygon
              :points="graphAreaPoints"
              fill="url(#homeGraphFill)"
              :style="{
                opacity: graphDrawn ? 1 : 0,
                transition: prefersReducedMotion ? undefined : 'opacity 600ms ease-out 450ms',
              }"
            />
            <polyline
              :points="graphPoints"
              fill="none"
              stroke="#42BDB8"
              stroke-width="2.6"
              stroke-linecap="round"
              stroke-linejoin="round"
              pathLength="1"
              :style="{
                strokeDasharray: 1,
                strokeDashoffset: graphDrawn ? 0 : 1,
                transition: prefersReducedMotion ? undefined : 'stroke-dashoffset 900ms ease-out',
              }"
            />
            <defs>
              <linearGradient
                id="homeGraphFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stop-color="#42BDB8"
                  stop-opacity="0.25"
                />
                <stop
                  offset="100%"
                  stop-color="#42BDB8"
                  stop-opacity="0"
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      <!-- 총 투자 금액 -->
      <section class="rounded-[22px] border border-[#14241C]/[0.09] p-5">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0 flex-1">
            <p class="text-sm font-bold text-[#282828]">총 투자 금액</p>
            <p class="mt-3 text-2xl font-black leading-tight text-black break-keep">
              {{ formatKrwUnit(home?.currentAmount ?? 0, { truncateToMan: true }) }}
              <span class="text-dm-gray-dark"
                >/ {{ formatKrwUnit(home?.targetAmount ?? 0, { truncateToMan: true }) }}</span
              >
            </p>
            <p
              class="mt-3 flex flex-wrap items-center gap-x-1 text-xs font-bold"
              :class="(home?.totalAssetChangeAmount ?? 0) >= 0 ? 'text-[#E46962]' : 'text-sky-09'"
            >
              <svg
                viewBox="0 0 10 6"
                class="h-1.5 w-2.5 shrink-0"
                aria-hidden="true"
              >
                <polygon
                  v-if="(home?.totalAssetChangeAmount ?? 0) >= 0"
                  points="5,0 10,6 0,6"
                  fill="currentColor"
                />
                <polygon
                  v-else
                  points="0,0 10,0 5,6"
                  fill="currentColor"
                />
              </svg>
              <span>{{ formatChangeAmount(home?.totalAssetChangeAmount ?? 0) }}</span>
              <span>{{ formatRate(home?.totalAssetReturnRate ?? 0) }}</span>
            </p>
          </div>

          <div class="relative size-20 shrink-0">
            <svg
              viewBox="0 0 36 36"
              class="size-full -rotate-90"
              aria-hidden="true"
            >
              <circle
                cx="18"
                cy="18"
                r="15.75"
                fill="none"
                stroke="#F9F9F9"
                stroke-width="4.5"
              />
              <circle
                cx="18"
                cy="18"
                r="15.75"
                fill="none"
                stroke="#42BDB8"
                stroke-width="4.5"
                pathLength="1"
                :style="{
                  strokeDasharray: 1,
                  strokeDashoffset: ringsDrawn ? 1 - achievementFraction : 1,
                  transition: prefersReducedMotion ? undefined : 'stroke-dashoffset 900ms ease-out',
                }"
              />
            </svg>
            <span
              class="absolute inset-0 grid place-items-center text-xl font-semibold text-[#42BDB8]"
            >
              {{ home?.achievementRate ?? 0 }}%
            </span>
          </div>
        </div>
      </section>

      <!-- 오늘 수익률 · 투자 전략 리포트 -->
      <section class="grid grid-cols-2 gap-3">
        <div
          class="flex flex-col justify-between rounded-[20px] border border-[#14241C]/[0.09] p-4"
        >
          <p class="text-sm font-semibold text-black">오늘 수익률</p>
          <p
            class="mt-2 text-2xl font-black"
            :class="(home?.todayAssetReturnRate ?? 0) >= 0 ? 'text-[#E46962]' : 'text-sky-09'"
          >
            {{ formatRate(home?.todayAssetReturnRate ?? 0) }}
          </p>
          <p class="mt-1 text-xs font-medium text-[#6B7392]">
            {{ formatChangeAmount(home?.todayAssetChangeAmount ?? 0) }}
          </p>
        </div>

        <button
          type="button"
          class="flex cursor-pointer flex-col justify-between gap-2 rounded-[20px] bg-[#B7FFE7] p-4 text-left"
          @click="goToAiReport"
        >
          <span class="flex items-center justify-between gap-1">
            <span class="min-w-0 text-sm font-semibold text-[#030303]">투자 전략 리포트</span>
            <ChevronRight
              :size="16"
              class="shrink-0 text-[#A6ABC4]"
            />
          </span>
          <span class="flex items-end justify-between gap-2">
            <span class="text-xs font-semibold leading-snug text-[#666666] break-keep">
              투자 전략을 확인하러 갈까요?
            </span>
            <TrendingUp
              :size="28"
              class="shrink-0 text-[#1FAE86]"
            />
          </span>
        </button>
      </section>

      <!-- MoAI 대화 -->
      <section class="flex flex-col gap-1.5 rounded-3xl border border-[#14241C]/[0.09] p-5">
        <div class="flex w-full items-center gap-2.5">
          <span
            class="grid size-[34px] shrink-0 place-items-center rounded-[11px] bg-gradient-to-br from-[#26CD9E] to-[#7EEDE9]"
          >
            <Sparkles
              :size="18"
              class="text-white"
              fill="currentColor"
            />
          </span>
          <span class="min-w-0 text-lg font-black tracking-tight text-[#16241D]">
            MoAI에게 물어보세요
          </span>
        </div>

        <p class="w-full pb-2 text-xs text-[#6B7392] break-keep">
          오늘의 자산이나 목표 진행 상황을 편하게 물어보세요.
        </p>

        <button
          type="button"
          class="flex w-full cursor-pointer items-center gap-2.5 rounded-2xl bg-[#F5FBF9] py-3 pl-4 pr-2 text-left"
          @click="goToAiChat"
        >
          <span class="min-w-0 flex-1 truncate text-sm text-[#8A90AE]">무엇이든 물어보세요</span>
          <span class="grid size-8 shrink-0 place-items-center rounded-2xl bg-[#1FAE86]">
            <ArrowRight
              :size="14"
              class="text-white"
            />
          </span>
        </button>

        <div class="mt-2 flex w-full flex-wrap gap-2">
          <button
            v-for="chip in AI_CHIPS"
            :key="chip"
            type="button"
            class="cursor-pointer rounded-[20px] bg-[#EEFDFA] px-3 py-2 text-xs font-semibold text-[#42BDB8]"
            @click="goToAiChat"
          >
            {{ chip }}
          </button>
        </div>
      </section>

      <!-- 자산 배분 -->
      <section
        class="flex flex-col gap-4 rounded-[22px] border border-[#14241C]/[0.09] px-5 pb-5 pt-8"
      >
        <p class="text-base font-extrabold text-[#202B26]">자산 배분</p>

        <div class="flex items-center gap-5">
          <svg
            v-if="allocationSegments.length"
            viewBox="0 0 36 36"
            class="aspect-square w-[38%] max-w-[131px] shrink-0 -rotate-90"
            role="img"
            aria-label="자산 배분 비율"
          >
            <circle
              cx="18"
              cy="18"
              r="13.5"
              fill="none"
              stroke="#F1F2F3"
              stroke-width="9"
            />
            <circle
              v-for="seg in allocationSegments"
              :key="seg.key"
              cx="18"
              cy="18"
              r="13.5"
              fill="none"
              :stroke="seg.color"
              stroke-width="9"
              pathLength="1"
              :stroke-dashoffset="-seg.start"
              :style="{
                strokeDasharray: `${ringsDrawn ? seg.fraction : 0} 1`,
                transition: prefersReducedMotion ? undefined : 'stroke-dasharray 600ms ease-out',
                transitionDelay: prefersReducedMotion ? undefined : `${seg.start * 600}ms`,
              }"
            />
          </svg>

          <ul class="min-w-0 flex-1">
            <li
              v-for="seg in allocationSegments"
              :key="seg.key"
              class="flex items-center justify-between gap-2 py-[7px]"
            >
              <span class="flex min-w-0 items-center gap-2">
                <span
                  class="size-[9px] shrink-0 rounded-[3px]"
                  :style="{ backgroundColor: seg.color }"
                ></span>
                <span class="truncate text-sm text-[#52605A]">{{ seg.label }}</span>
              </span>
              <b class="shrink-0 text-sm font-extrabold text-[#202B26]">{{ seg.ratio }}%</b>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </main>
</template>
