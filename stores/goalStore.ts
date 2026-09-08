import { defineStore } from 'pinia';
import { ref } from 'vue';

import { toGoal } from '@/models/Goal';
import { getMyGoal } from '@/server/goalApi';
import type {
  EmergencyFundMonths,
  Goal,
  InvestmentExperience,
  LossReaction,
  MaxAllowedLossRate,
  MonthlySurplusBand,
} from '@/types/goal';

// 공동 목표 온보딩 5단계 입력 상태 + 제출/조회된 목표.
// 금액은 콤마 표시 문자열로 보관하고, 전송 시 utils/format.parseAmount 로 정수화한다.
export const useGoalStore = defineStore('goal', () => {
  // 1/5 목표
  const targetAmount = ref('');
  const targetDate = ref('');
  // 2/5 계획
  const currentAmount = ref('');
  const monthlyInvestableAmount = ref('');
  // 3/5 재무 여유
  const emergencyFundMonths = ref<EmergencyFundMonths | null>(null);
  const monthlySurplusBand = ref<MonthlySurplusBand | null>(null);
  // 4/5 위험 반응
  const maxAllowedLossRate = ref<MaxAllowedLossRate | null>(null);
  const lossReaction = ref<LossReaction | null>(null);
  // 5/5 투자 경험
  const investmentExperience = ref<InvestmentExperience | null>(null);

  // 제출/조회된 목표.
  const goal = ref<Goal | null>(null);
  const loaded = ref(false);

  // GET /goals/me. 없으면 null(404 는 정상).
  async function loadGoal() {
    try {
      goal.value = toGoal(await getMyGoal());
    } catch {
      goal.value = null;
    } finally {
      loaded.value = true;
    }
  }

  function resetDraft() {
    targetAmount.value = '';
    targetDate.value = '';
    currentAmount.value = '';
    monthlyInvestableAmount.value = '';
    emergencyFundMonths.value = null;
    monthlySurplusBand.value = null;
    maxAllowedLossRate.value = null;
    lossReaction.value = null;
    investmentExperience.value = null;
  }

  function reset() {
    resetDraft();
    goal.value = null;
    loaded.value = false;
  }

  return {
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
    loaded,
    loadGoal,
    resetDraft,
    reset,
  };
});
