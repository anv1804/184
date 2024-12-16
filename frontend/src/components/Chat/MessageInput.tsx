import React from 'react';
import { Input, Button, Upload } from 'antd';
import { SendOutlined, FileImageOutlined } from '@ant-design/icons';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onFileUpload: (file: File) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const MessageInput: React.FC<Props> = ({
  value,
  onChange,
  onSend,
  onFileUpload,
  onFocus,
  onBlur
}) => {
  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleFileChange = (info: any) => {
    if (info.file.status === 'done') {
      onFileUpload(info.file.originFileObj);
    }
  };

  return (
    <div className="flex items-center space-x-2 p-4 border-t">
      <Upload
        showUploadList={false}
        customRequest={({ file, onSuccess }: any) => {
          onSuccess();
        }}
        onChange={handleFileChange}
      >
        <Button icon={<FileImageOutlined />} />
      </Upload>

      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        onPressEnter={handlePressEnter}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Nhập tin nhắn..."
        className="flex-1"
      />

      <Button
        type="primary"
        icon={<SendOutlined />}
        onClick={onSend}
        disabled={!value.trim()}
      />
    </div>
  );
};

export default MessageInput; 