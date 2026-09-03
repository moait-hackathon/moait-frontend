import { STORAGE_KEYS } from '@/constants/storage';
import type { InvestmentProfileResponseDto } from '@/types/dto/onboarding.dto';

// 투자성향 조회 API 가 없어, 설문 제출 응답을 localStorage 에 보관해 결과/홈 화면에서 재사용한다.
// 로그아웃 시 clearInvestmentResult 로 함께 지운다.

export function saveInvestmentResult(data: InvestmentProfileResponseDto): void {
  localStorage.setItem(STORAGE_KEYS.INVESTMENT_RESULT, JSON.stringify(data));
}

export function loadInvestmentResult(): InvestmentProfileResponseDto | null {
  const raw = localStorage.getItem(STORAGE_KEYS.INVESTMENT_RESULT);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as InvestmentProfileResponseDto;
  } catch {
    return null;
  }
}

export function clearInvestmentResult(): void {
  localStorage.removeItem(STORAGE_KEYS.INVESTMENT_RESULT);
}
