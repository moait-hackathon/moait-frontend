import type { Gender, TermsType } from '@/types/auth';
import type { OnboardingStep } from '@/types/onboarding';

export interface AgreementDto {
  termsType: TermsType;
  agreed: boolean;
}

export interface SignupRequestDto {
  name: string;
  phone: string;
  password: string;
  gender: Gender;
  agreements: AgreementDto[];
}

export interface SignupResponseDto {
  userId: number;
  accessToken: string;
  onboardingStep: OnboardingStep;
}

export interface LoginRequestDto {
  phone: string;
  password: string;
}

export interface LoginResponseDto {
  userId: number;
  accessToken: string;
  onboardingStep: OnboardingStep;
}
