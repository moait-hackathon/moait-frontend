<script setup lang="ts">
import { RouterLink } from 'vue-router';

import AuthScreen from '@/components/auth/AuthScreen.vue';
import BrandMark from '@/components/auth/BrandMark.vue';
import { ROUTE_NAMES } from '@/constants/routes';
import { useLogin } from '@/composables/useLogin';

const { phone, password, errorMessage, isSubmitting, submit } = useLogin();
</script>

<template>
  <AuthScreen>
    <div class="flex min-h-dvh flex-1 flex-col bg-white px-5 pb-8 pt-12 sm:px-10">
      <BrandMark class="mb-8" />

      <form
        class="flex w-full flex-col gap-4"
        aria-label="로그인"
        @submit.prevent="submit"
      >
        <div>
          <label
            class="mb-1.5 block text-xs font-bold text-dm-gray-dark"
            for="login-phone"
          >
            휴대폰 번호
          </label>
          <input
            id="login-phone"
            v-model="phone"
            class="h-[46px] w-full rounded-xl border border-dm-gray/40 bg-white px-3.5 text-sm font-semibold text-foreground outline-none transition placeholder:font-medium placeholder:text-dm-gray focus:border-pink-03 focus:ring-3 focus:ring-brand/10"
            type="tel"
            name="phone"
            inputmode="numeric"
            autocomplete="username"
            placeholder="010-1234-5678"
            :aria-invalid="Boolean(errorMessage)"
            required
          />
        </div>

        <div>
          <label
            class="mb-1.5 block text-xs font-bold text-dm-gray-dark"
            for="login-password"
          >
            비밀번호
          </label>
          <input
            id="login-password"
            v-model="password"
            class="h-[46px] w-full rounded-xl border border-dm-gray/40 bg-white px-3.5 text-sm font-semibold text-foreground outline-none transition placeholder:font-medium placeholder:text-dm-gray focus:border-pink-03 focus:ring-3 focus:ring-brand/10"
            type="password"
            name="password"
            autocomplete="current-password"
            placeholder="비밀번호를 입력해주세요"
            :aria-invalid="Boolean(errorMessage)"
            required
          />
          <p class="mt-1.5 text-[11px] leading-4 text-dm-gray-dark">비밀번호는 8자 이상이에요.</p>
        </div>

        <p
          v-if="errorMessage"
          class="-mt-1 text-xs font-semibold text-brand-dark"
          role="alert"
          aria-live="polite"
        >
          {{ errorMessage }}
        </p>

        <button
          class="mt-0.5 grid min-h-[50px] w-full place-items-center rounded-xl bg-brand text-[15px] font-extrabold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? '로그인 중...' : '로그인' }}
        </button>
      </form>

      <!-- TODO: 소셜 로그인 연결 (현재 UI만, 동작 없음) -->
      <!-- TODO: 카카오 브랜드 색상(#FEE500) 토큰 등록 검토 -->
      <button
        class="mt-3 flex h-[50px] w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#FEE500] opacity-60"
        type="button"
        disabled
        aria-label="카카오 로그인 (준비 중)"
      >
        <span class="text-[15px] font-extrabold leading-none text-black/[0.85]">
          카카오 로그인 (준비 중)
        </span>
      </button>

      <nav
        class="mt-5 flex items-center justify-center gap-3 text-[11px] font-semibold text-dm-gray-dark"
        aria-label="회원 계정 메뉴"
      >
        <RouterLink
          class="rounded px-1 py-1 no-underline hover:text-brand-dark"
          :to="{ name: ROUTE_NAMES.SIGNUP }"
        >
          회원가입
        </RouterLink>
        <span
          class="text-dm-gray/70"
          aria-hidden="true"
          >·</span
        >
        <!-- TODO: 계정 찾기 화면 연결 (현재 동작 없음) -->
        <span class="cursor-not-allowed px-1 py-1 opacity-60">계정을 잊으셨나요?</span>
      </nav>
    </div>
  </AuthScreen>
</template>
