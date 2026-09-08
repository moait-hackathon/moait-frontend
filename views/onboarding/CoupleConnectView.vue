<script setup lang="ts">
import { onMounted } from 'vue';

import AuthScreen from '@/components/auth/AuthScreen.vue';
import OnboardingStepHeader from '@/components/common/OnboardingStepHeader.vue';
import CoupleConnectForm from '@/components/couple/CoupleConnectForm.vue';
import { useCoupleConnect } from '@/composables/useCoupleConnect';

const {
  myInviteCode,
  shareUrl,
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
  copyShareUrl,
  refresh,
} = useCoupleConnect();

onMounted(() => {
  void init();
});
</script>

<template>
  <AuthScreen>
    <div class="flex min-h-dvh flex-1 flex-col bg-white">
      <OnboardingStepHeader
        :step="1"
        :total-steps="2"
      />

      <main class="flex-1 px-5 pb-10 pt-4 sm:px-8">
        <h1 class="text-[22px] font-extrabold leading-tight tracking-[-0.03em] text-foreground">
          상대를 연결해주세요
        </h1>
        <p class="mt-1.5 text-xs leading-5 text-dm-gray-dark">
          초대 코드로 두 사람의 공동 목표 공간을 만들어요.
        </p>

        <div class="mt-6">
          <CoupleConnectForm
            v-model:invite-code="inviteCode"
            :my-invite-code="myInviteCode"
            :share-url="shareUrl"
            :requests="requests"
            :is-connected="isConnected"
            :is-loading-invite-code="isLoadingInviteCode"
            :is-loading-status="isLoadingStatus"
            :is-submitting="isSubmitting"
            :accepting-user-id="acceptingUserId"
            :can-confirm="canConfirm"
            :feedback="feedback"
            :error-message="errorMessage"
            :copy-message="copyMessage"
            @confirm="confirm"
            @accept="accept"
            @copy-code="copyCode"
            @copy-share-url="copyShareUrl"
            @refresh="refresh"
          />
        </div>
      </main>
    </div>
  </AuthScreen>
</template>
