// src/types/chat.ts
export interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: string;
    read?: boolean;
    attachments?: Array<{
      type: 'image' | 'file';
      url: string;
      name?: string;
    }>;
  }
  
  export interface Conversation {
    id: string;
    participants: string[];
    lastMessage?: Message;
    unreadCount: number;
    updatedAt: string;
  }