import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import type { AiChatMessage } from '@/types/ai';

export function useAiChat() {
  const router = useRouter();
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

  return {
    draft,
    messages,
    canSend,
    sendMessage,
    closeChat,
  };
}
