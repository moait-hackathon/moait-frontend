import type {
  AssetReturnRateGraphDto,
  HomeResponseDto,
} from '@/types/dto/home.dto';
import type { AssetReturnRateGraph, Home } from '@/types/home';

function toAssetReturnRateGraph(dto: AssetReturnRateGraphDto): AssetReturnRateGraph {
  return {
    date: dto.date,
    returnRate: dto.returnRate,
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
  };
}
