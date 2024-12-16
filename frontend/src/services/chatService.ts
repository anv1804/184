// src/services/chatService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const chatService = {
  getConversations: async () => {
    const response = await axios.get(`${API_URL}/conversations`);
    return response.data;
  },

  getMessages: async (conversationId: string) => {
    const response = await axios.get(`${API_URL}/messages/${conversationId}`);
    return response.data;
  },

  sendMessage: async (conversationId: string, message: string) => {
    const response = await axios.post(`${API_URL}/messages`, {
      conversationId,
      message,
    });
    return response.data;
  },
};