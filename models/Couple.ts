import type {
  CoupleMeResponseDto,
  CoupleStatusItemDto,
} from '@/types/dto/couple.dto';
import type { Couple, CoupleRequest } from '@/types/couple';

// GET /couples/status 항목 → 화면용 평탄화 요청.
export function toCoupleRequest(dto: CoupleStatusItemDto): CoupleRequest {
  return {
    coupleId: dto.coupleId,
    status: dto.status,
    partnerUserId: dto.partner.userId,
    partnerName: dto.partner.name,
    partnerGender: dto.partner.gender,
  };
}

// GET /couples/me → 연결된 커플 도메인.
export function toCouple(dto: CoupleMeResponseDto): Couple {
  return {
    coupleId: dto.coupleId,
    connectedAt: dto.connectedAt,
    me: { ...dto.me },
    partner: { ...dto.partner },
  };
}
