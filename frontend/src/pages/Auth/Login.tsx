import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/services/authServices';
import { setCredentials } from '../../store/slices/authSlices';
import AuthLayout from '../../layouts/AuthLayout';
import logo from '../../assets/icons/logo.png';
import type { RootState, AppDispatch } from '../../store';
import {toast} from 'react-toastify'

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [formCredentials, setFormCredentials] = useState({ username: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(formCredentials)).unwrap();
      if (result && 'user' in result && 'accessToken' in result && 'refreshToken' in result) {
        dispatch(setCredentials({ user: result.user, accessToken: result.accessToken, refreshToken: result.refreshToken }));
        toast.success("User Logged In!!")
        navigate('/dashboard');
      } else {
        toast.error("User Logged In Failed")
        throw new Error('Invalid response structure');
      }
    } catch (err: any) {
      console.error('Login failed:', err.message || err);
    }
  };

  if (isAuthenticated) navigate('/dashboard');

  return (
    <AuthLayout>
      <div className="w-[460px] min-h-[550px] bg-white flex flex-col items-start justify-start p-4 rounded-lg mt-4">
        <div className="my-8">
          <img src={logo} alt="Logo" className="w-[100px] h-[100px]" />
        </div>
        <h4 className="text-2xl text-[#3D445C] font-bold font-poppins mb-6 text-center">Login to your account</h4>
        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <div className="my-4">
            <label className="block text-sm font-normal font-poppins text-[#3D445C] mb-1">Username</label>
            <input
              type="text"
              value={formCredentials.username}
              onChange={(e) => setFormCredentials({ ...formCredentials, username: e.target.value })}
              placeholder="Enter your Username"
              className="w-full border rounded px-2 py-3 bg-white text-[#2A2A2A] placeholder-[#A3AAC2] font-poppins focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="my-4">
            <label className="block text-sm font-normal font-poppins text-[#3D445C] mb-1">Password</label>
            <input
              type="password"
              value={formCredentials.password}
              onChange={(e) => setFormCredentials({ ...formCredentials, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full border rounded px-2 py-3 bg-white text-[#2A2A2A] placeholder-[#A3AAC2] font-light font-poppins focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1F222E] text-white py-2.5 rounded font-medium font-poppins text-base mt-6 focus:outline-none"
          >
            Proceed
          </button>
        </form>
        <div className="w-full text-center mt-8">
          <span className="text-gray-500 text-sm">New to Our Task Management App? </span>
          <a onClick={() => navigate('/register')} className="text-blue-600 font-medium hover:underline text-sm cursor-pointer">
            Get Started
          </a>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;