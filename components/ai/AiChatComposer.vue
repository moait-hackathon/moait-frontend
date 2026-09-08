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
    class="flex items-center gap-2.5 border-t border-border bg-white px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3"
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
      class="h-12 min-w-0 flex-1 rounded-2xl border border-border bg-muted px-4 text-sm font-semibold text-foreground outline-none transition placeholder:text-muted-foreground focus:border-border focus:ring-3 focus:ring-ring"
      type="text"
      name="message"
      autocomplete="off"
      placeholder="메시지를 입력해 주세요"
    />
    <button
      class="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:bg-muted"
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
