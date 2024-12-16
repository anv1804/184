import { Button, Dropdown, Menu, Modal, Input, message } from 'antd';
import { DeleteOutlined, EditOutlined, UndoOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Message, MessageAction } from '../../types/chat';

interface Props {
  message: Message;
  currentUserId: string;
  onRecall: (messageId: string) => void;
  onDelete: (messageId: string) => void;
  onEdit: (messageId: string, newContent: string) => void;
}

const MessageActions: React.FC<Props> = ({ message, currentUserId, onRecall, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const [showInfo, setShowInfo] = useState(false);

  const isOwnMessage = message.sender._id === currentUserId;
  const canEdit = isOwnMessage && 
    (new Date().getTime() - new Date(message.timestamp).getTime()) <= 180000; // 3 minutes

  const actions: MessageAction[] = [
    {
      icon: <UndoOutlined />,
      label: 'Thu hồi',
      onClick: () => onRecall(message._id),
      show: isOwnMessage && !message.isRecalled
    },
    {
      icon: <DeleteOutlined />,
      label: 'Xóa',
      onClick: () => onDelete(message._id),
      show: true
    },
    {
      icon: <EditOutlined />,
      label: 'Sửa',
      onClick: () => setIsEditing(true),
      show: canEdit && !message.isRecalled
    },
    {
      icon: <InfoCircleOutlined />,
      label: 'Thông tin',
      onClick: () => setShowInfo(true),
      show: true
    }
  ];

  const handleEdit = () => {
    if (editContent.trim() !== message.content) {
      onEdit(message._id, editContent);
    }
    setIsEditing(false);
  };

  return (
    <>
      <Dropdown
        overlay={
          <Menu>
            {actions
              .filter(action => action.show)
              .map(action => (
                <Menu.Item key={action.label} onClick={action.onClick}>
                  {action.icon} {action.label}
                </Menu.Item>
              ))}
          </Menu>
        }
        trigger={['hover']}
      >
        <div className="message-content">{message.content}</div>
      </Dropdown>

      <Modal
        title="Sửa tin nhắn"
        visible={isEditing}
        onOk={handleEdit}
        onCancel={() => setIsEditing(false)}
      >
        <Input.TextArea
          value={editContent}
          onChange={e => setEditContent(e.target.value)}
          autoSize={{ minRows: 2 }}
        />
      </Modal>

      <Modal
        title="Thông tin tin nhắn"
        visible={showInfo}
        onOk={() => setShowInfo(false)}
        onCancel={() => setShowInfo(false)}
      >
        <p>Người gửi: {message.sender.name}</p>
        <p>Thời gian: {new Date(message.timestamp).toLocaleString()}</p>
        {message.editHistory && (
          <>
            <p>Số lần chỉnh sửa: {message.editHistory.length}</p>
            <div>
              Lịch sử chỉnh sửa:
              {message.editHistory.map((edit, index) => (
                <div key={index} className="text-sm text-gray-500">
                  {new Date(edit.editedAt).toLocaleString()}: {edit.content}
                </div>
              ))}
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default MessageActions; 