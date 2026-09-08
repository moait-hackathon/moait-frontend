<script setup lang="ts">
// 리포트 섹션 껍데기. 굵은 제목 + (선택)우측 보조문구 + 내용 슬롯.
withDefaults(defineProps<{ title: string; caption?: string }>(), { caption: '' });
</script>

<template>
  <section class="px-5">
    <div class="mb-3 flex items-end justify-between gap-3">
      <h2 class="text-[17px] font-black tracking-[-0.03em] text-foreground">{{ title }}</h2>
      <span
        v-if="caption"
        class="shrink-0 pb-0.5 text-[11px] font-semibold text-dm-gray-dark"
      >
        {{ caption }}
      </span>
    </div>
    <slot />
  </section>
</template>
