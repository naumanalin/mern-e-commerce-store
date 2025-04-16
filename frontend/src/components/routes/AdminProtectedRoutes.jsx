import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminProtectedRoutes = () => {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error('Only admins can access this page.', {
        position: 'bottom-right',
      });
    }
  }, [user]);

  if (!user || user.role !== 'admin') return <Navigate to='/' replace />;
  return <Outlet />;
};

export default AdminProtectedRoutes;
