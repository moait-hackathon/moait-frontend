import { defineStore } from 'pinia';
import { ref } from 'vue';

import { toInvestmentAgreementAnalysis } from '@/models/AiAgreement';
import { createInvestmentAgreement } from '@/server/aiApi';
import type { InvestmentAgreementAnalysis } from '@/types/ai';
import type { InvestmentAgreementRequestDto } from '@/types/dto/ai.dto';
import { getApiErrorMessage } from '@/utils/apiError';

export const useAiStore = defineStore('ai', () => {
  const analysisRequest = ref<InvestmentAgreementRequestDto | null>(null);
  const analysis = ref<InvestmentAgreementAnalysis | null>(null);
  const isAnalyzing = ref(false);
  const errorMessage = ref('');

  // 이전 화면에서 분석 요청값을 저장한 뒤 AI 화면으로 이동하면 useAiChat이 자동 호출한다.
  function setAnalysisRequest(request: InvestmentAgreementRequestDto) {
    analysisRequest.value = request;
    analysis.value = null;
    errorMessage.value = '';
  }

  async function analyzeInvestment(request = analysisRequest.value) {
    if (!request || isAnalyzing.value) return;

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
    analysisRequest.value = null;
    analysis.value = null;
    errorMessage.value = '';
  }

  return {
    analysisRequest,
    analysis,
    isAnalyzing,
    errorMessage,
    setAnalysisRequest,
    analyzeInvestment,
    resetAnalysis,
  };
});
