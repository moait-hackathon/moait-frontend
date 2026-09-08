import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { TERMS } from '@/constants/auth';
import { ROUTE_NAMES } from '@/constants/routes';
import { signup } from '@/server/authApi';
import { useAuthStore } from '@/stores/authStore';
import { useSignupStore } from '@/stores/signupStore';
import type { AgreementDto } from '@/types/dto/auth.dto';
import { getApiErrorMessage } from '@/utils/apiError';
import { formatPhone, toDigits } from '@/utils/format';
import { hasAllRequiredTerms, isValidName, isValidPassword, isValidPhone } from '@/utils/validate';

export function useSignup() {
  const router = useRouter();
  const authStore = useAuthStore();
  const signupStore = useSignupStore();
  const { name, phone, password, passwordConfirm, gender, agreements } = storeToRefs(signupStore);

  const errorMessage = ref('');
  const isSubmitting = ref(false);

  const passwordsMatch = computed(
    () => passwordConfirm.value.length === 0 || password.value === passwordConfirm.value
  );

  const canSubmit = computed(
    () =>
      isValidName(name.value) &&
      isValidPhone(toDigits(phone.value)) &&
      isValidPassword(password.value) &&
      password.value === passwordConfirm.value &&
      gender.value !== null &&
      hasAllRequiredTerms(agreements.value)
  );

  watch(phone, (value) => {
    const formatted = formatPhone(value);
    if (value !== formatted) phone.value = formatted;
  });

  watch(
    [name, phone, password, passwordConfirm, gender, agreements],
    () => {
      errorMessage.value = '';
    },
    { deep: true }
  );

  async function submit() {
    if (isSubmitting.value || !canSubmit.value || gender.value === null) return;

    const agreementList: AgreementDto[] = TERMS.map((term) => ({
      termsType: term.termsType,
      agreed: agreements.value[term.termsType],
    }));

    isSubmitting.value = true;
    errorMessage.value = '';

    try {
      const session = await signup({
        name: name.value.trim(),
        phone: toDigits(phone.value),
        password: password.value,
        gender: gender.value,
        agreements: agreementList,
      });
      authStore.setSession(session);
      await authStore.loadUser();
      signupStore.reset();
      await router.replace({ name: ROUTE_NAMES.ONBOARDING });
    } catch (error) {
      errorMessage.value = getApiErrorMessage(error);
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
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
    setAgreement: signupStore.setAgreement,
    setAllAgreements: signupStore.setAllAgreements,
    submit,
  };
}
