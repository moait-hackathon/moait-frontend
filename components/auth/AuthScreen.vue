<script setup lang="ts"></script>

<template>
  <!-- 인증/온보딩 화면 공통 셸. 내용이 길면 페이지(window)가 세로 스크롤한다. -->
  <main
    class="flex min-h-dvh w-full flex-col bg-white font-sans text-foreground antialiased"
  >
    <slot />
  </main>
</template>
