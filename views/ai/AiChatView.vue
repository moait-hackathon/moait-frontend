<script setup lang="ts">
import AiChatComposer from '@/components/ai/AiChatComposer.vue';
import AiChatHeader from '@/components/ai/AiChatHeader.vue';
import AiMessageList from '@/components/ai/AiMessageList.vue';
import AiWelcomeCard from '@/components/ai/AiWelcomeCard.vue';
import { useAiChat } from '@/composables/useAiChat';

const { draft, messages, canSend, sendMessage, closeChat } = useAiChat();
</script>

<template>
  <main class="min-h-dvh w-full bg-muted p-3 font-sans text-foreground antialiased sm:p-4">
    <section
      class="flex min-h-[calc(100dvh-24px)] w-full flex-col overflow-hidden rounded-[32px] bg-muted shadow-xl sm:min-h-[calc(100dvh-32px)]"
      aria-label="MoAI 채팅"
    >
      <AiChatHeader @close="closeChat" />

      <div class="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
        <AiWelcomeCard />
        <AiMessageList :messages="messages" />
      </div>

      <AiChatComposer
        v-model="draft"
        :can-send="canSend"
        @send="sendMessage"
      />
    </section>
  </main>
</template>
