import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { AiReportVariant } from '@/constants/aiReport';
import { toAiReport } from '@/models/AiReport';
import { getAiReport } from '@/server/aiReportApi';
import type { AiReport } from '@/types/aiReport';

// AI 투자 합의안 리포트. 현재는 목업 variant 로 조회한다(백엔드 연동 전).
export const useAiReportStore = defineStore('aiReport', () => {
  const report = ref<AiReport | null>(null);
  const loading = ref(false);
  const error = ref(false);
  // 현재 화면에 올라온 목업 variant. 같은 variant 재요청은 건너뛴다.
  const loadedVariant = ref<AiReportVariant | null>(null);

  async function loadReport(variant: AiReportVariant) {
    if (loading.value) return;
    if (loadedVariant.value === variant && report.value) return;

    loading.value = true;
    error.value = false;
    try {
      report.value = toAiReport(await getAiReport(variant));
      loadedVariant.value = variant;
    } catch {
      report.value = null;
      error.value = true;
      loadedVariant.value = null;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    report.value = null;
    loading.value = false;
    error.value = false;
    loadedVariant.value = null;
  }

  return { report, loading, error, loadedVariant, loadReport, reset };
});
