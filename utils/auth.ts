import { STORAGE_KEYS } from '@/constants/storage';

// 토큰 접근은 전부 이 헬퍼를 거친다.
// (후속: JWT exp 를 디코드해 만료 여부까지 검사하는 isAccessTokenValid 로 확장)

export function getAccessToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
}

export function clearAccessToken(): void {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
}

export function hasAccessToken(): boolean {
  return Boolean(getAccessToken());
}
