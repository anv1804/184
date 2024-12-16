// src/components/Chat/ChatLayout.tsx
import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import axios from '../../config/axios';

interface Friend {
  _id: string;
  name: string;
  avatar?: string;
  email: string;
  isOnline: boolean;
}

interface Conversation {
  _id: string;
  participants: Array<{
    _id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
  }>;
}

const ChatLayout: React.FC = () => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);

  const handleSelectFriend = async (friend: Friend) => {
    setSelectedFriend(friend);
    try {
      const response = await axios.get(`/api/chat/conversation/${friend._id}`);
      setCurrentConversation(response.data);
    } catch (error) {
      console.error('Error getting conversation:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <ChatSidebar onSelectFriend={handleSelectFriend} />
      {currentConversation ? (
        <ChatWindow conversation={currentConversation} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Chọn một người bạn để bắt đầu cuộc trò chuyện
        </div>
      )}
    </div>
  );
};

export default ChatLayout;