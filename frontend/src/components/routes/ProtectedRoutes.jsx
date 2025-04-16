import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom'
import { toast } from 'react-toastify';

const ProtectedRoutes = () => {
    const { user } = useSelector(state => state.user);

    useEffect(() => {
      if (!user) {
        toast.warning('You must be logged in to access this page.', {
          position: 'bottom-right',
        });
      }
    }, [user]);

  return (
    <>
    {user ? <Outlet/> : <Navigate to='/' replace />}
    </>
  )
}

export default ProtectedRoutes