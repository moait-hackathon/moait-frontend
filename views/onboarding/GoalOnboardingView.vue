<script setup lang="ts">
import AuthScreen from '@/components/auth/AuthScreen.vue';
import OnboardingStepHeader from '@/components/common/OnboardingStepHeader.vue';
import GoalOnboardingFooter from '@/components/goal/GoalOnboardingFooter.vue';
import GoalResultCard from '@/components/goal/GoalResultCard.vue';
import AmountField from '@/components/onboarding/AmountField.vue';
import ChoiceField from '@/components/onboarding/ChoiceField.vue';
import {
  EMERGENCY_FUND_MONTHS_OPTIONS,
  INVESTMENT_EXPERIENCE_OPTIONS,
  LOSS_REACTION_OPTIONS,
  MAX_ALLOWED_LOSS_RATE_OPTIONS,
  MONTHLY_INVESTABLE_QUICK_AMOUNTS,
  MONTHLY_SURPLUS_BAND_OPTIONS,
} from '@/constants/goal';
import { useGoalOnboarding } from '@/composables/useGoalOnboarding';
import { formatAmount } from '@/utils/format';
import type {
  EmergencyFundMonths,
  InvestmentExperience,
  LossReaction,
  MaxAllowedLossRate,
  MonthlySurplusBand,
} from '@/types/goal';

const {
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
} = useGoalOnboarding();

const STEP_TITLES = [
  '목표를 정해볼까요?',
  '투자 계획을 알려주세요',
  '재무 여유를 알려주세요',
  '손실에 어떻게 반응하나요?',
  '투자 경험을 알려주세요',
];
</script>

<template>
  <AuthScreen>
    <div class="flex min-h-dvh flex-1 flex-col bg-white">
      <!-- 제출 결과 -->
      <template v-if="isSubmitted && goal">
        <OnboardingStepHeader
          :step="totalSteps"
          :total-steps="totalSteps"
          :show-progress="false"
        />
        <GoalResultCard :goal="goal" />
        <GoalOnboardingFooter
          label="홈으로 가기"
          @primary="goHome"
        />
      </template>

      <!-- 5단계 폼 -->
      <template v-else>
        <OnboardingStepHeader
          :step="step"
          :total-steps="totalSteps"
          :show-back="step > 1"
          @back="back"
        />

        <main class="flex-1 overflow-y-auto px-5 pb-6 pt-4 sm:px-8">
          <h1
            class="text-[22px] font-extrabold leading-tight tracking-[-0.03em] text-foreground"
          >
            {{ STEP_TITLES[step - 1] }}
          </h1>

          <!-- 1/5 목표 -->
          <div
            v-if="step === 1"
            class="mt-6 flex flex-col gap-5"
          >
            <AmountField
              id="goal-target-amount"
              v-model="targetAmount"
              label="목표 금액은 얼마인가요?"
            />
            <div>
              <label
                class="mb-1.5 block text-sm font-bold text-foreground"
                for="goal-target-date"
              >
                언제까지 모으고 싶나요?
              </label>
              <input
                id="goal-target-date"
                v-model="targetDate"
                class="h-[46px] w-full rounded-xl border border-dm-gray/40 bg-white px-3.5 text-sm font-semibold text-foreground outline-none transition focus:border-pink-03 focus:ring-3 focus:ring-brand/10"
                type="date"
                :min="minDate"
              />
            </div>
          </div>

          <!-- 2/5 계획 -->
          <div
            v-else-if="step === 2"
            class="mt-6 flex flex-col gap-5"
          >
            <AmountField
              id="goal-current-amount"
              v-model="currentAmount"
              label="지금 투자에 쓸 수 있는 돈은?"
            />
            <div>
              <AmountField
                id="goal-monthly-investable"
                v-model="monthlyInvestableAmount"
                label="매월 투자에 쓸 수 있는 돈은?"
              />
              <div class="mt-2 flex flex-wrap gap-2">
                <button
                  v-for="amount in MONTHLY_INVESTABLE_QUICK_AMOUNTS"
                  :key="amount"
                  type="button"
                  class="rounded-full border border-dm-gray/40 px-3 py-1.5 text-xs font-semibold text-dm-gray-dark transition hover:border-pink-03 hover:bg-pink-01 hover:text-brand-dark"
                  @click="monthlyInvestableAmount = formatAmount(amount)"
                >
                  {{ formatAmount(amount) }}원
                </button>
              </div>
            </div>
          </div>

          <!-- 3/5 재무 여유 -->
          <div
            v-else-if="step === 3"
            class="mt-6 flex flex-col gap-4"
          >
            <ChoiceField
              :model-value="emergencyFundMonths"
              label="비상자금은 생활비 기준 몇 개월치인가요?"
              :options="EMERGENCY_FUND_MONTHS_OPTIONS"
              @update:model-value="emergencyFundMonths = $event as EmergencyFundMonths"
            />
            <ChoiceField
              :model-value="monthlySurplusBand"
              label="한 달 소득에서 필수지출·대출상환을 빼면 얼마나 남나요?"
              :options="MONTHLY_SURPLUS_BAND_OPTIONS"
              @update:model-value="monthlySurplusBand = $event as MonthlySurplusBand"
            />
          </div>

          <!-- 4/5 위험 반응 -->
          <div
            v-else-if="step === 4"
            class="mt-6 flex flex-col gap-4"
          >
            <ChoiceField
              :model-value="maxAllowedLossRate"
              label="투자금이 일시적으로 얼마나 하락해도 계획을 유지할 수 있나요?"
              :options="MAX_ALLOWED_LOSS_RATE_OPTIONS"
              @update:model-value="maxAllowedLossRate = $event as MaxAllowedLossRate"
            />
            <ChoiceField
              :model-value="lossReaction"
              label="시장이 20% 급락한다면 어떻게 행동할 가능성이 큰가요?"
              :options="LOSS_REACTION_OPTIONS"
              @update:model-value="lossReaction = $event as LossReaction"
            />
          </div>

          <!-- 5/5 투자 경험 -->
          <div
            v-else-if="step === 5"
            class="mt-6"
          >
            <ChoiceField
              :model-value="investmentExperience"
              label="현재 나와 가장 가까운 설명을 선택해주세요"
              :options="INVESTMENT_EXPERIENCE_OPTIONS"
              @update:model-value="investmentExperience = $event as InvestmentExperience"
            />
          </div>
        </main>

        <GoalOnboardingFooter
          :label="
            isSubmitting ? '분석 중...' : isLastStep ? '제출하고 결과 보기' : '다음'
          "
          :disabled="!canProceed || isSubmitting"
          :error-message="errorMessage"
          @primary="next"
        />
      </template>
    </div>
  </AuthScreen>
</template>
