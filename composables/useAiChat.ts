import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAiStore } from '@/stores/aiStore';
import { useAuthStore } from '@/stores/authStore';
import type { AiChatMessage } from '@/types/ai';

export function useAiChat() {
  const router = useRouter();
  const aiStore = useAiStore();
  const authStore = useAuthStore();
  const { analysis, isAnalyzing, errorMessage: analysisErrorMessage } = storeToRefs(aiStore);
  const draft = ref('');
  const messages = ref<AiChatMessage[]>([]);
  const userErrorMessage = ref('');
  let nextMessageId = 1;

  const canSend = computed(() => draft.value.trim().length > 0 && !isAnalyzing.value);
  const errorMessage = computed(() => userErrorMessage.value || analysisErrorMessage.value);

  async function requestAnalysis() {
    userErrorMessage.value = '';

    if (!authStore.user) {
      await authStore.loadUser();
    }

    const userId = authStore.user?.userId;
    if (!userId) {
      userErrorMessage.value = '로그인 사용자 정보를 불러올 수 없어요.';
      return;
    }

    await aiStore.analyzeInvestment({ userId });
  }

  async function sendMessage() {
    const content = draft.value.trim();

    if (!content || isAnalyzing.value) return;

    messages.value.push({
      id: nextMessageId,
      role: 'user',
      content,
    });
    nextMessageId += 1;
    draft.value = '';

    await requestAnalysis();
  }

  function closeChat() {
    router.back();
  }

  return {
    draft,
    messages,
    canSend,
    analysis,
    isAnalyzing,
    errorMessage,
    sendMessage,
    closeChat,
    retryAnalysis: requestAnalysis,
  };
}
