import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useAiStore } from '@/stores/aiStore';
import type { AiChatMessage } from '@/types/ai';

export function useAiChat() {
  const router = useRouter();
  const aiStore = useAiStore();
  const { analysisRequest, analysis, isAnalyzing, errorMessage } = storeToRefs(aiStore);
  const draft = ref('');
  const messages = ref<AiChatMessage[]>([]);
  let nextMessageId = 1;

  const canSend = computed(() => draft.value.trim().length > 0);

  function sendMessage() {
    const content = draft.value.trim();

    if (!content) return;

    messages.value.push({
      id: nextMessageId,
      role: 'user',
      content,
    });
    nextMessageId += 1;
    draft.value = '';
  }

  function closeChat() {
    router.back();
  }

  watch(
    analysisRequest,
    (request) => {
      if (request && !analysis.value) {
        void aiStore.analyzeInvestment(request);
      }
    },
    { immediate: true }
  );

  return {
    draft,
    messages,
    canSend,
    analysis,
    isAnalyzing,
    errorMessage,
    sendMessage,
    closeChat,
    retryAnalysis: aiStore.analyzeInvestment,
  };
}
