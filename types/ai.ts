export type AiChatRole = 'assistant' | 'user';

export interface AiChatMessage {
  id: number;
  role: AiChatRole;
  content: string;
}

export interface AiFeature {
  title: string;
  description: string;
  icon: 'wallet' | 'chart';
}
