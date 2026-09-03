import { isAxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/common';

const NETWORK_ERROR_MESSAGE = '네트워크 연결을 확인해주세요.';
const UNKNOWN_ERROR_MESSAGE = '일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.';

function errorBody(error: unknown): Partial<ApiErrorResponse> | undefined {
  if (!isAxiosError(error) || !error.response) return undefined;
  return error.response.data as Partial<ApiErrorResponse> | undefined;
}

// 사용자에게 보여줄 에러 메시지. 서버 message 를 그대로 쓰고, 없으면 기본 문구.
export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError(error) && !error.response) return NETWORK_ERROR_MESSAGE;
  return errorBody(error)?.message ?? UNKNOWN_ERROR_MESSAGE;
}

// 상세 분기용 errorCode. 없으면 null.
export function getApiErrorCode(error: unknown): string | null {
  return errorBody(error)?.errorCode ?? null;
}
