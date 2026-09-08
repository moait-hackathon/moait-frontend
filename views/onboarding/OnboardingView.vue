<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import AuthScreen from '@/components/auth/AuthScreen.vue';
import FinancialInfoStep from '@/components/onboarding/FinancialInfoStep.vue';
import InvestmentSurveyStep from '@/components/onboarding/InvestmentSurveyStep.vue';
import ResultStep from '@/components/onboarding/ResultStep.vue';
import { ROUTE_NAMES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import { useOnboardingStore } from '@/stores/onboardingStore';

const router = useRouter();
const authStore = useAuthStore();
const onboardingStore = useOnboardingStore();
const { onboardingStep } = storeToRefs(authStore);
const { result } = storeToRefs(onboardingStore);

// 진행 단계가 우선. DONE 이면서 방금 제출한 결과가 있을 때만 결과 화면.
const currentStep = computed<'financial-info' | 'survey' | 'result' | 'done'>(() => {
  if (onboardingStep.value === 'FINANCIAL_INFO') return 'financial-info';
  if (onboardingStep.value === 'INVESTMENT_PROFILE') return 'survey';
  if (onboardingStep.value === 'DONE' && result.value) return 'result';
  return 'done';
});

// 온보딩을 마친 상태로 새로고침해 진입하면 홈으로 보낸다.
watchEffect(() => {
  if (currentStep.value === 'done') {
    router.replace({ name: ROUTE_NAMES.HOME });
  }
});
</script>

<template>
  <AuthScreen>
    <div class="flex min-h-dvh flex-1 flex-col bg-white">
      <FinancialInfoStep v-if="currentStep === 'financial-info'" />
      <InvestmentSurveyStep v-else-if="currentStep === 'survey'" />
      <ResultStep
        v-else-if="currentStep === 'result' && result"
        :result="result"
      />
    </div>
  </AuthScreen>
</template>
