// frontend/src/context/ChatContext.tsx
import io, { Socket } from 'socket.io-client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface Message {
  userId: string;
  message: string;
  timestamp: string;
}

interface RoomInfo {
  roomId: string;
  users: string[];
  messages: Message[];
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (message: string) => void;
  currentRoom: string;
  userId: string;
  users: string[];
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<typeof Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const { user } = useAuth();
  const DEFAULT_ROOM = 'room_default';

  useEffect(() => {
    if (!user) return;

    const newSocket = io('http://localhost:5000', {
      query: { 
        userId: user._id
      }
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('join_room', { userId: user._id });
    });

    newSocket.on('room_info', (data: RoomInfo) => {
      console.log('Room info:', data);
      setUsers(data.users);
      setMessages(data.messages);
    });

    newSocket.on('receive_message', (message: Message) => {
      console.log('Received message:', message);
      setMessages(prev => [...prev, message]);
    });

    return () => {
      newSocket.close();
    };
  }, [user]);

  const sendMessage = (message: string) => {
    if (socket && user) {
      socket.emit('send_message', {
        message,
        userId: user._id
      });
    }
  };

  const value = {
    messages,
    sendMessage,
    currentRoom: DEFAULT_ROOM,
    userId: user?._id || '',
    users
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};