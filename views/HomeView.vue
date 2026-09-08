<script setup lang="ts">
import { Bell, BellDot } from '@lucide/vue';

const hasUnreadNotifications = true;
</script>

<template>
  <div class="overflow-hidden bg-white">
    <header class="flex h-10 items-center justify-end gap-2.5 px-4 py-2.5">
      <button
        type="button"
        aria-label="알림"
        class="relative grid h-5 w-5 cursor-pointer place-items-center"
      >
        <component
          :is="hasUnreadNotifications > 0 ? BellDot : Bell"
          class="h-5 w-5"
          :class="hasUnreadNotifications > 0 ? 'text-brand' : 'text-pink-04'"
          :stroke-width="2.5"
        />
      </button>
    </header>

    <section class="relative min-h-[calc(100vh-40px)]">
      <!-- 홈 화면 요소 -->
    </section>
  </div>
</template>
