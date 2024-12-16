import { Message, Conversation } from './index';

export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ConversationsResponse extends APIResponse<Conversation[]> {}
export interface ConversationResponse extends APIResponse<Conversation> {}
export interface MessagesResponse extends APIResponse<Message[]> {}
export interface MessageResponse extends APIResponse<Message> {} 