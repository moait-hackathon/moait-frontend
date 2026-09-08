import { api } from '@/server/axios';
import type { ApiSuccessResponse } from '@/types/common';
import type {
  FinancialInfoRequestDto,
  FinancialInfoResponseDto,
  InvestmentProfileRequestDto,
  InvestmentProfileResponseDto,
} from '@/types/dto/onboarding.dto';

export async function submitFinancialInfo(
  request: FinancialInfoRequestDto
): Promise<FinancialInfoResponseDto> {
  const { data } = await api.patch<ApiSuccessResponse<FinancialInfoResponseDto>>(
    '/onboarding/financial-info',
    request
  );
  return data.data;
}

export async function submitInvestmentProfile(
  request: InvestmentProfileRequestDto
): Promise<InvestmentProfileResponseDto> {
  const { data } = await api.post<ApiSuccessResponse<InvestmentProfileResponseDto>>(
    '/onboarding/investment-profile',
    request
  );
  return data.data;
}
