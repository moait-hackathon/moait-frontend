import { defineStore } from 'pinia';
import { ref } from 'vue';

import { toInvestmentAgreementAnalysis } from '@/models/AiAgreement';
import { createInvestmentAgreement } from '@/server/aiApi';
import type { InvestmentAgreementAnalysis } from '@/types/ai';
import type { InvestmentAgreementRequestDto } from '@/types/dto/ai.dto';
import { getApiErrorMessage } from '@/utils/apiError';

export const useAiStore = defineStore('ai', () => {
  const lastRequest = ref<InvestmentAgreementRequestDto | null>(null);
  const analysis = ref<InvestmentAgreementAnalysis | null>(null);
  const isAnalyzing = ref(false);
  const errorMessage = ref('');

  async function analyzeInvestment(request = lastRequest.value) {
    if (!request || isAnalyzing.value) return;

    lastRequest.value = request;
    isAnalyzing.value = true;
    errorMessage.value = '';

    try {
      const response = await createInvestmentAgreement(request);
      analysis.value = toInvestmentAgreementAnalysis(response);
    } catch (error) {
      errorMessage.value = getApiErrorMessage(error);
    } finally {
      isAnalyzing.value = false;
    }
  }

  function resetAnalysis() {
    lastRequest.value = null;
    analysis.value = null;
    errorMessage.value = '';
  }

  return {
    lastRequest,
    analysis,
    isAnalyzing,
    errorMessage,
    analyzeInvestment,
    resetAnalysis,
  };
});
