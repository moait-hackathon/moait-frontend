<script setup lang="ts">
import { Bot, X } from 'lucide-vue-next';

defineEmits<{
  close: [];
}>();
</script>

<template>
  <header
    class="flex min-h-[88px] items-center gap-3 border-b border-border bg-white px-5 py-4"
  >
    <div
      class="grid size-12 shrink-0 place-items-center rounded-full bg-muted text-primary"
      aria-hidden="true"
    >
      <Bot
        :size="25"
        :stroke-width="2.2"
      />
    </div>

    <div class="min-w-0 flex-1">
      <h1 class="truncate text-lg font-black tracking-[-0.03em] text-foreground">MoAI</h1>
      <p class="mt-0.5 truncate text-xs font-semibold text-muted-foreground">
        목표와 투자를 함께 살펴봐요
      </p>
    </div>

    <button
      class="grid size-11 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
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
