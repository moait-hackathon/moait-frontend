import { defineStore } from 'pinia';
import { ref } from 'vue';

import { getMe } from '@/server/userApi';
import { useOnboardingStore } from '@/stores/onboardingStore';
import type { UserResponseDto } from '@/types/dto/user.dto';
import type { OnboardingStep } from '@/types/onboarding';
import { clearAccessToken, hasAccessToken, setAccessToken } from '@/utils/auth';
import { clearInvestmentResult } from '@/utils/investmentResult';

interface Session {
  accessToken: string;
  onboardingStep: OnboardingStep;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserResponseDto | null>(null);
  const onboardingStep = ref<OnboardingStep | null>(null);
  const initialized = ref(false);

  // 로그인/회원가입 성공 응답으로 세션을 연다. 이전 세션의 온보딩 입력 상태는 비운다.
  // (localStorage 의 투자결과는 logout·401 에서 정리되므로 여기서는 건드리지 않는다)
  function setSession(session: Session) {
    setAccessToken(session.accessToken);
    onboardingStep.value = session.onboardingStep;
    useOnboardingStore().reset();
  }

  // 온보딩 API 응답으로 진행 단계를 갱신한다.
  function setOnboardingStep(step: OnboardingStep) {
    onboardingStep.value = step;
  }

  // GET /users/me 로 사용자와 진행 단계를 채운다. 로그인 직후·앱 부팅 시 호출한다.
  async function loadUser() {
    if (!hasAccessToken()) {
      reset();
      return;
    }
    try {
      const me = await getMe();
      user.value = me;
      onboardingStep.value = me.onboardingStep;
    } catch {
      // 401 이면 axios 인터셉터가 토큰을 폐기하고 로그인으로 보낸다.
      if (!hasAccessToken()) reset();
    }
  }

  // 앱 부팅 시 1회. 이후 라우트 진입에서는 재호출하지 않는다.
  async function init() {
    if (initialized.value) return;
    initialized.value = true;
    await loadUser();
  }

  function logout() {
    clearAccessToken();
    clearInvestmentResult();
    useOnboardingStore().reset();
    reset();
  }

  function reset() {
    user.value = null;
    onboardingStep.value = null;
  }

  return {
    user,
    onboardingStep,
    initialized,
    setSession,
    setOnboardingStep,
    loadUser,
    init,
    logout,
    reset,
  };
});
