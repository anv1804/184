import { useCallback, useRef } from 'react';
import socketService from '../services/socket';

export const useTypingStatus = (conversationId: string, userId: string) => {
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const emitTypingStatus = useCallback((isTyping: boolean) => {
    socketService.emitTypingStatus({
      conversationId,
      userId,
      isTyping
    });
  }, [conversationId, userId]);

  const handleTyping = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    emitTypingStatus(true);
    typingTimeoutRef.current = setTimeout(() => {
      emitTypingStatus(false);
    }, 2000);
  }, [emitTypingStatus]);

  return handleTyping;
}; 