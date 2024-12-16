export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  isOnline: boolean;
}

export interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  isRecalled?: boolean;
  editHistory?: {
    content: string;
    editedAt: string;
  }[];
  deletedFor?: string[];
  type: 'text' | 'image' | 'file' | 'sticker';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  isImportant: boolean;
  reactions: {
    user: {
      _id: string;
      name: string;
    };
    emoji: string;
  }[];
}

export interface Conversation {
  _id: string;
  participants: User[];
  lastMessage?: Message;
} 