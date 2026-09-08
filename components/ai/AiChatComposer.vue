<script setup lang="ts">
import { SendHorizontal } from 'lucide-vue-next';

defineProps<{
  canSend: boolean;
}>();

defineEmits<{
  send: [];
}>();

const modelValue = defineModel<string>({ required: true });
</script>

<template>
  <form
    class="flex items-center gap-2.5 border-t border-dm-gray/25 bg-white px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3"
    aria-label="AI 메시지 입력"
    @submit.prevent="$emit('send')"
  >
    <label
      class="sr-only"
      for="ai-chat-message"
    >
      메시지
    </label>
    <input
      id="ai-chat-message"
      v-model="modelValue"
      class="h-12 min-w-0 flex-1 rounded-2xl border border-dm-gray/40 bg-dm-gray-light px-4 text-sm font-semibold text-foreground outline-none transition placeholder:text-dm-gray focus:border-dm-mint-dark focus:ring-3 focus:ring-dm-mint-light"
      type="text"
      name="message"
      autocomplete="off"
      placeholder="메시지를 입력해 주세요"
    />
    <button
      class="grid size-12 shrink-0 place-items-center rounded-full bg-dm-mint-darker text-white shadow-sm transition hover:bg-btn-mt-darker focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-dm-mint-dark/40 disabled:cursor-not-allowed disabled:bg-dm-gray"
      type="submit"
      :disabled="!canSend"
      aria-label="메시지 보내기"
    >
      <SendHorizontal
        :size="22"
        :stroke-width="2.2"
      />
    </button>
  </form>
</template>
