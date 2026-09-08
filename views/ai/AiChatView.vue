<script setup lang="ts">
import AiAgreementResult from '@/components/ai/AiAgreementResult.vue';
import AiChatComposer from '@/components/ai/AiChatComposer.vue';
import AiChatHeader from '@/components/ai/AiChatHeader.vue';
import AiMessageList from '@/components/ai/AiMessageList.vue';
import AiWelcomeCard from '@/components/ai/AiWelcomeCard.vue';
import { useAiChat } from '@/composables/useAiChat';

const {
  draft,
  messages,
  canSend,
  analysis,
  isAnalyzing,
  errorMessage,
  sendMessage,
  closeChat,
  retryAnalysis,
} = useAiChat();
</script>

<template>
  <main class="min-h-dvh w-full bg-dm-gray/50 p-3 font-sans text-foreground antialiased sm:p-4">
    <section
      class="flex min-h-[calc(100dvh-24px)] w-full flex-col overflow-hidden rounded-[32px] bg-dm-gray-light shadow-xl sm:min-h-[calc(100dvh-32px)]"
      aria-label="MoAI 채팅"
    >
      <AiChatHeader @close="closeChat" />

      <div class="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
        <AiWelcomeCard />
        <AiMessageList :messages="messages" />

        <div
          v-if="isAnalyzing"
          class="mt-5 rounded-3xl border border-dm-gray/25 bg-white p-5 shadow-md"
          role="status"
          aria-live="polite"
        >
          <div class="flex items-center gap-3">
            <span
              class="size-3 animate-pulse rounded-full bg-dm-mint-darker"
              aria-hidden="true"
            />
            <p class="text-sm font-extrabold text-foreground">투자 합의안을 분석하고 있어요...</p>
          </div>
          <p class="mt-2 text-xs font-medium text-dm-gray-dark">잠시만 기다려 주세요.</p>
        </div>

        <div
          v-else-if="errorMessage"
          class="mt-5 rounded-3xl border border-pink-03 bg-pink-01 p-5"
          role="alert"
        >
          <p class="text-sm font-extrabold text-brand-dark">분석 결과를 불러오지 못했어요.</p>
          <p class="mt-1 text-xs font-medium leading-5 text-dm-gray-dark">{{ errorMessage }}</p>
          <button
            class="mt-3 rounded-xl bg-brand px-4 py-2 text-xs font-extrabold text-white transition hover:bg-brand-dark"
            type="button"
            @click="retryAnalysis()"
          >
            다시 시도
          </button>
        </div>

        <AiAgreementResult
          v-else-if="analysis"
          :analysis="analysis"
        />
      </div>

      <AiChatComposer
        v-model="draft"
        :can-send="canSend"
        @send="sendMessage"
      />
    </section>
  </main>
</template>
