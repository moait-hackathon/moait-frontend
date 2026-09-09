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

// 금액을 한글 억/만 단위로 표시한다. 예) 195_000_000 → "1억 9,500만 원", 6_000_000 → "600만 원".
// 만 단위로 떨어지지 않는 나머지는 그대로 원 단위로 붙인다.
export function formatKrwUnit(value: number): string {
  const won = Math.round(Math.abs(value));
  if (won === 0) return '0원';

  const eok = Math.floor(won / 100_000_000);
  const man = Math.floor((won % 100_000_000) / 10_000);
  const rest = won % 10_000;

  const parts: string[] = [];
  if (eok) parts.push(`${eok.toLocaleString('ko-KR')}억`);
  if (man) parts.push(`${man.toLocaleString('ko-KR')}만`);
  if (rest) parts.push(`${rest.toLocaleString('ko-KR')}`);

  const sign = value < 0 ? '-' : '';
  return `${sign}${parts.join(' ')} 원`;
}

// ISO 날짜(YYYY-MM-DD)를 "YYYY.MM.DD" 로 표시한다. 형식이 다르면 원본을 그대로 반환.
export function formatDotDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  return match ? `${match[1]}.${match[2]}.${match[3]}` : value;
}
