import { computed, onScopeDispose, ref } from 'vue';
import { useRouter } from 'vue-router';

import { COUPLE_ERROR_MESSAGES, COUPLE_MESSAGES, INVITE_CODE_PATTERN } from '@/constants/couple';
import { ROUTE_NAMES } from '@/constants/routes';
import { toCoupleRequest } from '@/models/Couple';
import {
  acceptCoupleRequest,
  connectCouple,
  getCoupleStatus,
  getInviteCode,
} from '@/server/coupleApi';
import { useAuthStore } from '@/stores/authStore';
import { useCoupleStore } from '@/stores/coupleStore';
import type { CoupleRequest } from '@/types/couple';
import { getApiErrorCode, getApiErrorMessage } from '@/utils/apiError';

// 상대 응답 대기(WAIT) 중 상태를 다시 확인하는 주기.
const STATUS_POLL_INTERVAL_MS = 5000;

// 서버 errorCode 를 우선 문구로, 없으면 서버 message 로 변환한다.
function coupleErrorMessage(error: unknown): string {
  const code = getApiErrorCode(error);
  if (code && code in COUPLE_ERROR_MESSAGES) {
    return COUPLE_ERROR_MESSAGES[code as keyof typeof COUPLE_ERROR_MESSAGES];
  }
  return getApiErrorMessage(error);
}

// 커플 연결 화면의 상태·동작. 연결 완료 시 온보딩 단계를 GOAL_ONBOARDING 으로 넘긴다.
export function useCoupleConnect() {
  const router = useRouter();
  const authStore = useAuthStore();
  const coupleStore = useCoupleStore();

  const myInviteCode = ref('');
  const requests = ref<CoupleRequest[]>([]);

  const feedback = ref('');
  const errorMessage = ref('');
  const copyMessage = ref('');

  const isLoadingInviteCode = ref(false);
  const isLoadingStatus = ref(false);
  const isSubmitting = ref(false);
  const acceptingUserId = ref<number | null>(null);

  let pollTimer: ReturnType<typeof setInterval> | null = null;

  // 입력 코드를 공백 없이 대문자 6자리로 정규화한다.
  const inviteCodeDraft = ref('');
  const inviteCode = computed({
    get: () => inviteCodeDraft.value,
    set: (value: string) => {
      const normalized = value.replace(/\s+/g, '').toUpperCase().slice(0, 6);
      if (normalized !== inviteCodeDraft.value) {
        errorMessage.value = '';
        feedback.value = '';
      }
      inviteCodeDraft.value = normalized;
    },
  });

  const isConnected = computed(() => requests.value.some((request) => request.status === 'CONNECTED'));

  const canConfirm = computed(
    () =>
      INVITE_CODE_PATTERN.test(inviteCode.value) &&
      !isConnected.value &&
      !isSubmitting.value &&
      acceptingUserId.value === null
  );

  function upsertRequest(request: CoupleRequest) {
    const index = requests.value.findIndex((item) => item.partnerUserId === request.partnerUserId);
    requests.value =
      index === -1
        ? [...requests.value, request]
        : requests.value.map((item, i) => (i === index ? request : item));
  }

  async function loadInviteCode() {
    if (isLoadingInviteCode.value) return;
    isLoadingInviteCode.value = true;
    try {
      const response = await getInviteCode();
      myInviteCode.value = response.inviteCode.trim().toUpperCase();
    } catch {
      myInviteCode.value = '';
    } finally {
      isLoadingInviteCode.value = false;
    }
  }

  async function loadStatus() {
    if (isLoadingStatus.value) return;
    isLoadingStatus.value = true;
    try {
      requests.value = (await getCoupleStatus()).map(toCoupleRequest);
      if (isConnected.value) await finishConnection();
    } catch {
      // 상태 조회 실패는 조용히 넘긴다(수동 새로고침으로 재시도).
    } finally {
      isLoadingStatus.value = false;
    }
  }

  // 연결 완료 처리: 커플 정보 로드 + 온보딩 단계 전환 + 목표 온보딩으로 이동.
  async function finishConnection() {
    stopPolling();
    await coupleStore.loadCouple();
    authStore.setOnboardingStep('GOAL_ONBOARDING');
    await router.replace({ name: ROUTE_NAMES.GOAL_ONBOARDING });
  }

  async function confirm() {
    if (!canConfirm.value) return;
    isSubmitting.value = true;
    errorMessage.value = '';
    feedback.value = '';
    try {
      const response = await connectCouple({ inviteCode: inviteCode.value });
      upsertRequest(
        toCoupleRequest({
          coupleId: response.coupleId,
          status: response.status,
          partner: response.partner,
        })
      );
      if (response.status === 'CONNECTED') {
        feedback.value = COUPLE_MESSAGES.CONNECTED;
        await finishConnection();
      } else {
        feedback.value = `${response.partner.name}님에게 ${COUPLE_MESSAGES.INVITE_SENT}`;
        inviteCodeDraft.value = '';
        startPolling();
      }
    } catch (error) {
      errorMessage.value = coupleErrorMessage(error);
    } finally {
      isSubmitting.value = false;
    }
  }

  async function accept(partnerUserId: number) {
    if (acceptingUserId.value !== null || isConnected.value) return;
    acceptingUserId.value = partnerUserId;
    errorMessage.value = '';
    feedback.value = '';
    try {
      const response = await acceptCoupleRequest(partnerUserId);
      upsertRequest(
        toCoupleRequest({
          coupleId: response.coupleId,
          status: response.status,
          partner: response.partner,
        })
      );
      feedback.value = COUPLE_MESSAGES.CONNECTED;
      await finishConnection();
    } catch (error) {
      errorMessage.value = coupleErrorMessage(error);
      await loadStatus();
    } finally {
      acceptingUserId.value = null;
    }
  }

  async function copyText(value: string, successMessage: string) {
    copyMessage.value = '';
    try {
      if (!navigator.clipboard) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(value);
      copyMessage.value = successMessage;
    } catch {
      copyMessage.value = '복사하지 못했어요. 길게 눌러 직접 복사해주세요.';
    }
  }

  function copyCode() {
    if (INVITE_CODE_PATTERN.test(myInviteCode.value)) {
      void copyText(myInviteCode.value, '내 코드를 복사했어요.');
    }
  }

  function refresh() {
    void loadStatus();
  }

  function startPolling() {
    if (pollTimer !== null) return;
    pollTimer = setInterval(() => void loadStatus(), STATUS_POLL_INTERVAL_MS);
  }

  function stopPolling() {
    if (pollTimer !== null) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  }

  async function init() {
    await Promise.all([loadInviteCode(), loadStatus()]);
    if (!isConnected.value && requests.value.some((request) => request.status === 'WAIT')) {
      startPolling();
    }
  }

  onScopeDispose(stopPolling);

  return {
    myInviteCode,
    requests,
    inviteCode,
    feedback,
    errorMessage,
    copyMessage,
    isConnected,
    isLoadingInviteCode,
    isLoadingStatus,
    isSubmitting,
    acceptingUserId,
    canConfirm,
    init,
    confirm,
    accept,
    copyCode,
    refresh,
  };
}
