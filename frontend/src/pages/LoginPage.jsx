import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../redux/userApiSlice';

const LoginPage = () => {
  const [isShowPW, setIsShowPW] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(state => state.user);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(logIn(formData));
    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  return (
    <div className='p-2 flex flex-col gap-6 w-full sm:w-[500px] sm:mx-auto'>
      <motion.h1 className='com-heading' initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        Welcome back
      </motion.h1>

      <motion.form className='bg-gray-900 px-4 py-6 rounded-md' onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>

        <div className="mb-7">
          <label className='font-semibold text-xl mb-2'>Email Address</label>
          <div className="bg-gray-600 flex gap-1.5 py-2 px-4 rounded-md">
            <Mail className='h-5 w-5 text-gray-400' />
            <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' className='w-full outline-none border-none' required />
          </div>
        </div>

        <div className="mb-7">
          <label className='font-semibold text-xl mb-2'>Password</label>
          <div className="bg-gray-600 flex gap-1.5 py-2 px-4 rounded-md">
            <Lock className='h-5 w-5 text-gray-400' />
            <input type={isShowPW ? "text" : "password"} name='password' value={formData.password} onChange={handleChange} placeholder='Enter your Password' className='w-full outline-none border-none' required />
            <span onClick={() => setIsShowPW(!isShowPW)} className='cursor-pointer'>{isShowPW ? <EyeOff /> : <Eye />}</span>
          </div>
        </div>

        <button className='w-full flex items-center justify-center gap-3 p-2 rounded-md bg-green-400 border-2 border-white' type='submit'>
          {isLoading ? 'Logging in...' : <><UserPlus /> Login</>}
        </button>

        <p className="text-[17px] text-gray-400 font-semibold flex justify-center gap-1 mt-4">
          Not a member? <Link to={'/signup'} className='flex gap-1 items-center font-bold text-green-700'>Sign up now <ArrowRight /></Link>
        </p>
      </motion.form>
    </div>
  );
};

export default LoginPage;
