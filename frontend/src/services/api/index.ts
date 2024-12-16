import axios from '../../config/axios';
import { User } from '../../types';
import { 
  ConversationsResponse, 
  ConversationResponse, 
  MessageResponse, 
  MessagesResponse 
} from '../../types/api';
import { Friend } from '../../types/friend';

interface AuthResponse {
  token: string;
  user: User;
}

interface VerifyResponse {
  valid: boolean;
  user: User;
}

export const api = {
  auth: {
    login: (email: string, password: string) => 
      axios.post<AuthResponse>('/auth/login', { email, password }),
    
    register: (data: any) => 
      axios.post('/auth/register', data),
    
    updateStatus: (userId: string, isOnline: boolean) =>
      axios.post('/auth/status', { userId, isOnline }),
    
    verify: () => 
      axios.get<VerifyResponse>('/auth/verify')
  },
  
  chat: {
    getConversation: (participantId: string) =>
      axios.get<ConversationResponse>(`/api/chat/conversation/${participantId}`),
    
    getConversations: () =>
      axios.get<ConversationsResponse>('/api/chat/conversations'),
    
    getOrCreateConversation: (participantId: string) =>
      axios.post<ConversationResponse>(`/api/chat/conversations`, { participantId }),
    
    getMessages: (conversationId: string) =>
      axios.get<MessagesResponse>(`/api/chat/messages/${conversationId}`),
    
    sendMessage: (conversationId: string, data: any) =>
      axios.post<MessageResponse>(`/api/chat/messages/${conversationId}`, data),
    
    recallMessage: (messageId: string) =>
      axios.post(`/api/chat/messages/${messageId}/recall`),
    
    editMessage: (messageId: string, content: string) =>
      axios.put(`/api/chat/messages/${messageId}`, { content }),
    
    deleteMessage: (messageId: string) =>
      axios.post(`/api/chat/messages/${messageId}/delete`)
  },

  friends: {
    getList: () => axios.get<Friend[]>('/api/friends/list'),
    
    sendRequest: (targetUserId: string) =>
      axios.post('/api/friends/send-request', { targetUserId }),
    
    acceptRequest: (requestId: string) =>
      axios.post('/api/friends/accept-request', { requestId }),
    
    rejectRequest: (requestId: string) =>
      axios.post('/api/friends/reject-request', { requestId })
  }
}; 