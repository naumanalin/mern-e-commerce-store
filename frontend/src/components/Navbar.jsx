import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/userApiSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user } = useSelector(state => state.user);
  const { carts } = useSelector(state => state.cart)
  const dispatch = useDispatch();

  const handleLogOut = ()=>{
      const res =  dispatch(logOut())
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/');
        toast.success('Logout successfully',{position:'bottom-right'})
      }
  }
  return (
	<header className='fixed z-50 w-full py-0 px-2 bg-gray-800 border-b-[1px] border-green-500'>
    <nav className='container py-2 mx-auto flex items-center justify-between '>
    <Link to='/' className='logo'>E-Commerce</Link>
    <ul className='flex items-center justify-between gap-1.5 text-xl'>
      <NavLink to={'/'} className={'p-2 px-4 rounded-md'}> Home </NavLink>
      {user? (<>
      <NavLink to='/cart' className={'relative pr-8 flex gap-2 items-center p-2 px-4 rounded-md bg-gray-500'}>
        <ShoppingCart className='inline-block mr-1 group-hover:text-emerald-400' size={18} />
        <p className='hidden sm:inline'>Cart</p>
        <span className='absolute top-1 right-1 px-2 text-sm rounded-full bg-emerald-400'>
        {carts && carts.length}
        </span>
      </NavLink>
      {user?.role==="admin"?
      <NavLink to={'/dashboard'} className={'flex gap-2 items-center p-2 px-4 rounded-md bg-gray-500'}> <Lock size={18} /> Dashboar </NavLink>
       :''}
      <button onClick={handleLogOut} className={'flex gap-2 items-center p-2 px-4 rounded-md bg-gray-500 cursor-pointer'}> <LogOut size={18} /> Logout </button>

      </>):
      (<>
      <NavLink to={'/signup'} className={'flex gap-2 items-center p-2 px-4 rounded-md bg-green-400'}> <UserPlus size={18} /> Sign Up </NavLink>
      <NavLink to={'/login'} className={'flex gap-2 items-center p-2 px-4 rounded-md bg-gray-500'}> <LogIn size={18} /> login </NavLink>
      </>) }
    </ul>
    </nav>
  </header>
  )
}

export default Navbar