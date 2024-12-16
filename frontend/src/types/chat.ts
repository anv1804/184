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
  type: 'text' | 'image' | 'file' | 'sticker';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  replyTo?: {
    messageId: string;
    content: string;
    sender: {
      _id: string;
      name: string;
    };
  };
  forwardedFrom?: {
    messageId: string;
    sender: {
      _id: string;
      name: string;
    };
  };
  isImportant: boolean;
  reactions: {
    user: {
      _id: string;
      name: string;
    };
    emoji: string;
  }[];
}

export interface MessageAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  show: boolean;
}

export interface EditMessageData {
  messageId: string;
  newContent: string;
  sender?: {
    _id: string;
    name: string;
    avatar?: string;
  };
} 