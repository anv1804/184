import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Suspense } from 'react';
import Loading from '../components/Loading';

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Show loading while checking auth


  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
  }

  // Check role authorization
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Wrap children in Suspense for lazy loading
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default PrivateRoute; 