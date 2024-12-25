import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User } from '../types/interfaces'; // Import interface

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateOnlineStatus: (status: boolean) => void;
  isLoading: boolean;
  updateUserStatus: (isOnline: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Kiểm tra trạng thái đăng nhập khi khởi động
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        // Set token cho tất cả các request
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Xác thực token với server
        const response = await axios.get('http://localhost:5000/auth/verify');

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

    checkAuth();

    // Cleanup function
    return () => {
      if (user?._id) {
        updateOnlineStatus(false);
      }
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      });

      const { token, user: userData } = response.data;
      
      // Lưu token vào localStorage
      localStorage.setItem('token', token);
      
      // Set token cho tất cả các request tiếp theo
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
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
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateOnlineStatus = async (status: boolean) => {
    const token = localStorage.getItem('token');
    if (!token || !user?._id) return;

    try {
      const response = await axios.post('http://localhost:5000/auth/status', {
        userId: user._id,
        isOnline: status
      });

      if (response.data.success) {
        setUser(prev => prev ? { ...prev, isOnline: status } : null);
      }
    } catch (error) {
      console.error('Failed to update online status:', error);
    }
  };

  const updateUserStatus = (isOnline: boolean) => {
    setUser((prevUser) => {
      if (!prevUser) {
        return {
          _id: '', // Provide a default value or handle accordingly
          name: '',
          email: '',
          role: '',
          avatar: '',
          isOnline,
        } as User; // Cast to User type
      }
      return {
        ...prevUser,
        isOnline,
      };
    });
  };

  // Không render children khi đang loading
  if (isLoading) {
    return <div>Loading...</div>; // Hoặc component loading của bạn
  }

  const value = {
    user,
    login,
    logout: handleLogout,
    isAuthenticated,
    updateOnlineStatus,
    isLoading,
    updateUserStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
