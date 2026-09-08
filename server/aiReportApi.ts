import type { AiReportVariant } from '@/constants/aiReport';
import type { AiReportDataDto, AiReportResponseDto } from '@/types/dto/aiReport.dto';

import aiReportAdjust from './mocks/aiReportAdjust.json';
import aiReportSufficient from './mocks/aiReportSufficient.json';

// GET /ai-report/me — AI 투자 합의안 리포트.
// 백엔드 미구현 상태라 목업 JSON 을 응답 형태 그대로 돌려준다.
// 연동 시 아래 MOCKS 참조를 지우고 `api.get<ApiSuccessResponse<AiReportResponseDto>>('/ai-report/me')` 로 교체한다.
const MOCKS: Record<AiReportVariant, AiReportResponseDto> = {
  sufficient: aiReportSufficient as AiReportResponseDto,
  adjust: aiReportAdjust as AiReportResponseDto,
};

// 목업 응답 지연(ms). 로딩 UI 를 확인하기 위한 값.
const MOCK_DELAY_MS = 400;

export async function getAiReport(variant: AiReportVariant): Promise<AiReportDataDto> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  return MOCKS[variant].data;
}
