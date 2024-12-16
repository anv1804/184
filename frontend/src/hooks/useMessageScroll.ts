import { useState, useRef, useCallback } from 'react';

export const useMessageScroll = () => {
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkIfNearBottom = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const threshold = 100;
      const isNear = container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
      setIsNearBottom(isNear);
      if (isNear) {
        setHasNewMessage(false);
      }
    }
  }, []);

  const scrollToBottom = useCallback((force = false) => {
    if (force || isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setHasNewMessage(false);
    }
  }, [isNearBottom]);

  const handleScroll = useCallback(() => {
    checkIfNearBottom();
  }, [checkIfNearBottom]);

  return {
    hasNewMessage,
    setHasNewMessage,
    isNearBottom,
    messagesEndRef,
    containerRef,
    scrollToBottom,
    handleScroll
  };
}; 