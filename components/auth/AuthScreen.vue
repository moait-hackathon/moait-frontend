<script setup lang="ts"></script>

<template>
  <!-- 인증/온보딩 화면 공통 셸. 내용이 길면 페이지(window)가 세로 스크롤한다. -->
  <!-- TODO: #232631 진한 본문 색상 토큰 등록 검토 -->
  <main
    class="flex min-h-dvh w-full flex-col bg-white font-sans text-[#232631] antialiased"
  >
    <slot />
  </main>
</template>
