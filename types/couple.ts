import type { Gender } from '@/types/auth';

// 프론트 도메인 타입. DTO(types/dto/couple.dto.ts)를 화면에서 쓰기 좋게 평탄화한 형태.

export type CoupleRequestStatus = 'WAIT' | 'REQUESTED' | 'CONNECTED';

// GET /couples/status 항목 — partner 를 펼쳐서 보관한다.
export interface CoupleRequest {
  coupleId: number;
  status: CoupleRequestStatus;
  partnerUserId: number;
  partnerName: string;
  partnerGender: Gender;
}

export interface CoupleMember {
  userId: number;
  name: string;
  gender: Gender;
}

// GET /couples/me — 연결된 커플.
export interface Couple {
  coupleId: number;
  connectedAt: string;
  me: CoupleMember;
  partner: CoupleMember;
}
