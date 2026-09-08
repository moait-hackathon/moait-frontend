<script setup lang="ts">
import type { AiChatMessage } from '@/types/ai';

defineProps<{
  messages: AiChatMessage[];
}>();
</script>

<template>
  <ol
    v-if="messages.length"
    class="mt-5 flex flex-col gap-3"
    aria-label="채팅 메시지"
    aria-live="polite"
  >
    <li
      v-for="message in messages"
      :key="message.id"
      class="max-w-[82%] rounded-2xl px-4 py-3 text-sm font-medium leading-6 shadow-sm"
      :class="
        message.role === 'user'
          ? 'ml-auto rounded-br-md bg-dm-mint-darker text-white'
          : 'mr-auto rounded-bl-md border border-dm-gray/25 bg-white text-foreground'
      "
    >
      {{ message.content }}
    </li>
  </ol>
</template>
