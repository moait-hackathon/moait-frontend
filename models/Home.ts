import type {
  AssetReturnRateGraphDto,
  HomeAssetAllocationDto,
  HomeAssetAllocationSliceDto,
  HomeResponseDto,
} from '@/types/dto/home.dto';
import type {
  AssetReturnRateGraph,
  Home,
  HomeAssetAllocation,
  HomeAssetAllocationSlice,
} from '@/types/home';

function toAssetReturnRateGraph(dto: AssetReturnRateGraphDto): AssetReturnRateGraph {
  return {
    date: dto.date,
    returnRate: dto.returnRate,
  };
}

function toHomeAssetAllocationSlice(
  dto: HomeAssetAllocationSliceDto
): HomeAssetAllocationSlice {
  return {
    key: dto.key,
    label: dto.label,
    ratio: dto.ratio,
    amount: dto.amount,
  };
}

function toHomeAssetAllocation(dto: HomeAssetAllocationDto): HomeAssetAllocation {
  return {
    totalAmount: dto.totalAmount,
    slices: dto.slices.map(toHomeAssetAllocationSlice),
  };
}

export function toHome(dto: HomeResponseDto): Home {
  return {
    userName: dto.userName,
    coupleName: dto.coupleName,
    targetDate: dto.targetDate,
    targetAmount: dto.targetAmount,
    currentAmount: dto.currentAmount,
    achievementRate: dto.achievementRate,
    totalAssetReturnRate: dto.totalAssetReturnRate,
    totalAssetChangeAmount: dto.totalAssetChangeAmount,
    assetReturnRateGraph: dto.assetReturnRateGraph.map(toAssetReturnRateGraph),
    todayAssetReturnRate: dto.todayAssetReturnRate,
    todayAssetChangeAmount: dto.todayAssetChangeAmount,
    assetAllocation: toHomeAssetAllocation(dto.assetAllocation),
  };
}
