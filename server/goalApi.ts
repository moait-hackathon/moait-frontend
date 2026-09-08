import { api } from '@/server/axios';
import type { ApiSuccessResponse } from '@/types/common';
import type {
  GoalCurrentAmountRequestDto,
  GoalCurrentAmountResponseDto,
  GoalOnboardingRequestDto,
  GoalPatchRequestDto,
  GoalResponseDto,
} from '@/types/dto/goal.dto';

// POST /goals — 온보딩 5단계 폼 제출. 커플당 1회. 재호출 시 409 GOAL_ALREADY_EXISTS.
export async function createGoal(
  request: GoalOnboardingRequestDto
): Promise<GoalResponseDto> {
  const { data } = await api.post<ApiSuccessResponse<GoalResponseDto>>('/goals', request);
  return data.data;
}

// GET /goals/me — 목표 + 진척률 + R. 없으면 404 GOAL_NOT_FOUND.
export async function getMyGoal(): Promise<GoalResponseDto> {
  const { data } = await api.get<ApiSuccessResponse<GoalResponseDto>>('/goals/me');
  return data.data;
}

// PATCH /goals/me — 마이페이지 부분 수정. 점수 문항 변경 시 R 재계산.
export async function patchGoal(request: GoalPatchRequestDto): Promise<GoalResponseDto> {
  const { data } = await api.patch<ApiSuccessResponse<GoalResponseDto>>('/goals/me', request);
  return data.data;
}

// PATCH /goals/me/current-amount — 진척 금액 갱신.
export async function updateCurrentAmount(
  request: GoalCurrentAmountRequestDto
): Promise<GoalCurrentAmountResponseDto> {
  const { data } = await api.patch<ApiSuccessResponse<GoalCurrentAmountResponseDto>>(
    '/goals/me/current-amount',
    request
  );
  return data.data;
}
