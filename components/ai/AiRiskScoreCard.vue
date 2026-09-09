<script setup lang="ts">
import type { RiskScore } from '@/types/ai';

defineProps<{
  label: string;
  score: RiskScore;
}>();
</script>

<template>
  <article class="rounded-2xl border border-dm-gray/25 bg-dm-gray-light p-3.5">
    <div class="flex items-center justify-between gap-2">
      <h4 class="text-xs font-extrabold text-dm-gray-dark">{{ label }}</h4>
      <span
        class="rounded-full bg-dm-mint-light px-2 py-1 text-[10px] font-extrabold text-btn-mt-dark"
      >
        {{ score.profileTypeLabel }}
      </span>
    </div>

    <p class="mt-2 text-2xl font-black tracking-[-0.03em] text-foreground">
      {{ score.preferenceScore }}<span class="ml-0.5 text-xs font-bold text-dm-gray-dark">점</span>
    </p>

    <dl class="mt-3 grid grid-cols-3 gap-1 border-t border-dm-gray/25 pt-3 text-center">
      <div>
        <dt class="text-[9px] font-semibold text-dm-gray-dark">최종 상한</dt>
        <dd class="mt-0.5 text-xs font-extrabold text-foreground">
          {{ score.finalLimit ?? '-' }}
        </dd>
      </div>
      <div>
        <dt class="text-[9px] font-semibold text-dm-gray-dark">사용자 상한</dt>
        <dd class="mt-0.5 text-xs font-extrabold text-foreground">
          {{ score.userLimit ?? '-' }}
        </dd>
      </div>
      <div>
        <dt class="text-[9px] font-semibold text-dm-gray-dark">서비스 상한</dt>
        <dd class="mt-0.5 text-xs font-extrabold text-foreground">
          {{ score.serviceLimit ?? '-' }}
        </dd>
      </div>
    </dl>
  </article>
</template>
