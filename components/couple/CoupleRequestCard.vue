<script setup lang="ts">
import { computed } from 'vue';

import type { CoupleRequest } from '@/types/couple';

const props = withDefaults(
  defineProps<{
    request: CoupleRequest;
    acceptDisabled?: boolean;
    isAccepting?: boolean;
  }>(),
  { acceptDisabled: false, isAccepting: false }
);

const emit = defineEmits<{ accept: [partnerUserId: number] }>();

const genderLabel = computed(() => (props.request.partnerGender === 'MALE' ? '남성' : '여성'));

const roleLabel = computed(() => {
  switch (props.request.status) {
    case 'WAIT':
      return '보낸 요청';
    case 'REQUESTED':
      return '받은 요청';
    default:
      return '연결됨';
  }
});

const buttonLabel = computed(() => {
  if (props.isAccepting) return '수락 중';
  if (props.request.status === 'WAIT') return '연결 대기';
  if (props.request.status === 'CONNECTED') return '연결 완료';
  return '수락';
});

function handleAccept() {
  if (props.acceptDisabled || props.isAccepting || props.request.status !== 'REQUESTED') return;
  emit('accept', props.request.partnerUserId);
}
</script>

<template>
  <li
    class="flex min-w-0 items-center gap-3 rounded-2xl border border-pink-03/45 bg-pink-01 px-3.5 py-3"
  >
    <span
      class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-dm-gray-light text-brand-dark"
      aria-hidden="true"
    >
      <svg
        class="h-5 w-5 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
        viewBox="0 0 24 24"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle
          cx="12"
          cy="7"
          r="4"
        />
      </svg>
    </span>

    <span class="min-w-0 flex-1">
      <strong class="block truncate text-sm font-extrabold text-foreground">
        {{ request.partnerName }}
      </strong>
      <span class="mt-0.5 block text-[11px] text-dm-gray-dark">
        {{ roleLabel }} · {{ genderLabel }}
      </span>
    </span>

    <button
      type="button"
      class="shrink-0 rounded-full bg-brand px-3 py-1.5 text-[11px] font-extrabold text-white transition disabled:cursor-default disabled:opacity-70"
      :disabled="acceptDisabled || isAccepting || request.status !== 'REQUESTED'"
      :aria-label="`${request.partnerName}님의 연결 요청 ${buttonLabel}`"
      @click="handleAccept"
    >
      {{ buttonLabel }}
    </button>
  </li>
</template>
