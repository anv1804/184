import { useState, useCallback, useEffect } from 'react';
import { Conversation } from '../types';
import { api } from '../services/api';

export const useConversation = (userId: string) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadConversations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.chat.getConversations();
      setConversations(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load conversations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createConversation = useCallback(async (participantId: string) => {
    try {
      const response = await api.chat.getOrCreateConversation(participantId);
      setConversations(prev => [...prev, response.data.data]);
      return response.data.data;
    } catch (err) {
      setError('Failed to create conversation');
      throw err;
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return {
    conversations,
    loading,
    error,
    createConversation,
    setConversations
  };
}; 