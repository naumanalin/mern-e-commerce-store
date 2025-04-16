import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';


import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";

import Navbar from "./components/Navbar";
import ProtectedRoutes from './components/routes/ProtectedRoutes';
import GuestRoutes from './components/routes/GuestRoutes';
import AdminProtectedRoutes from './components/routes/AdminProtectedRoutes';
import Test from './components/test';
import Page404 from './pages/Page404';
import CartPage from './pages/CartPage';

function App() {

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">

      {/* Gradient Back-Ground */}
      <div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>

      <div id="our-main-content" className="relative"> {/* relative to place on top */}
      <Navbar/>
      <main className='container mx-auto pt-[70px] min-h-screen'>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/category/:category' element={<CategoryPage/>} />

          <Route element={<GuestRoutes/>}>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/signup' element={<SignUpPage/>} />
          </Route>

          <Route element={<ProtectedRoutes/>} >
            <Route path='/test' element={<Test/>} />
            <Route path='/cart' element={<CartPage/>} />

          </Route>

          <Route element={<AdminProtectedRoutes/>}>
            <Route path='/dashboard' element={<AdminPage/>} />
          </Route>

          <Route path='*' element={<Page404/>} />
        </Routes>
      </main>
      </div>
      <ToastContainer/> 
    </div>
  )
}

export default App
