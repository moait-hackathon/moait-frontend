<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import AuthScreen from '@/components/auth/AuthScreen.vue';
import { ROUTE_NAMES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import { useGoalStore } from '@/stores/goalStore';
import { formatAmount } from '@/utils/format';

const router = useRouter();
const authStore = useAuthStore();
const goalStore = useGoalStore();
const { user } = storeToRefs(authStore);
const { goal, loaded } = storeToRefs(goalStore);

const displayName = computed(() => user.value?.name ?? '회원');

onMounted(() => {
  if (!goalStore.loaded) void goalStore.loadGoal();
});

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
      <p class="mt-1 text-xs text-muted-foreground">공동 목표 현황이에요.</p>

      <div
        v-if="goal"
        class="mt-6 rounded-2xl border border-border bg-white p-5"
      >
        <div class="flex items-baseline justify-between">
          <span class="text-xs font-extrabold text-primary">
            {{ goal.jointRiskProfileTypeLabel }}
          </span>
          <span class="text-sm font-bold text-muted-foreground">
            위험점수 {{ goal.riskProfileScore }}
          </span>
        </div>
        <div class="mt-3">
          <div class="flex items-baseline justify-between text-sm">
            <span class="font-black text-foreground">{{ goal.progress.rate }}%</span>
            <span class="text-muted-foreground">
              {{ formatAmount(goal.currentAmount) }} / {{ formatAmount(goal.targetAmount) }}원
            </span>
          </div>
          <div class="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
            <span
              class="block h-full rounded-full bg-primary"
              :style="{ width: `${Math.min(goal.progress.rate, 100)}%` }"
            ></span>
          </div>
        </div>
        <p class="mt-3 text-xs text-muted-foreground">
          목표일 {{ goal.targetDate }} · 월 {{ formatAmount(goal.progress.requiredMonthlyAmount) }}원 필요
        </p>
      </div>

      <p
        v-else-if="loaded"
        class="mt-6 rounded-2xl border border-border bg-white p-5 text-sm text-muted-foreground"
      >
        공동 목표 정보를 불러오지 못했어요.
      </p>

      <button
        class="mt-auto grid min-h-[48px] w-full place-items-center rounded-xl border border-border bg-white text-sm font-bold text-muted-foreground transition hover:bg-muted"
        type="button"
        @click="logout"
      >
        로그아웃
      </button>
    </div>
  </AuthScreen>
</template>
