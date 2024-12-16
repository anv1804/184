// src/components/Chat/ChatSidebar.tsx
import React, { useEffect, useState } from 'react';
import { Input, Avatar, List, Badge } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import axios from '../../config/axios';
import socketService from '../../services/socketService';

interface Friend {
  _id: string;
  name: string;
  avatar?: string;
  email: string;
  isOnline: boolean;
}

interface StatusChangeData {
  userId: string;
  isOnline: boolean;
}

interface Props {
  onSelectFriend: (friend: Friend) => void;
}

const ChatSidebar: React.FC<Props> = ({ onSelectFriend }) => {
  const [searchText, setSearchText] = useState('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('/api/friends/list');
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

  // Lọc bạn bè theo tên hoặc email
  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchText.toLowerCase()) ||
    friend.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="w-1/4 border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b">
        <Input
          placeholder="Tìm kiếm bạn bè"
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="rounded-lg"
        />
      </div>

      <List
        className="flex-1 overflow-y-auto"
        loading={loading}
        dataSource={filteredFriends}
        renderItem={(friend) => (
          <List.Item 
            className="cursor-pointer hover:bg-gray-50 p-4 border-b"
            onClick={() => onSelectFriend(friend)}
          >
            <List.Item.Meta
              avatar={
                <Badge 
                  dot 
                  status={friend.isOnline ? "success" : "default"}
                  offset={[-6, 28]}
                >
                  <Avatar 
                    src={friend.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}`} 
                    className="w-10 h-10"
                  />
                </Badge>
              }
              title={
                <div className="flex items-center justify-between">
                  <span className="font-medium">{friend.name}</span>
                  <span className="text-xs text-gray-500">
                    {friend.isOnline ? 'Đang hoạt động' : 'Offline'}
                  </span>
                </div>
              }
              description={
                <span className="text-sm text-gray-500">{friend.email}</span>
              }
            />
          </List.Item>
        )}
        locale={{
          emptyText: searchText ? 'Không tìm thấy bạn bè' : 'Chưa có bạn bè nào'
        }}
      />
    </div>
  );
};

export default ChatSidebar;