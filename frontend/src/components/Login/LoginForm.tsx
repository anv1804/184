import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      message.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      message.error('Đăng nhập thất bại!');
    }
  };

  return (
    <Form
      name="login"
      onFinish={onFinish}
      layout="vertical"
      className="mt-8"
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
      >
        <Input 
          placeholder="Email" 
          className="w-full px-4 py-3 mt-2 text-black bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password 
          placeholder="Mật khẩu"
          className="w-full px-4 py-3 mt-2 text-black bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
        />
      </Form.Item>

      <div className="flex items-center justify-between mt-4">
        <a href="/" className="text-sm text-blue-600 hover:underline">
          Quên mật khẩu?
        </a>
      </div>

      <Form.Item className="mt-8">
        <Button 
          type="primary" 
          htmlType="submit"
          className="w-full px-4 py-6 text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none flex items-center justify-center text-base font-medium"
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
