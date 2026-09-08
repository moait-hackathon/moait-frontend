import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { InvestmentProfileResponseDto } from '@/types/dto/onboarding.dto';
import type {
  HoldingAssetType,
  InvestmentExperience,
  InvestmentHorizon,
  LossReaction,
} from '@/types/onboarding';

// Q5 자산군 입력 행. amount 는 콤마 포함 표시 문자열.
export interface HoldingAssetRow {
  type: HoldingAssetType | null;
  amount: string;
}

export const useOnboardingStore = defineStore('onboarding', () => {
  // --- 기본 재무정보 (표시 문자열) ---
  const annualIncome = ref('');
  const totalAsset = ref('');

  // --- 투자성향 설문 ---
  const investmentExperience = ref<InvestmentExperience | null>(null);
  const lossReaction = ref<LossReaction | null>(null);
  const maxTolerableLossRate = ref<number | null>(null);
  const investmentHorizon = ref<InvestmentHorizon | null>(null);
  const holdingAssets = ref<HoldingAssetRow[]>([]);
  const monthlyInvestableAmount = ref('');
  const emergencyFundSecured = ref<boolean | null>(null);

  // --- 결과 (방금 제출한 경우에만 채워짐) ---
  const result = ref<InvestmentProfileResponseDto | null>(null);

  function addHoldingAsset() {
    holdingAssets.value.push({ type: null, amount: '' });
  }

  function removeHoldingAsset(index: number) {
    holdingAssets.value.splice(index, 1);
  }

  function resetFinancialInfo() {
    annualIncome.value = '';
    totalAsset.value = '';
  }

  function resetSurvey() {
    investmentExperience.value = null;
    lossReaction.value = null;
    maxTolerableLossRate.value = null;
    investmentHorizon.value = null;
    holdingAssets.value = [];
    monthlyInvestableAmount.value = '';
    emergencyFundSecured.value = null;
  }

  function reset() {
    resetFinancialInfo();
    resetSurvey();
    result.value = null;
  }

  return {
    annualIncome,
    totalAsset,
    investmentExperience,
    lossReaction,
    maxTolerableLossRate,
    investmentHorizon,
    holdingAssets,
    monthlyInvestableAmount,
    emergencyFundSecured,
    result,
    addHoldingAsset,
    removeHoldingAsset,
    resetFinancialInfo,
    resetSurvey,
    reset,
  };
});
