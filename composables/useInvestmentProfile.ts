import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { AMOUNT_LIMITS } from '@/constants/onboarding';
import { submitInvestmentProfile } from '@/server/onboardingApi';
import { useAuthStore } from '@/stores/authStore';
import { useOnboardingStore } from '@/stores/onboardingStore';
import type { HoldingAssetDto } from '@/types/dto/onboarding.dto';
import { getApiErrorMessage } from '@/utils/apiError';
import { formatAmount, parseAmount } from '@/utils/format';
import { saveInvestmentResult } from '@/utils/investmentResult';

export function useInvestmentProfile() {
  const authStore = useAuthStore();
  const onboardingStore = useOnboardingStore();
  const {
    investmentExperience,
    lossReaction,
    maxTolerableLossRate,
    investmentHorizon,
    holdingAssets,
    monthlyInvestableAmount,
    emergencyFundSecured,
  } = storeToRefs(onboardingStore);

  const errorMessage = ref('');
  const isSubmitting = ref(false);

  watch(monthlyInvestableAmount, (value) => {
    const parsed = Math.min(parseAmount(value), AMOUNT_LIMITS.MONTHLY_INVESTABLE);
    const formatted = value === '' ? '' : formatAmount(parsed);
    if (value !== formatted) monthlyInvestableAmount.value = formatted;
  });

  watch(
    holdingAssets,
    (rows) => {
      rows.forEach((row) => {
        const parsed = Math.min(parseAmount(row.amount), AMOUNT_LIMITS.HOLDING_ASSET);
        const formatted = row.amount === '' ? '' : formatAmount(parsed);
        if (row.amount !== formatted) row.amount = formatted;
      });
    },
    { deep: true }
  );

  // Q1~Q4, Q6, Q7 응답 완료 시 제출 가능. Q5(holdingAssets)는 빈 상태 허용.
  const canSubmit = computed(
    () =>
      investmentExperience.value !== null &&
      lossReaction.value !== null &&
      maxTolerableLossRate.value !== null &&
      investmentHorizon.value !== null &&
      monthlyInvestableAmount.value.trim() !== '' &&
      emergencyFundSecured.value !== null
  );

  // 자산군 미선택 행과 0원 행은 전송에서 제외한다.
  function buildHoldingAssets(): HoldingAssetDto[] {
    const assets: HoldingAssetDto[] = [];
    for (const row of holdingAssets.value) {
      const amount = parseAmount(row.amount);
      if (row.type !== null && amount > 0) {
        assets.push({ type: row.type, amount });
      }
    }
    return assets;
  }

  async function submit() {
    if (
      isSubmitting.value ||
      !canSubmit.value ||
      investmentExperience.value === null ||
      lossReaction.value === null ||
      maxTolerableLossRate.value === null ||
      investmentHorizon.value === null ||
      emergencyFundSecured.value === null
    ) {
      return;
    }

    isSubmitting.value = true;
    errorMessage.value = '';

    try {
      const response = await submitInvestmentProfile({
        investmentExperience: investmentExperience.value,
        lossReaction: lossReaction.value,
        maxTolerableLossRate: maxTolerableLossRate.value,
        investmentHorizon: investmentHorizon.value,
        holdingAssets: buildHoldingAssets(),
        monthlyInvestableAmount: parseAmount(monthlyInvestableAmount.value),
        emergencyFundSecured: emergencyFundSecured.value,
      });

      saveInvestmentResult(response);
      onboardingStore.result = response;
      authStore.setOnboardingStep(response.onboardingStep);
    } catch (error) {
      errorMessage.value = getApiErrorMessage(error);
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
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
    addHoldingAsset: onboardingStore.addHoldingAsset,
    removeHoldingAsset: onboardingStore.removeHoldingAsset,
    submit,
  };
}
