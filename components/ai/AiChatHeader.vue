<script setup lang="ts">
import { Bot, X } from 'lucide-vue-next';

defineEmits<{
  close: [];
}>();
</script>

<template>
  <header
    class="flex min-h-[88px] items-center gap-3 border-b border-dm-gray/25 bg-white px-5 py-4"
  >
    <div
      class="grid size-12 shrink-0 place-items-center rounded-full bg-dm-mint-light text-dm-mint-darker"
      aria-hidden="true"
    >
      <Bot
        :size="25"
        :stroke-width="2.2"
      />
    </div>

    <div class="min-w-0 flex-1">
      <h1 class="truncate text-lg font-black tracking-[-0.03em] text-foreground">MoAI</h1>
      <p class="mt-0.5 truncate text-xs font-semibold text-dm-gray-dark">
        목표와 투자를 함께 살펴봐요
      </p>
    </div>

    <button
      class="grid size-11 shrink-0 place-items-center rounded-full text-dm-gray-dark transition hover:bg-dm-gray-light focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-dm-mint-dark/40"
      type="button"
      aria-label="AI 채팅 닫기"
      @click="$emit('close')"
    >
      <X
        :size="25"
        :stroke-width="2"
      />
    </button>
  </header>
</template>
