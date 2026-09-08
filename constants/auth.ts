import type { Gender, TermsType } from '@/types/auth';

interface GenderOption {
  value: Gender;
  label: string;
}

export const GENDER_OPTIONS = [
  { value: 'MALE', label: '남성' },
  { value: 'FEMALE', label: '여성' },
] as const satisfies readonly GenderOption[];

interface TermsItem {
  termsType: TermsType;
  // 라우트 파라미터(/signup/terms/:termsType)로 쓰는 소문자 슬러그
  slug: string;
  label: string;
  required: boolean;
}

export const TERMS = [
  { termsType: 'SERVICE', slug: 'service', label: '서비스 이용약관', required: true },
  { termsType: 'PRIVACY', slug: 'privacy', label: '개인정보 수집·이용 동의', required: true },
  { termsType: 'FINANCE', slug: 'finance', label: '금융정보 연동 약관', required: true },
  { termsType: 'MARKETING', slug: 'marketing', label: '마케팅 정보 수신 동의', required: false },
] as const satisfies readonly TermsItem[];

export const REQUIRED_TERMS_TYPES = TERMS.filter((term) => term.required).map(
  (term) => term.termsType
);
