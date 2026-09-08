import type { RiskProfileType } from '@/types/aiReport';

// AI 리포트 라우트 이름. (constants/routes.ts 의 ROUTE_NAMES 는 공용 파일이라
// 온보딩/홈만 관리하고, AI 화면은 '/ai' 처럼 자체 상수로 둔다.)
export const AI_REPORT_ROUTE_NAME = 'ai-report';

// 목업 데이터 스위치. 백엔드 연동 전까지 URL 파라미터로 두 화면을 오간다.
//   /ai/report/sufficient → 목표 조정 적정
//   /ai/report/adjust     → 목표 조정 필요
export const AI_REPORT_VARIANTS = ['sufficient', 'adjust'] as const;
export type AiReportVariant = (typeof AI_REPORT_VARIANTS)[number];
export const DEFAULT_AI_REPORT_VARIANT: AiReportVariant = 'sufficient';

// RiskProfileType 한글명. 응답 profileTypeLabel 이 비었을 때의 fallback.
export const RISK_PROFILE_TYPE_LABEL = {
  STABLE: '안정형',
  STABLE_SEEKING: '안정추구형',
  BALANCED: '균형형',
  GROWTH_SEEKING: '성장추구형',
  ACTIVE: '적극투자형',
  AGGRESSIVE: '공격투자형',
} as const satisfies Record<RiskProfileType, string>;

// 리포트 섹션 우측 상단 보조 문구.
export const REPORT_SECTION_CAPTIONS = {
  PROJECTION: '현재 계획 기준',
  DIAGNOSIS: '현재 계획 기준',
  RISK_PROFILE: '100점 만점',
  PEER: '같은 목표 유형 기준',
  PLAN_COMPARE: '목표 시점까지 예상 자산',
  LOSS_SIMULATION: '허용 손실 기준',
} as const;
