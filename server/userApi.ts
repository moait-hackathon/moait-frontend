import { api } from '@/server/axios';
import type { ApiSuccessResponse } from '@/types/common';
import type { UserResponseDto } from '@/types/dto/user.dto';

export async function getMe(): Promise<UserResponseDto> {
  const { data } = await api.get<ApiSuccessResponse<UserResponseDto>>('/users/me');
  return data.data;
}
