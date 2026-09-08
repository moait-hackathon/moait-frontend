export interface AssetReturnRateGraph {
  date: string;
  returnRate: number;
}

export interface Home {
  userName: string;
  coupleName: string;
  targetDate: string;
  targetAmount: number;
  currentAmount: number;
  achievementRate: number;
  totalAssetReturnRate: number;
  totalAssetChangeAmount: number;
  assetReturnRateGraph: AssetReturnRateGraph[];
  todayAssetReturnRate: number;
  todayAssetChangeAmount: number;
}
