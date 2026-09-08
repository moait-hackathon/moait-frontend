<script setup lang="ts">
import { computed } from 'vue';

import { HOLDING_ASSET_TYPE_OPTIONS } from '@/constants/onboarding';
import type { HoldingAssetRow } from '@/stores/onboardingStore';
import type { HoldingAssetType } from '@/types/onboarding';

const props = defineProps<{
  rows: HoldingAssetRow[];
}>();

const emit = defineEmits<{
  add: [];
  remove: [index: number];
}>();

// 다른 행에서 이미 선택한 자산군은 제외한다 (중복 방지). 자기 행의 현재 값은 남긴다.
function optionsForRow(rowIndex: number) {
  const used = new Set(
    props.rows
      .filter((row, index) => index !== rowIndex && row.type !== null)
      .map((row) => row.type)
  );
  return HOLDING_ASSET_TYPE_OPTIONS.filter((option) => !used.has(option.value));
}

const canAddRow = computed(() => props.rows.length < HOLDING_ASSET_TYPE_OPTIONS.length);

function onSelect(row: HoldingAssetRow, value: string) {
  row.type = value === '' ? null : (value as HoldingAssetType);
}
</script>

<template>
  <fieldset class="rounded-2xl border border-dm-gray/30 bg-white p-4">
    <legend class="px-1 text-sm font-bold text-foreground">
      현재 보유한 투자자산과 금액을 입력해주세요
    </legend>
    <p class="mt-1 px-1 text-[11px] text-dm-gray-dark">없으면 비워두어도 돼요.</p>

    <div class="mt-3 flex flex-col gap-2">
      <div
        v-for="(row, index) in rows"
        :key="index"
        class="flex items-center gap-2"
      >
        <select
          class="h-[44px] w-[112px] shrink-0 rounded-xl border border-dm-gray/40 bg-white px-2.5 text-sm font-semibold text-foreground outline-none focus:border-pink-03"
          :value="row.type ?? ''"
          @change="onSelect(row, ($event.target as HTMLSelectElement).value)"
        >
          <option value="">자산군</option>
          <option
            v-for="option in optionsForRow(index)"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <div class="relative flex-1">
          <input
            v-model="row.amount"
            class="h-[44px] w-full rounded-xl border border-dm-gray/40 bg-white pl-3 pr-8 text-right text-sm font-semibold text-foreground outline-none focus:border-pink-03"
            type="text"
            inputmode="numeric"
            placeholder="0"
          />
          <span
            class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-dm-gray-dark"
          >
            원
          </span>
        </div>
        <button
          class="grid h-[44px] w-9 shrink-0 place-items-center rounded-xl text-dm-gray-dark transition hover:bg-dm-gray/10"
          type="button"
          aria-label="자산군 삭제"
          @click="emit('remove', index)"
        >
          ✕
        </button>
      </div>
    </div>

    <button
      class="mt-3 h-[44px] w-full rounded-xl border border-dashed border-dm-gray/50 text-sm font-semibold text-dm-gray-dark transition hover:border-brand/40 hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
      type="button"
      :disabled="!canAddRow"
      @click="emit('add')"
    >
      + 자산군 추가
    </button>
  </fieldset>
</template>
