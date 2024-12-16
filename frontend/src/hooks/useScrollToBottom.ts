import { useState, useRef, useCallback, useEffect } from 'react';

interface ScrollOptions {
  threshold?: number;
  behavior?: ScrollBehavior;
}

export const useScrollToBottom = (options: ScrollOptions = {}) => {
  const { threshold = 100, behavior = 'smooth' } = options;
  
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const checkIfNearBottom = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const isNear = container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
      setIsNearBottom(isNear);
      if (isNear) {
        setHasNewMessage(false);
      }
    }
  }, [threshold]);

  const scrollToBottom = useCallback((force = false) => {
    if (force || isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior });
      setHasNewMessage(false);
    }
  }, [isNearBottom, behavior]);

  const handleScroll = useCallback(() => {
    checkIfNearBottom();
  }, [checkIfNearBottom]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return {
    containerRef,
    messagesEndRef,
    hasNewMessage,
    setHasNewMessage,
    isNearBottom,
    scrollToBottom,
    handleScroll
  };
}; 