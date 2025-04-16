import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const GuestRoutes = () => {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      toast.info('You are already logged in!', { position: 'bottom-right' });
    }
  }, [user]);

  if (user) return <Navigate to='/' replace />;
  return <Outlet />;
};

export default GuestRoutes;
