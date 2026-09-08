import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Gender, TermsType } from '@/types/auth';

function emptyAgreements(): Record<TermsType, boolean> {
  return { SERVICE: false, PRIVACY: false, FINANCE: false, MARKETING: false };
}

export const useSignupStore = defineStore('signup', () => {
  const name = ref('');
  // 표시용 값(하이픈 포함 가능). 전송 시 숫자만 추출한다.
  const phone = ref('');
  const password = ref('');
  const passwordConfirm = ref('');
  const gender = ref<Gender | null>(null);
  const agreements = ref<Record<TermsType, boolean>>(emptyAgreements());

  function setAgreement(termsType: TermsType, agreed: boolean) {
    agreements.value[termsType] = agreed;
  }

  function setAllAgreements(agreed: boolean) {
    (Object.keys(agreements.value) as TermsType[]).forEach((termsType) => {
      agreements.value[termsType] = agreed;
    });
  }

  function reset() {
    name.value = '';
    phone.value = '';
    password.value = '';
    passwordConfirm.value = '';
    gender.value = null;
    agreements.value = emptyAgreements();
  }

  return {
    name,
    phone,
    password,
    passwordConfirm,
    gender,
    agreements,
    setAgreement,
    setAllAgreements,
    reset,
  };
});
