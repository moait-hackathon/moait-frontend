<script setup lang="ts">
import { computed } from 'vue';

import type { Headline } from '@/types/aiReport';

const props = defineProps<{ headline: Headline; imageSrc: string }>();

const isWarning = computed(() => props.headline.tone === 'WARNING');
const markClass = computed(() => (isWarning.value ? 'text-red' : 'text-deep-green'));

// "제목 ...강조... 나머지" 를 강조 구간 기준으로 3조각으로 나눈다.
function splitByHighlight(text: string, highlight: string) {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (at === -1) return { before: text, mark: '', after: '' };
  return {
    before: text.slice(0, at),
    mark: highlight,
    after: text.slice(at + highlight.length),
  };
}

const title = computed(() => splitByHighlight(props.headline.title, props.headline.titleHighlight));
const summary = computed(() =>
  splitByHighlight(props.headline.summaryTitle, props.headline.summaryHighlight)
);
</script>

<template>
  <div class="bg-dm-mint-light">
    <div class="relative flex min-h-[188px] items-start gap-3 px-6 pb-0 pt-6">
      <div class="relative z-10 max-w-[50%] pb-6">
        <h1
          class="whitespace-pre-line text-[26px] font-black leading-[1.28] tracking-[-0.04em] text-foreground"
        >
          <span>{{ title.before }}</span
          ><span :class="markClass">{{ title.mark }}</span
          ><span>{{ title.after }}</span>
        </h1>
        <p
          class="mt-3 whitespace-pre-line text-[13px] font-semibold leading-[1.55] text-dm-gray-dark"
        >
          {{ headline.description }}
        </p>
      </div>

      <!-- 수달: 민트 영역 맨 아래에 딱 붙게(-bottom 으로 이미지 여백만큼 당겨 흰 블록에 살짝 겹침) -->
      <img
        :src="imageSrc"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute -bottom-4 right-0 z-0 w-[250px] select-none"
      />
    </div>

    <!-- 흰 요약 블록을 수달 위로 올려서 민트/흰 경계에 수달이 깔끔하게 맞물리게 한다 -->
    <div class="relative z-10 rounded-t-[28px] bg-white px-6 pb-7 pt-8 text-center">
      <h2
        class="whitespace-pre-line text-[19px] font-black leading-[1.4] tracking-[-0.03em] text-foreground"
      >
        <span>{{ summary.before }}</span
        ><span :class="markClass">{{ summary.mark }}</span
        ><span>{{ summary.after }}</span>
      </h2>
      <p
        class="mx-auto mt-2.5 max-w-[19rem] text-[12px] font-medium leading-[1.6] text-dm-gray-dark"
      >
        {{ headline.summaryDescription }}
      </p>
    </div>
  </div>
</template>
