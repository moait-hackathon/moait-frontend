import { api } from '@/server/axios';
import type { ApiSuccessResponse } from '@/types/common';
import type { HomeResponseDto } from '@/types/dto/home.dto';

// GET /home — 홈 화면 조회.
export async function getHome(): Promise<HomeResponseDto> {
  const { data } = await api.get<ApiSuccessResponse<HomeResponseDto>>('/home');
  return data.data;
}
