import { computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

import {
  AI_REPORT_VARIANTS,
  DEFAULT_AI_REPORT_VARIANT,
  type AiReportVariant,
} from '@/constants/aiReport';
import { useAiReportStore } from '@/stores/aiReportStore';

function normalizeVariant(value: unknown): AiReportVariant {
  return AI_REPORT_VARIANTS.includes(value as AiReportVariant)
    ? (value as AiReportVariant)
    : DEFAULT_AI_REPORT_VARIANT;
}

// AI 리포트 화면의 상태·동작.
// 라우트 파라미터(:variant)로 목업 데이터를 고르고, 변경 시 다시 불러온다.
export function useAiReport() {
  const route = useRoute();
  const router = useRouter();
  const store = useAiReportStore();
  const { report, loading, error } = storeToRefs(store);

  const variant = computed(() => normalizeVariant(route.params.variant));

  watch(
    variant,
    (next) => {
      void store.loadReport(next);
    },
    { immediate: true }
  );

  function reload() {
    void store.loadReport(variant.value);
  }

  function goBack() {
    router.back();
  }

  // "맞춤 전략 보기" — 전략 상세 화면이 아직 없어 MoAI 상담으로 연결한다.
  function viewStrategy() {
    void router.push({ name: 'ai' });
  }

  return { report, loading, error, variant, reload, goBack, viewStrategy };
}
