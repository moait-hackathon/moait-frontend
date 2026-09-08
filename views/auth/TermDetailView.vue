<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import AuthHeader from '@/components/auth/AuthHeader.vue';
import AuthScreen from '@/components/auth/AuthScreen.vue';
import { TERMS } from '@/constants/auth';
import { ROUTE_NAMES } from '@/constants/routes';

const route = useRoute();

const term = computed(() => TERMS.find((item) => item.slug === route.params.termsType) ?? null);
</script>

<template>
  <AuthScreen>
    <AuthHeader
      :title="term?.label ?? '약관'"
      :back-to="{ name: ROUTE_NAMES.SIGNUP }"
    />

    <article class="flex-1 bg-white px-5 pb-10 pt-6 text-muted-foreground sm:px-10">
      <h2 class="mb-2 text-base font-extrabold text-foreground">
        {{ term?.label ?? '약관 정보를 찾을 수 없어요' }}
      </h2>
      <p class="mb-6 text-[11px] leading-5 text-muted-foreground">
        {{ term?.required ? '필수 약관' : '선택 약관' }}
      </p>

      <!-- TODO: 약관 전문 실제 텍스트 반영 -->
      <div
        class="rounded-xl bg-muted px-4 py-6 text-center text-xs leading-6 text-muted-foreground"
      >
        약관 전문 준비 중입니다.
      </div>
    </article>
  </AuthScreen>
</template>
