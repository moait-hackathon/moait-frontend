// GET /home 응답 DTO. 백엔드 스펙이 진실이다.

export interface AssetReturnRateGraphDto {
  date: string;
  returnRate: number;
}

// --- 화면용 임시 필드 (백엔드 확정 시 조정) ---------------------------------
// 자산 분배는 아직 /home 스펙에 없다. server/homeApi.ts 에서 목업을 얹어 준다.
// 백엔드 연동 시 이 주석 블록과 homeApi.ts 의 MOCK 병합을 함께 지운다.

export interface HomeAssetAllocationSliceDto {
  key: string;
  label: string;
  ratio: number; // %
  amount: number; // 원
}

export interface HomeAssetAllocationDto {
  totalAmount: number; // 원
  slices: HomeAssetAllocationSliceDto[];
}

// -------------------------------------------------------------------------

export interface HomeResponseDto {
  userName: string;
  coupleName: string;
  targetDate: string;
  targetAmount: number;
  currentAmount: number;
  achievementRate: number;
  totalAssetReturnRate: number;
  totalAssetChangeAmount: number;
  assetReturnRateGraph: AssetReturnRateGraphDto[];
  todayAssetReturnRate: number;
  todayAssetChangeAmount: number;
  assetAllocation: HomeAssetAllocationDto;
}
