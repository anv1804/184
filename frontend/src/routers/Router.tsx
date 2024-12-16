import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from '../pages/clients/Dashboard'
import Message from '../pages/clients/Message'
import LayoutClinet from '../components/layouts/LayoutClinet'
import OnlineClassroom from '../pages/clients/OnlineClassroom'
import Wallet from '../pages/clients/Wallet'
import Classroom from '../pages/clients/Classroom'
import ClassroomDetail from '../pages/clients/ClassroomDetail'
import StudentForm from '../pages/clients/StudentForm'
import Register from '../pages/clients/Register'
import LoginPage from '../pages/clients/Login'
import AdminClassroom from '../pages/admins/AdminClassroom'
import Profile from '../pages/clients/Profile'
import PhotoDetail from '../pages/clients/PhotoDetail'
import ChatLayout from '../components/Chat/ChatLayout'

const Router = () => {
    return (
        <Routes>
            <Route path="/dang-nhap" element={<LoginPage />} />
            <Route 
                path="/tro-chuyen" 
                element={
                    <PrivateRoute>
                        <ChatLayout />
                    </PrivateRoute>
                } 
            />
            <Route path='/' element={<LayoutClinet />}>
                <Route path="/lich-trinh" element={<Dashboard />} />
                <Route path="/phong-hoc" element={<OnlineClassroom />} />
                <Route path="/vi" element={<Wallet />} />
                <Route path="/trang-ca-nhan/:id" element={<Profile />} />
                <Route path="/lop-hoc" element={<Classroom />} />
                <Route path="/lop-hoc/:id" element={<ClassroomDetail />} />
            </Route>
            <Route path="/bat-dau" element={<StudentForm />} />
            <Route path="/dang-ky" element={<Register />} />
            <Route path="/anh/:id" element={<PhotoDetail />} />
            <Route path="/admin/lop-hoc" element={<AdminClassroom />} />
        </Routes>
    );
};

export default Router;