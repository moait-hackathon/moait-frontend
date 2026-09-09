import { api } from '@/server/axios';
import type { ApiSuccessResponse } from '@/types/common';
import type { HomeAssetAllocationDto, HomeResponseDto } from '@/types/dto/home.dto';

import homeAssetAllocation from './mocks/homeAssetAllocation.json';

// 자산 분배는 아직 /home 스펙에 없어 목업을 얹어 준다.
// 백엔드 연동 시 이 상수와 아래 병합(`assetAllocation` 덮어쓰기)을 지운다.
const MOCK_ASSET_ALLOCATION = homeAssetAllocation as HomeAssetAllocationDto;

// GET /home — 홈 화면 조회.
export async function getHome(): Promise<HomeResponseDto> {
  const { data } = await api.get<ApiSuccessResponse<HomeResponseDto>>('/home');
  return { ...data.data, assetAllocation: MOCK_ASSET_ALLOCATION };
}
