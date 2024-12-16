// frontend/src/components/Chat/ChatWindow.tsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Input, Button, Avatar } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import axios from '../../config/axios';
import { useAuth } from '../../context/AuthContext';
import socketService from '../../services/socketService';
import MessageActions from './MessageActions';
import MessageInput from './MessageInput';

interface Message {
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

interface Participant {
  _id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
}

interface TypingStatus {
  userId: string;
  isTyping: boolean;
}

interface Props {
  conversation: {
    _id: string;
    participants: Participant[];
  };
}

interface MessageAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  show: boolean;
}

interface RecallMessageData {
  messageId: string;
}

interface EditMessageData {
  messageId: string;
  newContent: string;
}

interface MessageData {
  type?: 'text' | 'image' | 'file' | 'sticker';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
}

const ChatWindow: React.FC<Props> = ({ conversation }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useAuth();
  const socket = socketService.connect();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Message[]>([]);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const otherParticipant = useMemo(() => {
    return conversation.participants.find(p => p._id !== user?._id) || conversation.participants[0];
  }, [conversation.participants, user?._id]);

  const scrollToBottom = (force = false) => {
    if (force || isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setHasNewMessage(false);
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom(true);
    }
  }, [conversation._id]);

  useEffect(() => {
    if (messages.length > 0) {
      if (isNearBottom) {
        scrollToBottom();
      } else {
        setHasNewMessage(true);
      }
    }
  }, [messages]);

  const emitTypingStatus = (typing: boolean) => {
    if (socket && user?._id) {
      socket.emit('typing_status', {
        conversationId: conversation._id,
        userId: user._id,
        isTyping: typing
      });
    }
  };

  const handleInputFocus = () => {
    emitTypingStatus(true);
  };

  const handleInputBlur = () => {
    emitTypingStatus(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    emitTypingStatus(true);

    typingTimeoutRef.current = setTimeout(() => {
      emitTypingStatus(false);
    }, 2000);
  };

  useEffect(() => {
    loadMessages();

    if (socket && user?._id) {
      socket.emit('join_room', conversation._id);

      socket.on('new_message', (data: Message) => {
        if (data.sender && data.sender._id !== user._id) {
          setMessages(prev => [...prev, data]);
        }
      });

      socket.on('typing_status', ({ userId, isTyping: typing }: TypingStatus) => {
        if (userId !== user._id) {
          setIsTyping(typing);
        }
      });

      return () => {
        socket.off('new_message');
        socket.off('typing_status');
        socket.emit('leave_room', conversation._id);
      };
    }
  }, [conversation._id, user?._id, socket]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/chat/messages/${conversation._id}`);
      const defaultMessage: Partial<Message> = {
        type: 'text',
        isImportant: false,
        reactions: []
      };
      setMessages(response.data.map((msg: Message) => ({
        ...defaultMessage,
        ...msg,
        sender: msg.sender
      })));
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content: string, data?: MessageData) => {
    if ((!content.trim() && !data) || !socket || !user?._id) return;

    try {
      const messageData = {
        content,
        senderId: user._id,
        ...data
      };

      const response = await axios.post(`/api/chat/messages/${conversation._id}`, messageData);

      if (response.data) {
        const newMsg = {
          ...response.data,
          sender: {
            _id: user._id,
            name: user.name,
            avatar: user.avatar
          }
        };
        setMessages(prev => [...prev, newMsg]);

        socket.emit('send_message', {
          conversationId: conversation._id,
          messageId: response.data._id,
          ...messageData
        });

        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleRecallMessage = async (messageId: string) => {
    try {
      await axios.post(`/api/chat/messages/${messageId}/recall`);
      socket.emit('message_recalled', {
        conversationId: conversation._id,
        messageId
      });
      setMessages(prev => 
        prev.map(msg => 
          msg._id === messageId ? { ...msg, isRecalled: true } : msg
        )
      );
    } catch (error) {
      console.error('Error recalling message:', error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await axios.post(`/api/chat/messages/${messageId}/delete`);
      setMessages(prev => prev.filter(msg => msg._id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleEditMessage = async (messageId: string, newContent: string) => {
    try {
      const response = await axios.put(`/api/chat/messages/${messageId}`, {
        content: newContent
      });

      const updatedMessage = {
        ...response.data,
        sender: {
          ...response.data.sender,
          _id: user?._id,
          name: user?.name,
          avatar: user?.avatar
        }
      };

      socket.emit('message_edited', {
        conversationId: conversation._id,
        messageId,
        newContent,
        sender: updatedMessage.sender
      });

      setMessages(prev => 
        prev.map(msg => 
          msg._id === messageId ? updatedMessage : msg
        )
      );
    } catch (error) {
      console.error('Error editing message:', error);
    }
  };

  useEffect(() => {
    if (socket && user?._id) {
      socket.on('message_recalled', ({ messageId }: RecallMessageData) => {
        setMessages(prev => 
          prev.map(msg => 
            msg._id === messageId ? { ...msg, isRecalled: true } : msg
          )
        );
      });

      socket.on('message_edited', ({ messageId, newContent, sender }: EditMessageData & { sender: any }) => {
        setMessages(prev => 
          prev.map(msg => 
            msg._id === messageId ? { 
              ...msg, 
              content: newContent,
              sender: sender || msg.sender
            } : msg
          )
        );
      });

      return () => {
        socket.off('message_recalled');
        socket.off('message_edited');
      };
    }
  }, [socket, user?._id]);

  const renderMessages = () => {
    let lastMessageHour = '';

    return messages
      .filter(message => !message.deletedFor?.includes(user?._id || ''))
      .map((message, index) => {
        if (!message.sender) return null;

        const messageTime = new Date(message.timestamp);
        const currentHour = messageTime.getHours();
        const showTime = lastMessageHour !== currentHour.toString();
        
        if (showTime) {
          lastMessageHour = currentHour.toString();
        }

        return (
          <div key={message._id}>
            {showTime && (
              <div className="text-center text-xs text-gray-500 my-2">
                {messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
            <div
              className={`mb-4 ${
                message.sender._id === user?._id ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.sender._id === user?._id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100'
                }`}
              >
                {message.isRecalled ? (
                  <span className="italic text-gray-500">Tin nhắn đã được thu hồi</span>
                ) : (
                  <MessageActions
                    message={message}
                    currentUserId={user?._id || ''}
                    onRecall={handleRecallMessage}
                    onDelete={handleDeleteMessage}
                    onEdit={handleEditMessage}
                  />
                )}
              </div>
            </div>
          </div>
        );
      });
  };

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post(`/api/chat/upload`, formData);
      const fileUrl = response.data.url;
      
      // Gửi tin nhắn với file
      await sendMessage('', {
        type: file.type.startsWith('image/') ? 'image' : 'file',
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
  };

  const handleForward = async (message: Message, targetConversationId: string) => {
    try {
      await axios.post(`/api/chat/messages/${message._id}/forward`, {
        targetConversationId
      });
    } catch (error) {
      console.error('Error forwarding message:', error);
    }
  };

  const handleToggleImportant = async (messageId: string) => {
    try {
      await axios.post(`/api/chat/messages/${messageId}/toggle-important`);
      setMessages(prev =>
        prev.map(msg =>
          msg._id === messageId ? { ...msg, isImportant: !msg.isImportant } : msg
        )
      );
    } catch (error) {
      console.error('Error toggling important:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = messages.filter(msg =>
      msg.content.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const checkIfNearBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      const threshold = 100; // px from bottom
      const isNear = container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
      setIsNearBottom(isNear);
      if (isNear) {
        setHasNewMessage(false);
      }
    }
  };

  const handleScroll = () => {
    checkIfNearBottom();
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full flex-1 items-center justify-center">
        <div className="text-gray-500">Đang tải tin nhắn...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full flex-1">
      {/* Chat header */}
      <div className="p-4 border-b">
        <div className="flex items-center">
          <Avatar 
            src={otherParticipant?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(otherParticipant?.name || 'User')}`} 
          />
          <div className="ml-3">
            <div className="font-medium">{otherParticipant?.name || 'User'}</div>
            <div className="text-sm text-gray-500">
              {otherParticipant?.isOnline ? 'Đang hoạt động' : 'Offline'}
            </div>
          </div>
        </div>
      </div>

      {/* Messages container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 relative"
        onScroll={handleScroll}
      >
        {renderMessages()}
        {isTyping && (
          <div className="text-left text-gray-500 text-sm italic">
            {otherParticipant?.name} đang soạn tin...
          </div>
        )}
        <div ref={messagesEndRef} />

        {/* New message notification */}
        {hasNewMessage && (
          <div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                     bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg
                     flex items-center cursor-pointer"
            onClick={() => scrollToBottom(true)}
          >
            <div className="mr-2">Có tin nhắn mới</div>
            <div className="animate-bounce">↓</div>
          </div>
        )}
      </div>

      {/* Input area */}
      <MessageInput
        value={newMessage}
        onChange={setNewMessage}
        onSend={handleSendMessage}
        onFileUpload={handleFileUpload}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </div>
  );
};

export default ChatWindow;