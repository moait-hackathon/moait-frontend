const MAX_PHONE_DIGITS = 11;

// 입력값에서 숫자만 남긴다.
export function toDigits(value: string): string {
  return value.replace(/\D/g, '');
}

// 휴대폰 번호를 010-1234-5678 형태로 표시한다. (전송값은 toDigits 로 따로 만든다)
export function formatPhone(value: string): string {
  const digits = toDigits(value).slice(0, MAX_PHONE_DIGITS);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

// 금액 입력값에 천 단위 콤마를 붙여 표시한다. 빈 값이면 빈 문자열.
export function formatAmount(value: number | string): string {
  const digits = toDigits(String(value));
  if (!digits) return '';
  return Number(digits).toLocaleString('ko-KR');
}

// 콤마 포함 금액 문자열을 정수로 파싱한다. 빈 값이면 0.
export function parseAmount(value: string): number {
  const digits = toDigits(value);
  return digits ? Number(digits) : 0;
}
