import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { GOAL_AMOUNT_LIMITS, GOAL_ONBOARDING_TOTAL_STEPS } from '@/constants/goal';
import { ROUTE_NAMES } from '@/constants/routes';
import { toGoal } from '@/models/Goal';
import { createGoal } from '@/server/goalApi';
import { useAuthStore } from '@/stores/authStore';
import { useGoalStore } from '@/stores/goalStore';
import { getApiErrorMessage } from '@/utils/apiError';
import { formatAmount, parseAmount } from '@/utils/format';

// 오늘(로컬) 날짜를 YYYY-MM-DD 로. targetDate input 의 min 값.
export function todayIsoDate(): string {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

// 공동 목표 온보딩 5단계 진행·검증·제출.
export function useGoalOnboarding() {
  const router = useRouter();
  const authStore = useAuthStore();
  const goalStore = useGoalStore();

  const {
    targetAmount,
    targetDate,
    currentAmount,
    monthlyInvestableAmount,
    emergencyFundMonths,
    monthlySurplusBand,
    maxAllowedLossRate,
    lossReaction,
    investmentExperience,
    goal,
  } = storeToRefs(goalStore);

  const step = ref(1);
  const isSubmitting = ref(false);
  const isSubmitted = ref(false);
  const errorMessage = ref('');

  const totalSteps = GOAL_ONBOARDING_TOTAL_STEPS;
  const minDate = todayIsoDate();

  // 콤마 표시 유지 + 상한 적용.
  function bindAmount(field: 'targetAmount' | 'currentAmount' | 'monthlyInvestableAmount', limit: number) {
    watch(
      () => goalStore[field],
      (value) => {
        const formatted = value === '' ? '' : formatAmount(Math.min(parseAmount(value), limit));
        if (value !== formatted) goalStore[field] = formatted;
      }
    );
  }

  bindAmount('targetAmount', GOAL_AMOUNT_LIMITS.TARGET_AMOUNT);
  bindAmount('currentAmount', GOAL_AMOUNT_LIMITS.CURRENT_AMOUNT);
  bindAmount('monthlyInvestableAmount', GOAL_AMOUNT_LIMITS.MONTHLY_INVESTABLE);

  watch(step, () => {
    errorMessage.value = '';
  });

  const canProceed = computed(() => {
    switch (step.value) {
      case 1:
        return (
          parseAmount(targetAmount.value) > 0 &&
          targetDate.value !== '' &&
          targetDate.value > minDate
        );
      case 2:
        // 현재 투자금 0 허용, 월 투자금은 입력 필요(0 허용).
        return currentAmount.value.trim() !== '' && monthlyInvestableAmount.value.trim() !== '';
      case 3:
        return emergencyFundMonths.value !== null && monthlySurplusBand.value !== null;
      case 4:
        return maxAllowedLossRate.value !== null && lossReaction.value !== null;
      case 5:
        return investmentExperience.value !== null;
      default:
        return false;
    }
  });

  const isLastStep = computed(() => step.value === totalSteps);

  function next() {
    if (!canProceed.value || isSubmitting.value) return;
    if (isLastStep.value) {
      void submit();
      return;
    }
    step.value += 1;
  }

  function back() {
    if (step.value > 1) step.value -= 1;
  }

  async function submit() {
    if (
      isSubmitting.value ||
      emergencyFundMonths.value === null ||
      monthlySurplusBand.value === null ||
      maxAllowedLossRate.value === null ||
      lossReaction.value === null ||
      investmentExperience.value === null
    ) {
      return;
    }

    isSubmitting.value = true;
    errorMessage.value = '';

    try {
      const response = await createGoal({
        targetAmount: parseAmount(targetAmount.value),
        targetDate: targetDate.value,
        currentAmount: parseAmount(currentAmount.value),
        monthlyInvestableAmount: parseAmount(monthlyInvestableAmount.value),
        emergencyFundMonths: emergencyFundMonths.value,
        monthlySurplusBand: monthlySurplusBand.value,
        maxAllowedLossRate: maxAllowedLossRate.value,
        lossReaction: lossReaction.value,
        investmentExperience: investmentExperience.value,
      });
      goalStore.goal = toGoal(response);
      authStore.setOnboardingStep(response.onboardingStep ?? 'DONE');
      goalStore.resetDraft();
      isSubmitted.value = true;
    } catch (error) {
      errorMessage.value = getApiErrorMessage(error);
    } finally {
      isSubmitting.value = false;
    }
  }

  function goHome() {
    router.replace({ name: ROUTE_NAMES.HOME });
  }

  return {
    step,
    totalSteps,
    minDate,
    isSubmitting,
    isSubmitted,
    isLastStep,
    errorMessage,
    canProceed,
    goal,
    targetAmount,
    targetDate,
    currentAmount,
    monthlyInvestableAmount,
    emergencyFundMonths,
    monthlySurplusBand,
    maxAllowedLossRate,
    lossReaction,
    investmentExperience,
    next,
    back,
    goHome,
  };
}
