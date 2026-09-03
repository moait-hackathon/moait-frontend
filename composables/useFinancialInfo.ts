import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { AMOUNT_LIMITS } from '@/constants/onboarding';
import { submitFinancialInfo } from '@/server/onboardingApi';
import { useAuthStore } from '@/stores/authStore';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { getApiErrorMessage } from '@/utils/apiError';
import { formatAmount, parseAmount } from '@/utils/format';

export function useFinancialInfo() {
  const authStore = useAuthStore();
  const onboardingStore = useOnboardingStore();
  const { annualIncome, totalAsset } = storeToRefs(onboardingStore);

  const errorMessage = ref('');
  const isSubmitting = ref(false);

  // 콤마 표시 유지 + 상한 적용.
  function bindAmount(field: 'annualIncome' | 'totalAsset', limit: number) {
    watch(
      () => onboardingStore[field],
      (value) => {
        const parsed = Math.min(parseAmount(value), limit);
        const formatted = value === '' ? '' : formatAmount(parsed);
        if (value !== formatted) onboardingStore[field] = formatted;
      }
    );
  }

  bindAmount('annualIncome', AMOUNT_LIMITS.ANNUAL_INCOME);
  bindAmount('totalAsset', AMOUNT_LIMITS.TOTAL_ASSET);

  watch([annualIncome, totalAsset], () => {
    errorMessage.value = '';
  });

  const canSubmit = computed(
    () => annualIncome.value.trim() !== '' && totalAsset.value.trim() !== ''
  );

  async function submit() {
    if (isSubmitting.value || !canSubmit.value) return;

    isSubmitting.value = true;
    errorMessage.value = '';

    try {
      const response = await submitFinancialInfo({
        annualIncome: parseAmount(annualIncome.value),
        totalAsset: parseAmount(totalAsset.value),
      });
      authStore.setOnboardingStep(response.onboardingStep);
    } catch (error) {
      errorMessage.value = getApiErrorMessage(error);
    } finally {
      isSubmitting.value = false;
    }
  }

  return { annualIncome, totalAsset, canSubmit, errorMessage, isSubmitting, submit };
}
