import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/services/authServices'; 
import AuthLayout from '../../layouts/AuthLayout';
import logo from '../../assets/icons/logo.png';
import type { AppDispatch } from '../../store/index';
import {toast} from 'react-toastify'

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); 

  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(registerUser(credentials)).unwrap();
      if (result && 'message' in result && 'userCreated' in result) {
         toast.success("Onboarded SuccessFully!!")
        navigate('/');
      } else {
        toast.error("Onboarding Failed")
        throw new Error('Invalid response structure');
      }
    } catch (err: any) {
      toast.error(`${err.message || err}`);
      console.log("Error inregister")
    }
  };

  return (
    <AuthLayout>
      <div className="w-[460px] min-h-[550px] bg-white flex flex-col items-start justify-start p-4 rounded-lg mt-4">
        <div className="my-8">
          <img src={logo} alt="Logo" className="w-[100px] h-[100px]" />
        </div>
        <h4 className="text-2xl text-[#3D445C] font-bold font-poppins mb-6 text-center">Register With Us</h4>
        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <div className="my-4">
            <label className="block text-sm font-normal font-poppins text-[#3D445C] mb-1">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder="Enter your Username"
              className="w-full border rounded px-2 py-3 bg-white text-[#2A2A2A] placeholder-[#A3AAC2] font-poppins focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="my-4">
            <label className="block text-sm font-normal font-poppins text-[#3D445C] mb-1">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
          <p className="text-[#525B7A] font-poppins font-normal text-sm mt-1">
            Already have an account?{' '}
            <a onClick={() => navigate('/')} className="text-[#5B80F7] font-normal font-poppins hover:underline cursor-pointer">
              Login here
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;