<script setup lang="ts">
// 온보딩 상단 헤더. 진행도(n/total)와 뒤로가기(선택)를 표시한다.
const props = withDefaults(
  defineProps<{
    step: number;
    totalSteps: number;
    showProgress?: boolean;
    showBack?: boolean;
  }>(),
  { showProgress: true, showBack: false }
);

const emit = defineEmits<{ back: [] }>();

function progressWidth() {
  return `${Math.min(Math.max(props.step / props.totalSteps, 0), 1) * 100}%`;
}
</script>

<template>
  <header class="shrink-0 px-5 pt-[max(14px,env(safe-area-inset-top))] sm:px-8">
    <div class="mb-2 flex min-h-10 items-center justify-between">
      <button
        v-if="showBack"
        type="button"
        class="-ml-2 grid h-10 w-10 place-items-center rounded-[10px] text-dm-gray-dark transition hover:bg-dm-gray/10"
        aria-label="이전 단계로 이동"
        @click="emit('back')"
      >
        <svg
          class="h-[22px] w-[22px] fill-none stroke-current stroke-[2.2] [stroke-linecap:round] [stroke-linejoin:round]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <span
        v-else
        aria-hidden="true"
      ></span>
      <span
        v-if="showProgress"
        class="text-[11px] font-medium text-dm-gray-dark"
      >
        {{ step }} / {{ totalSteps }}
      </span>
    </div>
    <div
      v-if="showProgress"
      class="h-[3px] overflow-hidden rounded-full bg-dm-gray/15"
      role="progressbar"
      :aria-valuenow="step"
      aria-valuemin="1"
      :aria-valuemax="totalSteps"
    >
      <span
        class="block h-full rounded-full bg-brand transition-[width] duration-300 motion-reduce:transition-none"
        :style="{ width: progressWidth() }"
      ></span>
    </div>
  </header>
</template>
