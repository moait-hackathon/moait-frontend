import type { Gender } from '@/types/auth';
import type { OnboardingStep } from '@/types/onboarding';

// 커플 연결 API DTO. 백엔드 스펙(docs/api-spec.md - 부부 연결)이 진실이다.

// 커플 요청/연결의 진행 상태.
export type CoupleConnectStatus = 'WAIT' | 'REQUESTED' | 'CONNECTED';

// 연결 상대(코드 소유자/파트너) 정보.
export interface CouplePartyDto {
  userId: number;
  name: string;
  gender: Gender;
}

// GET /couples/invite-code
export interface CoupleInviteCodeResponseDto {
  inviteCode: string;
  shareUrl: string;
}

// POST /couples/connect
export interface CoupleConnectRequestDto {
  inviteCode: string;
}

export interface CoupleConnectResponseDto {
  coupleId: number;
  // 상대가 아직이면 WAIT, 상대가 이미 내 코드를 넣어뒀으면 즉시 CONNECTED.
  status: 'WAIT' | 'CONNECTED';
  partner: CouplePartyDto;
  // CONNECTED 일 때만 값이 있고, WAIT 이면 null.
  connectedAt: string | null;
}

// POST /couples/requests/{partnerUserId}/accept
export interface CoupleAcceptResponseDto {
  coupleId: number;
  status: 'CONNECTED';
  connectedAt: string;
  partner: CouplePartyDto;
}

// GET /couples/status — 배열. DISCONNECTED 는 포함되지 않는다.
export interface CoupleStatusItemDto {
  coupleId: number;
  status: CoupleConnectStatus;
  partner: CouplePartyDto;
}

// GET /couples/me
export interface CoupleMeResponseDto {
  coupleId: number;
  status: 'CONNECTED';
  connectedAt: string;
  me: CouplePartyDto;
  partner: CouplePartyDto;
  onboardingStep: Extract<OnboardingStep, 'GOAL_ONBOARDING' | 'DONE'>;
  jointRiskProfileType: string | null;
}

// DELETE /couples/me
export interface CoupleDisconnectResponseDto {
  coupleId: number;
  status: 'DISCONNECTED';
}
