// src/components/Chat/ChatSidebar.tsx
import React from 'react';
import { Input, Avatar, List, Badge } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFriendSearch } from '../../services/tempUserService';
import type { Friend } from '../../types/friend';

interface Props {
  onSelectFriend: (friend: Friend) => void;
}

const ChatSidebar: React.FC<Props> = ({ onSelectFriend }) => {
  const { 
    friends, 
    searchQuery, 
    loading, 
    handleSearch 
  } = useFriendSearch();

  // Lọc bạn bè theo tên hoặc email
  const filteredFriends: Friend[] = friends.filter((friend: Friend) => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-1/4 border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b">
        <Input
          placeholder="Tìm kiếm bạn bè"
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="rounded-lg"
        />
      </div>

      <List<Friend>
        className="flex-1 overflow-y-auto"
        loading={loading}
        dataSource={filteredFriends}
        renderItem={(friend: Friend) => (
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
          emptyText: searchQuery ? 'Không tìm thấy bạn bè' : 'Chưa có bạn bè nào'
        }}
      />
    </div>
  );
};

export default ChatSidebar;