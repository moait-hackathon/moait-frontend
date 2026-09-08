// 백엔드 초대 코드 검증과 동일한 영문 대문자·숫자 6자리 형식.
export const INVITE_CODE_PATTERN = /^[A-Z0-9]{6}$/;
export const INVITE_CODE_LENGTH = 6;

// POST /couples/connect · accept 실패 시 errorCode → 사용자 문구.
// (서버 message 를 그대로 쓰되, 없을 때의 기본값)
export const COUPLE_ERROR_MESSAGES = {
  INVITATION_NOT_FOUND: '존재하지 않는 초대 코드예요.',
  CANNOT_CONNECT_SELF: '본인 코드는 입력할 수 없어요.',
  SAME_GENDER: '서로 다른 성별끼리만 연결할 수 있어요.',
  ALREADY_CONNECTED: '이미 다른 상대와 연결되어 있어요.',
  REQUEST_NOT_FOUND: '대기 중인 연결 요청이 없어요.',
} as const;

export const COUPLE_MESSAGES = {
  CONNECTED: '상대 연결이 완료되었어요.',
  INVITE_SENT: '연결 요청을 보냈어요.',
} as const;
