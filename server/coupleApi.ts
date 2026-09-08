import { api } from '@/server/axios';
import type { ApiSuccessResponse } from '@/types/common';
import type {
  CoupleAcceptResponseDto,
  CoupleConnectRequestDto,
  CoupleConnectResponseDto,
  CoupleDisconnectResponseDto,
  CoupleInviteCodeResponseDto,
  CoupleMeResponseDto,
  CoupleStatusItemDto,
} from '@/types/dto/couple.dto';

// GET /couples/invite-code — 가입 시 자동 발급된 내 초대 코드.
export async function getInviteCode(): Promise<CoupleInviteCodeResponseDto> {
  const { data } = await api.get<ApiSuccessResponse<CoupleInviteCodeResponseDto>>(
    '/couples/invite-code'
  );
  return data.data;
}

// POST /couples/connect — 상대 코드 입력. 상대가 이미 내 코드를 넣었으면 즉시 CONNECTED.
export async function connectCouple(
  request: CoupleConnectRequestDto
): Promise<CoupleConnectResponseDto> {
  const { data } = await api.post<ApiSuccessResponse<CoupleConnectResponseDto>>(
    '/couples/connect',
    request
  );
  return data.data;
}

// POST /couples/requests/{partnerUserId}/accept — 나에게 온 요청 수락.
export async function acceptCoupleRequest(
  partnerUserId: number
): Promise<CoupleAcceptResponseDto> {
  const { data } = await api.post<ApiSuccessResponse<CoupleAcceptResponseDto>>(
    `/couples/requests/${partnerUserId}/accept`
  );
  return data.data;
}

// GET /couples/status — 내가 관여된 모든 연결 건(배열). DISCONNECTED 제외.
export async function getCoupleStatus(): Promise<CoupleStatusItemDto[]> {
  const { data } = await api.get<ApiSuccessResponse<CoupleStatusItemDto[]>>('/couples/status');
  return data.data;
}

// GET /couples/me — CONNECTED 커플 + 파트너 정보. 없으면 404.
export async function getCouple(): Promise<CoupleMeResponseDto> {
  const { data } = await api.get<ApiSuccessResponse<CoupleMeResponseDto>>('/couples/me');
  return data.data;
}

// DELETE /couples/me — 연결 해제(soft).
export async function disconnectCouple(): Promise<CoupleDisconnectResponseDto> {
  const { data } = await api.delete<ApiSuccessResponse<CoupleDisconnectResponseDto>>(
    '/couples/me'
  );
  return data.data;
}
