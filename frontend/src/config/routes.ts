import { lazy } from 'react';

// Lazy load components
const Login = lazy(() => import('../pages/clients/Login'));
const Chat = lazy(() => import('../pages/Chat'));
const Profile = lazy(() => import('../pages/Profile'));

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<any>;
  roles?: string[];
  isPrivate: boolean;
  title: string;
}

export const ROUTES: RouteConfig[] = [
  {
    path: '/dang-nhap',
    component: Login,
    isPrivate: false,
    title: 'Đăng nhập'
  },
  {
    path: '/tro-chuyen',
    component: Chat,
    isPrivate: true,
    title: 'Trò chuyện'
  },
  {
    path: '/ho-so',
    component: Profile,
    isPrivate: true,
    title: 'Hồ sơ'
  }
]; 