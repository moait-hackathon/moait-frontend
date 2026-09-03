import { REQUIRED_TERMS_TYPES } from '@/constants/auth';
import type { TermsType } from '@/types/auth';

// 서버와 동일한 휴대폰 번호 규칙 (숫자만, 하이픈 없이).
export const PHONE_PATTERN = /^01[016789]\d{7,8}$/;

export function isValidPhone(digits: string): boolean {
  return PHONE_PATTERN.test(digits);
}

// 서버는 길이만 검증한다 (8~72자). UI 안내는 "8자 이상".
export function isValidPassword(password: string): boolean {
  return password.length >= 8 && password.length <= 72;
}

export function isValidName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed.length >= 1 && trimmed.length <= 50;
}

// 필수 약관(SERVICE/PRIVACY/FINANCE)에 모두 동의했는지.
export function hasAllRequiredTerms(agreements: Record<TermsType, boolean>): boolean {
  return REQUIRED_TERMS_TYPES.every((termsType) => agreements[termsType]);
}
