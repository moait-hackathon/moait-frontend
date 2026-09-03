// localStorage 키. 문자열 하드코딩 금지 — 항상 이 상수를 쓴다.
// 같은 로컬 호스트에서 다른 앱과 충돌하지 않도록 접두사를 붙인다.
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'moait:accessToken',
  INVESTMENT_RESULT: 'moait:investmentResult',
} as const;
