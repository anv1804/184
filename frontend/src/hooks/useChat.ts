import { useState, useCallback, useEffect } from 'react';
import { Message, Conversation } from '../types';
import { api } from '../services/api';
import socketService from '../services/socket';

export const useChat = (conversationId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Load messages
  const loadMessages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.chat.getMessages(conversationId);
      setMessages(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  // Send message
  const sendMessage = useCallback(async (content: string) => {
    try {
      const response = await api.chat.sendMessage(conversationId, { content });
      const newMessage = response.data.data;
      setMessages(prev => [...prev, newMessage]);
      return newMessage;
    } catch (err) {
      setError('Failed to send message');
      throw err;
    }
  }, [conversationId]);

  // Handle socket events
  useEffect(() => {
    const socket = socketService.connect();
    socket.emit('join_room', conversationId);

    socket.on('new_message', (data: Message) => {
      setMessages(prev => [...prev, data]);
    });

    socket.on('typing_status', ({ isTyping: typing }: { isTyping: boolean }) => {
      setIsTyping(typing);
    });

    return () => {
      socket.emit('leave_room', conversationId);
      socket.off('new_message');
      socket.off('typing_status');
    };
  }, [conversationId]);

  // Initial load
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return {
    messages,
    loading,
    error,
    isTyping,
    sendMessage,
    setMessages
  };
}; 