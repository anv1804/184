import { Routes, Route } from 'react-router-dom';
import Profile from '../pages/Profile';
import Classroom from '../pages/clients/Classroom';
import LayoutClient from '../components/layouts/LayoutClinet';
import Dashboard from '../pages/clients/Dashboard';
import OnlineClassroom from '../pages/clients/OnlineClassroom';
import Wallet from '../pages/clients/Wallet';
import ClassroomDetail from '../pages/clients/ClassroomDetail';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import AdminClassroom from '../pages/admins/AdminClassroom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutClient />}>
        <Route path="classroom" element={<Classroom />} />
        <Route path="/lich-trinh" element={<Dashboard />} />
        <Route path="/phong-hoc" element={<OnlineClassroom />} />
        <Route path="/vi" element={<Wallet />} />
        <Route path="/trang-ca-nhan/:id" element={<Profile />} />
        <Route path="/lop-hoc" element={<Classroom />} />
        <Route path="/lop-hoc/:id" element={<ClassroomDetail />} />
      </Route>
      <Route path="/tro-chuyen" element={<Chat />} />
      <Route path="/dang-nhap" element={<Login />} />
      <Route path="/admin/lop-hoc" element={<AdminClassroom />} />
    </Routes>
  );
};

export default AppRouter;