import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      message.success('Đăng nhập thành công!');
      navigate('/tro-chuyen'); // Chuyển hướng đến trang chat sau khi đăng nhập
    } catch (error) {
      message.error('Đăng nhập thất bại!');
    }
  };

  return (
    <Form
      name="login"
      onFinish={onFinish}
      layout="vertical"
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
      
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
      >
        <Input className="w-full" />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password className="w-full" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm; 