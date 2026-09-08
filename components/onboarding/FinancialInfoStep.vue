<script setup lang="ts">
import AmountField from '@/components/onboarding/AmountField.vue';
import { useFinancialInfo } from '@/composables/useFinancialInfo';

const { annualIncome, totalAsset, canSubmit, errorMessage, isSubmitting, submit } =
  useFinancialInfo();
</script>

<template>
  <form
    class="flex flex-1 flex-col gap-5 px-5 pb-8 pt-6 sm:px-10"
    aria-label="기본 재무정보"
    @submit.prevent="submit"
  >
    <header>
      <h2 class="text-lg font-extrabold text-foreground">기본 재무정보</h2>
      <p class="mt-1 text-xs text-dm-gray-dark">투자성향 분석을 위한 기본 정보예요.</p>
    </header>

    <AmountField
      id="annual-income"
      v-model="annualIncome"
      label="연소득"
    />
    <AmountField
      id="total-asset"
      v-model="totalAsset"
      label="총자산"
    />

    <div class="mt-auto pt-2">
      <p
        v-if="errorMessage"
        class="mb-2 text-xs font-semibold text-brand-dark"
        role="alert"
        aria-live="polite"
      >
        {{ errorMessage }}
      </p>
      <button
        class="grid min-h-[50px] w-full place-items-center rounded-xl bg-brand text-[15px] font-extrabold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        :disabled="isSubmitting || !canSubmit"
      >
        {{ isSubmitting ? '저장 중...' : '다음' }}
      </button>
    </div>
  </form>
</template>
