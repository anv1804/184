// frontend/src/services/tempUserService.ts
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Friend, StatusChangeData } from '../types/friend';
import socketService from './socket';
import { api } from './api';

export const getTempUserId = () => {
  return 'temp-' + Math.random().toString(36).substr(2, 9);
};

export const useFriendSearch = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await api.friends.getList();
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();

    const socket = socketService.connect();
    if (socket && user?._id) {
      socket.emit('join_chat', user._id);

      socket.on('user_status_change', ({ userId, isOnline }: StatusChangeData) => {
        setFriends(prevFriends => 
          prevFriends.map(friend => 
            friend._id === userId ? { ...friend, isOnline } : friend
          )
        );
      });

      return () => {
        socket.off('user_status_change');
      };
    }
  }, [user?._id]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return {
    friends,
    searchQuery,
    loading,
    handleSearch,
    setFriends
  };
};