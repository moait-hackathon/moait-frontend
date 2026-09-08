<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import AuthScreen from '@/components/auth/AuthScreen.vue';
import { ROUTE_NAMES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

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
      <h1 class="mt-3 text-xl font-black tracking-[-0.03em] text-foreground">
        {{ displayName }}님, 온보딩을 마쳤어요
      </h1>
      <p class="mt-1 text-xs text-dm-gray-dark">
        공동 목표 요약은 이후 작업에서 붙을 자리예요.
      </p>

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
