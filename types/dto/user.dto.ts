import type { Gender } from '@/types/auth';
import type { OnboardingStep } from '@/types/onboarding';

export interface UserResponseDto {
  userId: number;
  name: string;
  phone: string;
  gender: Gender;
  onboardingStep: OnboardingStep;
}
