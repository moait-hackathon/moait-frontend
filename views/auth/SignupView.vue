<script setup lang="ts">
import AuthHeader from '@/components/auth/AuthHeader.vue';
import AuthScreen from '@/components/auth/AuthScreen.vue';
import TermsAgreementCard from '@/components/auth/TermsAgreementCard.vue';
import { GENDER_OPTIONS } from '@/constants/auth';
import { ROUTE_NAMES } from '@/constants/routes';
import { useSignup } from '@/composables/useSignup';

const {
  name,
  phone,
  password,
  passwordConfirm,
  gender,
  agreements,
  passwordsMatch,
  canSubmit,
  errorMessage,
  isSubmitting,
  setAgreement,
  setAllAgreements,
  submit,
} = useSignup();
</script>

<template>
  <AuthScreen>
    <AuthHeader
      title="회원가입"
      :back-to="{ name: ROUTE_NAMES.LOGIN }"
    />

    <form
      class="flex flex-1 flex-col gap-4 bg-white px-5 pb-8 pt-4 sm:px-10"
      aria-label="회원가입"
      @submit.prevent="submit"
    >
      <div>
        <label
          class="mb-1.5 block text-xs font-bold text-dm-gray-dark"
          for="signup-name"
        >
          이름
        </label>
        <input
          id="signup-name"
          v-model="name"
          class="h-[46px] w-full rounded-xl border border-dm-gray/40 bg-white px-3.5 text-sm font-semibold text-foreground outline-none transition placeholder:font-medium placeholder:text-dm-gray focus:border-pink-03 focus:ring-3 focus:ring-brand/10"
          type="text"
          name="name"
          autocomplete="name"
          placeholder="이름을 입력해주세요"
          maxlength="50"
          required
        />
      </div>

      <div>
        <label
          class="mb-1.5 block text-xs font-bold text-dm-gray-dark"
          for="signup-phone"
        >
          휴대폰 번호
        </label>
        <input
          id="signup-phone"
          v-model="phone"
          class="h-[46px] w-full rounded-xl border border-dm-gray/40 bg-white px-3.5 text-sm font-semibold text-foreground outline-none transition placeholder:font-medium placeholder:text-dm-gray focus:border-pink-03 focus:ring-3 focus:ring-brand/10"
          type="tel"
          name="phone"
          inputmode="numeric"
          autocomplete="tel"
          placeholder="010-1234-5678"
          required
        />
      </div>

      <fieldset>
        <legend class="mb-1.5 text-xs font-bold text-dm-gray-dark">성별</legend>
        <div class="grid grid-cols-2 gap-2">
          <label
            v-for="option in GENDER_OPTIONS"
            :key="option.value"
            class="cursor-pointer"
          >
            <input
              class="peer sr-only"
              type="radio"
              name="gender"
              :value="option.value"
              :checked="gender === option.value"
              @change="gender = option.value"
            />
            <span
              class="grid h-[46px] place-items-center rounded-xl border border-dm-gray/40 bg-white text-sm font-bold text-dm-gray-dark transition peer-checked:border-pink-03 peer-checked:bg-pink-01 peer-checked:text-brand-dark"
            >
              {{ option.label }}
            </span>
          </label>
        </div>
      </fieldset>

      <div>
        <label
          class="mb-1.5 block text-xs font-bold text-dm-gray-dark"
          for="signup-password"
        >
          비밀번호
        </label>
        <input
          id="signup-password"
          v-model="password"
          class="h-[46px] w-full rounded-xl border border-dm-gray/40 bg-white px-3.5 text-sm font-semibold text-foreground outline-none transition placeholder:font-medium placeholder:text-dm-gray focus:border-pink-03 focus:ring-3 focus:ring-brand/10"
          type="password"
          name="password"
          autocomplete="new-password"
          placeholder="비밀번호를 입력해주세요"
          required
        />
        <p class="mt-1.5 text-[11px] leading-4 text-dm-gray-dark">비밀번호는 8자 이상이에요.</p>
      </div>

      <div>
        <label
          class="mb-1.5 block text-xs font-bold text-dm-gray-dark"
          for="signup-password-confirm"
        >
          비밀번호 확인
        </label>
        <input
          id="signup-password-confirm"
          v-model="passwordConfirm"
          class="h-[46px] w-full rounded-xl border border-dm-gray/40 bg-white px-3.5 text-sm font-semibold text-foreground outline-none transition placeholder:font-medium placeholder:text-dm-gray focus:border-pink-03 focus:ring-3 focus:ring-brand/10"
          type="password"
          name="passwordConfirm"
          autocomplete="new-password"
          placeholder="비밀번호를 한 번 더 입력해주세요"
          required
        />
        <p
          class="mt-1.5 text-[11px] leading-4"
          :class="
            passwordConfirm.length === 0
              ? 'text-dm-gray-dark'
              : passwordsMatch
                ? 'text-deep-green'
                : 'text-brand-dark'
          "
        >
          {{
            passwordConfirm.length === 0
              ? '비밀번호와 동일하게 입력해주세요.'
              : passwordsMatch
                ? '비밀번호가 일치합니다.'
                : '비밀번호가 일치하지 않아요.'
          }}
        </p>
      </div>

      <TermsAgreementCard
        :agreements="agreements"
        @toggle="setAgreement"
        @toggle-all="setAllAgreements"
      />

      <div class="mt-auto pt-2">
        <p
          v-if="errorMessage"
          class="mb-2 text-xs font-semibold text-brand-dark"
          role="alert"
          aria-live="polite"
        >
          {{ errorMessage }}
        </p>
        <button
          class="grid min-h-[50px] w-full place-items-center rounded-xl bg-brand text-[15px] font-extrabold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          :disabled="isSubmitting || !canSubmit"
        >
          {{ isSubmitting ? '가입 중...' : '가입하고 시작하기' }}
        </button>
      </div>
    </form>
  </AuthScreen>
</template>
