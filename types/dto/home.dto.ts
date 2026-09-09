// GET /home 응답 DTO. 백엔드 스펙이 진실이다.

export interface AssetReturnRateGraphDto {
  date: string;
  returnRate: number;
}

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
}
