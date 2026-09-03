import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { ONBOARDING_STEP_ROUTE } from '@/constants/routes';
import { login } from '@/server/authApi';
import { useAuthStore } from '@/stores/authStore';
import { getApiErrorMessage } from '@/utils/apiError';
import { formatPhone, toDigits } from '@/utils/format';
import { isValidPassword, isValidPhone } from '@/utils/validate';

export function useLogin() {
  const router = useRouter();
  const authStore = useAuthStore();

  const phone = ref('');
  const password = ref('');
  const errorMessage = ref('');
  const isSubmitting = ref(false);

  watch(phone, (value) => {
    const formatted = formatPhone(value);
    if (value !== formatted) phone.value = formatted;
  });

  watch([phone, password], () => {
    errorMessage.value = '';
  });

  async function submit() {
    if (isSubmitting.value) return;

    const phoneDigits = toDigits(phone.value);
    if (!isValidPhone(phoneDigits)) {
      errorMessage.value = '휴대폰 번호 형식을 확인해주세요.';
      return;
    }
    if (!isValidPassword(password.value)) {
      errorMessage.value = '비밀번호는 8자 이상 입력해주세요.';
      return;
    }

    isSubmitting.value = true;
    errorMessage.value = '';

    try {
      const session = await login({ phone: phoneDigits, password: password.value });
      authStore.setSession(session);
      await authStore.loadUser();
      await router.replace({ name: ONBOARDING_STEP_ROUTE[session.onboardingStep] });
    } catch (error) {
      errorMessage.value = getApiErrorMessage(error);
    } finally {
      isSubmitting.value = false;
    }
  }

  return { phone, password, errorMessage, isSubmitting, submit };
}
