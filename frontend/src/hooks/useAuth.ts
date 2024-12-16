import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    return () => {
      if (user?._id) {
        updateOnlineStatus(false);
      }
    };
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.auth.verify();
      if (response.data.valid) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        await updateOnlineStatus(true);
      } else {
        handleLogout();
      }
    } catch (error) {
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.auth.login(email, password);
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      setUser(userData);
      setIsAuthenticated(true);
      await updateOnlineStatus(true);
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      if (user?._id) {
        await updateOnlineStatus(false);
      }
    } catch (error) {
      console.error('Error updating online status:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateOnlineStatus = async (status: boolean) => {
    if (!user?._id) return;
    try {
      await api.auth.updateStatus(user._id, status);
      setUser(prev => prev ? { ...prev, isOnline: status } : null);
    } catch (error) {
      console.error('Failed to update online status:', error);
    }
  };

  return {
    user,
    login,
    logout: handleLogout,
    isAuthenticated,
    updateOnlineStatus,
    isLoading
  };
}; 