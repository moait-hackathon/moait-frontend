<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import AuthScreen from '@/components/auth/AuthScreen.vue';
import { ROUTE_NAMES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import { loadInvestmentResult } from '@/utils/investmentResult';

const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

// 투자성향 조회 API 가 없어 localStorage 에 저장해 둔 설문 제출 결과를 읽는다.
const investmentResult = ref(loadInvestmentResult());

const displayName = computed(() => user.value?.name ?? '회원');

function logout() {
  authStore.logout();
  router.replace({ name: ROUTE_NAMES.LOGIN });
}
</script>

<template>
  <AuthScreen>
    <div class="flex min-h-dvh flex-1 flex-col bg-white px-5 pb-8 pt-12 sm:px-10">
      <span
        class="text-[40px]"
        aria-hidden="true"
        >🎉</span
      >
      <h1 class="mt-3 text-xl font-black tracking-[-0.03em] text-[#232631]">
        {{ displayName }}님, 온보딩을 마쳤어요
      </h1>
      <p class="mt-1 text-xs text-dm-gray-dark">여기부터는 이후 기능이 붙을 자리예요.</p>

      <div
        v-if="investmentResult"
        class="mt-6 rounded-2xl border border-dm-gray/30 bg-white p-5"
      >
        <p class="text-xs font-extrabold text-brand-dark">나의 투자성향</p>
        <div class="mt-1 flex items-baseline justify-between">
          <span class="text-lg font-black text-[#232631]">
            {{ investmentResult.riskProfileTypeLabel }}
          </span>
          <span class="text-sm font-bold text-dm-gray-dark">
            {{ investmentResult.riskProfileScore }}점
          </span>
        </div>
        <p class="mt-2 break-keep text-sm leading-6 text-dm-gray-dark">
          {{ investmentResult.summary }}
        </p>
      </div>

      <button
        class="mt-auto grid min-h-[48px] w-full place-items-center rounded-xl border border-dm-gray/40 bg-white text-sm font-bold text-dm-gray-dark transition hover:bg-dm-gray/10"
        type="button"
        @click="logout"
      >
        로그아웃
      </button>
    </div>
  </AuthScreen>
</template>
