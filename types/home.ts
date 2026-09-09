export interface AssetReturnRateGraph {
  date: string;
  returnRate: number;
}

export interface HomeAssetAllocationSlice {
  key: string;
  label: string;
  ratio: number;
  amount: number;
}

export interface HomeAssetAllocation {
  totalAmount: number;
  slices: HomeAssetAllocationSlice[];
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
  assetAllocation: HomeAssetAllocation;
}
