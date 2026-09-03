import { api } from '@/server/axios';
import type { ApiSuccessResponse } from '@/types/common';
import type {
  LoginRequestDto,
  LoginResponseDto,
  SignupRequestDto,
  SignupResponseDto,
} from '@/types/dto/auth.dto';

export async function login(request: LoginRequestDto): Promise<LoginResponseDto> {
  const { data } = await api.post<ApiSuccessResponse<LoginResponseDto>>('/auth/login', request);
  return data.data;
}

export async function signup(request: SignupRequestDto): Promise<SignupResponseDto> {
  const { data } = await api.post<ApiSuccessResponse<SignupResponseDto>>('/auth/signup', request);
  return data.data;
}
