import React from 'react';
import { Input, Button, Upload } from 'antd';
import { SendOutlined, FileImageOutlined } from '@ant-design/icons';
import IconImage from '../icons/IconImage';
import IconCamera from '../icons/iconCamera';

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

      <div className=" w-full">
        <div className="relative flex px:2 sm:px-4">
          <span className="absolute inset-y-0 flex items-center z-100">
            <button
              type="button"
              className="z-[100] inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 15.5C14.21 15.5 16 13.71 16 11.5V6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6V11.5C8 13.71 9.79 15.5 12 15.5Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.3501 9.6499V11.3499C4.3501 15.5699 7.7801 18.9999 12.0001 18.9999C16.2201 18.9999 19.6501 15.5699 19.6501 11.3499V9.6499"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6101 6.43012C11.5101 6.10012 12.4901 6.10012 13.3901 6.43012"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.2 8.55007C11.73 8.41007 12.28 8.41007 12.81 8.55007"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 19V22"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </span>
          <Input
            value={value}
            onChange={e => onChange(e.target.value)}
            onPressEnter={handlePressEnter}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="Nhập tin nhắn..."
            className="flex-1 w-full focus:outline-none focus:placeholder-gray-200 text-gray-600 placeholder-gray-400 pl-12 bg-gray-200 rounded-lg py-2 border-[1px] border-[#bebebe]"
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex px:2 sm:px-4">
            <Upload
              showUploadList={false}
              customRequest={({ file, onSuccess }: any) => {
                onSuccess();
              }}
              onChange={handleFileChange}
            >
              <Button className='inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none' icon={<IconImage/>} />
            </Upload>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <IconCamera />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <Button
              type="primary"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              }
              onClick={onSend}
              disabled={!value.trim()}
              className='border-none bg-transparent inline-flex items-center justify-center rounded-lg px-2 py-2 mr-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput; 