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
import AdminClassManager from '../pages/admins/AdminClassManager';
import AddClassAdminClassManager from '../pages/admins/AddClassAdminClassManager';
import LayoutAdmin from '../components/layouts/LayoutAdmin';
import AdminStudentManager from '../pages/admins/AdminStudentManager';
import AdminEvent from '../pages/admins/AdminEvent';
import AdminDashboard from '../pages/admins/AdminDashboard';
import AdminTeacherManager from '../pages/admins/ManagerTeacher/AdminTeacherManager';
import AdminTeacherCreate from '../pages/admins/ManagerTeacher/AdminTeacherCreate';
import AdminSubjectManager from '../pages/admins/ManagerSubject/AdminSubjectManager';

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
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/class-manager" element={<AdminClassroom />} />
        <Route path="/admin/lop-hoc" element={<AdminClassManager />} />
        <Route path="/admin/class-manager/add" element={<AddClassAdminClassManager />} />
        <Route path="/admin/hoc-sinh" element={<AdminStudentManager />} />
        <Route path="/admin/su-kien" element={<AdminEvent />} />
        <Route path="/admin/giao-vien" element={<AdminTeacherManager />} />
        <Route path="/admin/giao-vien/them-moi" element={<AdminTeacherCreate />} />
        <Route path="/admin/mon-hoc" element={<AdminSubjectManager />} />

      </Route>
    </Routes>
  );
};

export default AppRouter;