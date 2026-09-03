<script setup lang="ts">
import AmountField from '@/components/onboarding/AmountField.vue';
import ChoiceField from '@/components/onboarding/ChoiceField.vue';
import HoldingAssetsField from '@/components/onboarding/HoldingAssetsField.vue';
import {
  INVESTMENT_EXPERIENCE_OPTIONS,
  INVESTMENT_HORIZON_OPTIONS,
  LOSS_REACTION_OPTIONS,
  MAX_TOLERABLE_LOSS_RATE_OPTIONS,
} from '@/constants/onboarding';
import { useInvestmentProfile } from '@/composables/useInvestmentProfile';
import type {
  InvestmentExperience,
  InvestmentHorizon,
  LossReaction,
} from '@/types/onboarding';

const EMERGENCY_FUND_OPTIONS = [
  { value: true, label: '확보하고 있다' },
  { value: false, label: '아직 없다' },
] as const;

const {
  investmentExperience,
  lossReaction,
  maxTolerableLossRate,
  investmentHorizon,
  holdingAssets,
  monthlyInvestableAmount,
  emergencyFundSecured,
  canSubmit,
  errorMessage,
  isSubmitting,
  addHoldingAsset,
  removeHoldingAsset,
  submit,
} = useInvestmentProfile();
</script>

<template>
  <form
    class="flex flex-1 flex-col gap-4 px-5 pb-8 pt-6 sm:px-10"
    aria-label="투자성향 설문"
    @submit.prevent="submit"
  >
    <header>
      <h2 class="text-lg font-extrabold text-foreground">투자성향 설문</h2>
      <p class="mt-1 text-xs text-dm-gray-dark">7개 문항에 답하면 투자성향 유형이 나와요.</p>
    </header>

    <ChoiceField
      :model-value="investmentExperience"
      label="1. 투자 경험이 어느 정도인가요?"
      :options="INVESTMENT_EXPERIENCE_OPTIONS"
      @update:model-value="investmentExperience = $event as InvestmentExperience"
    />
    <ChoiceField
      :model-value="lossReaction"
      label="2. 투자 손실이 발생하면 어떻게 대응하나요?"
      :options="LOSS_REACTION_OPTIONS"
      @update:model-value="lossReaction = $event as LossReaction"
    />
    <ChoiceField
      :model-value="maxTolerableLossRate"
      label="3. 감당할 수 있는 최대 손실률은?"
      :options="MAX_TOLERABLE_LOSS_RATE_OPTIONS"
      @update:model-value="maxTolerableLossRate = $event as number"
    />
    <ChoiceField
      :model-value="investmentHorizon"
      label="4. 투자 가능 기간은?"
      :options="INVESTMENT_HORIZON_OPTIONS"
      @update:model-value="investmentHorizon = $event as InvestmentHorizon"
    />

    <HoldingAssetsField
      :rows="holdingAssets"
      @add="addHoldingAsset"
      @remove="removeHoldingAsset"
    />

    <AmountField
      id="monthly-investable"
      v-model="monthlyInvestableAmount"
      label="6. 매월 투자에 쓸 수 있는 금액은?"
    />

    <ChoiceField
      :model-value="emergencyFundSecured"
      label="7. 비상자금(3~6개월 생활비)을 확보하고 있나요?"
      :options="EMERGENCY_FUND_OPTIONS"
      @update:model-value="emergencyFundSecured = $event as boolean"
    />

    <div class="mt-2">
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
        {{ isSubmitting ? '분석 중...' : '제출하고 결과 보기' }}
      </button>
    </div>
  </form>
</template>
