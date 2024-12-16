import { useState, useEffect, useRef } from 'react';
import socketService from '../services/socket';
import { TypingStatusData } from '../types/socket';

export const useTyping = (conversationId: string, userId: string) => {
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const emitTypingStatus = (typing: boolean) => {
    const data: TypingStatusData = {
      conversationId,
      userId,
      isTyping: typing
    };
    socketService.emitTypingStatus(data);
  };

  const handleTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    emitTypingStatus(true);
    typingTimeoutRef.current = setTimeout(() => {
      emitTypingStatus(false);
    }, 2000);
  };

  useEffect(() => {
    const socket = socketService.getSocket();
    
    socket?.on('typing_status', (data: TypingStatusData) => {
      if (data.userId !== userId) {
        setIsTyping(data.isTyping);
      }
    });

    return () => {
      socket?.off('typing_status');
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [userId, conversationId]);

  return {
    isTyping,
    handleTyping
  };
}; 