export interface TypingStatusData {
  userId: string;
  conversationId: string;
  isTyping: boolean;
}

export interface MessageEventData {
  conversationId: string;
  messageId: string;
  content?: string;
  senderId: string;
  timestamp: string;
}

export interface UserStatusData {
  userId: string;
  isOnline: boolean;
} 