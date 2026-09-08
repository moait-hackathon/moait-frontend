<script setup lang="ts">
import CoupleRequestCard from '@/components/couple/CoupleRequestCard.vue';
import type { CoupleRequest } from '@/types/couple';

defineProps<{
  myInviteCode: string;
  requests: CoupleRequest[];
  isConnected: boolean;
  isLoadingInviteCode: boolean;
  isLoadingStatus: boolean;
  isSubmitting: boolean;
  acceptingUserId: number | null;
  canConfirm: boolean;
  feedback: string;
  errorMessage: string;
  copyMessage: string;
}>();

const emit = defineEmits<{
  confirm: [];
  accept: [partnerUserId: number];
  copyCode: [];
  refresh: [];
}>();

const inviteCode = defineModel<string>('inviteCode', { required: true });
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- 내 코드 -->
    <section aria-labelledby="my-invite-code-label">
      <h2
        id="my-invite-code-label"
        class="mb-2 text-xs font-extrabold text-foreground"
      >
        내 코드
      </h2>
      <div class="grid grid-cols-[minmax(0,1fr)_64px] gap-2">
        <output
          class="flex h-[52px] min-w-0 items-center rounded-xl border border-border bg-accent px-4 font-mono text-sm font-extrabold tracking-[0.12em] text-foreground"
          aria-live="polite"
        >
          <span
            v-if="isLoadingInviteCode"
            class="font-sans text-xs font-medium tracking-normal text-muted-foreground"
          >
            불러오는 중...
          </span>
          <span v-else-if="myInviteCode">{{ myInviteCode }}</span>
          <span
            v-else
            class="font-sans text-xs font-medium tracking-normal text-muted-foreground"
          >
            코드를 불러올 수 없어요
          </span>
        </output>
        <button
          type="button"
          class="grid h-[52px] place-items-center rounded-xl bg-primary text-xs font-extrabold text-primary-foreground transition enabled:hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          :disabled="isLoadingInviteCode || !myInviteCode"
          @click="emit('copyCode')"
        >
          복사
        </button>
      </div>
      <p
        class="mt-2 min-h-4 text-[11px] leading-4"
        :class="copyMessage ? 'text-foreground' : 'text-muted-foreground'"
        aria-live="polite"
      >
        {{ copyMessage || '상대에게 내 코드를 공유해주세요.' }}
      </p>
    </section>

    <!-- 상대 코드 -->
    <form
      aria-label="상대 초대 코드 확인"
      @submit.prevent="emit('confirm')"
    >
      <label
        class="mb-2 block text-xs font-extrabold text-foreground"
        for="couple-invite-code"
      >
        상대 코드
      </label>
      <div class="grid grid-cols-[minmax(0,1fr)_64px] gap-2">
        <input
          id="couple-invite-code"
          v-model="inviteCode"
          class="h-[52px] min-w-0 rounded-xl border px-4 font-mono text-sm font-extrabold uppercase tracking-[0.12em] text-foreground outline-none transition placeholder:font-sans placeholder:text-xs placeholder:font-medium placeholder:normal-case placeholder:tracking-normal placeholder:text-muted-foreground"
          :class="
            errorMessage
              ? 'border-primary focus:ring-3 focus:ring-ring/20'
              : 'border-border focus:border-ring focus:ring-3 focus:ring-ring/20'
          "
          type="text"
          inputmode="text"
          autocomplete="off"
          autocapitalize="characters"
          spellcheck="false"
          maxlength="12"
          placeholder="ABC123"
          :disabled="isSubmitting || isConnected"
          :aria-invalid="errorMessage.length > 0"
        />
        <button
          type="submit"
          class="grid h-[52px] place-items-center rounded-xl bg-primary text-[13px] font-extrabold text-primary-foreground transition enabled:hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          :disabled="!canConfirm"
        >
          {{ isSubmitting ? '확인 중' : '확인' }}
        </button>
      </div>
      <p
        class="mt-2 min-h-4 text-[11px] leading-4"
        :class="errorMessage ? 'text-primary' : feedback ? 'text-foreground' : 'text-muted-foreground'"
        role="status"
        aria-live="polite"
      >
        {{ errorMessage || feedback || '공백 없이 영문 대문자와 숫자 6자리로 입력해주세요.' }}
      </p>
    </form>

    <!-- 연결 요청 목록 -->
    <section v-if="requests.length > 0">
      <div class="mb-2 flex items-center justify-between">
        <h2 class="text-xs font-extrabold text-foreground">연결 요청</h2>
        <button
          type="button"
          class="text-[11px] font-extrabold text-primary underline underline-offset-2 disabled:text-muted-foreground"
          :disabled="isLoadingStatus"
          @click="emit('refresh')"
        >
          {{ isLoadingStatus ? '새로고침 중' : '새로고침' }}
        </button>
      </div>
      <ul
        class="flex flex-col gap-2"
        aria-label="커플 연결 요청 목록"
      >
        <CoupleRequestCard
          v-for="request in requests"
          :key="request.partnerUserId"
          :request="request"
          :accept-disabled="isConnected || acceptingUserId !== null"
          :is-accepting="acceptingUserId === request.partnerUserId"
          @accept="emit('accept', $event)"
        />
      </ul>
    </section>

    <div
      v-if="isConnected"
      class="flex items-center gap-2 rounded-xl bg-muted px-3.5 py-3 text-xs font-bold text-foreground"
      role="status"
    >
      상대 연결이 완료되었어요.
    </div>

    <p class="text-center text-[11px] leading-4 text-muted-foreground">
      한 계정은 하나의 커플만 연결할 수 있어요.
    </p>
  </div>
</template>
