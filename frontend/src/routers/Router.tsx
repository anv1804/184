import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { ROUTES } from '../config/routes';
import PrivateRoute from '../components/PrivateRoute';
import Loading from '../components/Loading';
import ErrorBoundary from '../components/ErrorBoundary';

const Router = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Routes>
          {ROUTES.map(({ path, component: Component, isPrivate, roles, title }) => (
            <Route
              key={path}
              path={path}
              element={
                isPrivate ? (
                  <PrivateRoute roles={roles}>
                    <Component />
                  </PrivateRoute>
                ) : (
                  <Component />
                )
              }
            />
          ))}

          {/* Default route */}
          <Route path="/" element={<Navigate to="/tro-chuyen" replace />} />
          
          {/* 404 route */}
          <Route path="*" element={<Navigate to="/tro-chuyen" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Router;