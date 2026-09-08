<script setup lang="ts">
import AuthScreen from '@/components/auth/AuthScreen.vue';

// PR-3(공동 목표 온보딩)에서 구현 예정. 라우터가 참조하는 자리 표시용 화면.
</script>

<template>
  <AuthScreen>
    <div class="flex min-h-dvh flex-1 flex-col items-center justify-center gap-2 bg-white px-6 text-center">
      <span
        class="text-[40px]"
        aria-hidden="true"
        >🎯</span
      >
      <h1 class="text-lg font-black tracking-[-0.03em] text-foreground">공동 목표 설정</h1>
      <p class="text-xs text-dm-gray-dark">화면 구현 준비 중이에요.</p>
    </div>
  </AuthScreen>
</template>
