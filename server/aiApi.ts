import { api } from '@/server/axios';
import type { ApiSuccessResponse } from '@/types/common';
import type {
  InvestmentAgreementRequestDto,
  InvestmentAgreementResponseDto,
} from '@/types/dto/ai.dto';

export async function createInvestmentAgreement(
  request: InvestmentAgreementRequestDto
): Promise<InvestmentAgreementResponseDto> {
  const { data } = await api.post<ApiSuccessResponse<InvestmentAgreementResponseDto>>(
    '/v1/investment-analyses/agreements',
    request
  );
  return data.data;
}
