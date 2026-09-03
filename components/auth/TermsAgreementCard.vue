<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import { TERMS } from '@/constants/auth';
import { ROUTE_NAMES } from '@/constants/routes';
import type { TermsType } from '@/types/auth';

const props = defineProps<{
  agreements: Record<TermsType, boolean>;
}>();

const emit = defineEmits<{
  toggle: [termsType: TermsType, agreed: boolean];
  toggleAll: [agreed: boolean];
}>();

const allAgreed = computed(() => TERMS.every((term) => props.agreements[term.termsType]));
</script>

<template>
  <fieldset
    class="m-0 min-w-0 rounded-2xl border border-dm-gray/40 bg-white p-3.5 shadow-lg shadow-dm-gray/20"
  >
    <legend class="sr-only">약관 동의</legend>

    <label class="flex cursor-pointer items-center gap-2.5">
      <input
        class="peer sr-only"
        type="checkbox"
        :checked="allAgreed"
        @change="emit('toggleAll', ($event.target as HTMLInputElement).checked)"
      />
      <span
        class="grid h-[22px] w-[22px] place-items-center rounded-[7px] border border-dm-gray/50 bg-white text-[13px] font-black text-transparent peer-checked:border-pink-03 peer-checked:bg-brand peer-checked:text-white"
        aria-hidden="true"
      >
        ✓
      </span>
      <!-- TODO: #232631 진한 제목 색상 토큰 등록 검토 -->
      <strong class="text-sm font-extrabold text-[#232631]">약관 전체 동의</strong>
    </label>

    <div class="my-3 h-px bg-dm-gray/20"></div>

    <div
      v-for="term in TERMS"
      :key="term.termsType"
      class="flex min-h-9 items-center justify-between gap-2"
    >
      <label class="flex min-w-0 cursor-pointer items-center gap-2 text-xs text-dm-gray-dark">
        <input
          class="peer sr-only"
          type="checkbox"
          :checked="agreements[term.termsType]"
          @change="emit('toggle', term.termsType, ($event.target as HTMLInputElement).checked)"
        />
        <span
          class="grid h-[19px] w-[19px] shrink-0 place-items-center rounded-md border border-dm-gray/50 bg-white text-[11px] font-black text-transparent peer-checked:border-pink-03 peer-checked:bg-brand peer-checked:text-white"
          aria-hidden="true"
        >
          ✓
        </span>
        <span>{{ term.label }}</span>
        <em
          class="rounded-full px-1.5 py-0.5 text-[9px] font-extrabold not-italic"
          :class="
            term.required ? 'bg-pink-01 text-brand' : 'bg-dm-gray/20 text-dm-gray-dark'
          "
        >
          {{ term.required ? '필수' : '선택' }}
        </em>
      </label>
      <RouterLink
        class="shrink-0 px-1 py-1.5 text-[11px] text-dm-gray-dark no-underline hover:text-brand-dark"
        :to="{ name: ROUTE_NAMES.TERMS, params: { termsType: term.slug } }"
        :aria-label="`${term.label} 전문 보기`"
      >
        보기
        <span
          class="pl-0.5 text-sm"
          aria-hidden="true"
          >›</span
        >
      </RouterLink>
    </div>
  </fieldset>
</template>
