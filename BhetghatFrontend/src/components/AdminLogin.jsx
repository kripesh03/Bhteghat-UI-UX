import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import getBaseUrl from '../utils/baseURL';

import logo from '../assets/logoh.png';
import Navbar from '../components/Navbar'; // ✅ adjust path if needed
import Footer from '../components/Footer'; // ✅ adjust path if needed

const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const showToast = (msg, type = "success") => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type });
    }, 3000);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/api/admin/admin`, data, {
        headers: { 'Content-Type': 'application/json' }
      });

      const auth = response.data;

      if (auth.token) {
        localStorage.setItem('token', auth.token);

        setTimeout(() => {
          localStorage.removeItem('token');
          showToast("Token has expired! Please login again.", "error");
          navigate("/");
        }, 3600 * 1000);

        showToast("Admin Login successful!", "success");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      setMessage("Please provide a valid username and password");
      showToast("Login failed. Invalid credentials.", "error");
      console.error(error);
    }
  };

  return (
    <>

      <div className='min-h-screen flex justify-center items-center bg-gray-50'>

        {/* Toast Notification */}
        {toast.show && (
          <div className={`fixed top-5 right-5 px-6 py-3 rounded shadow-lg text-white z-50
            ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {toast.message}
          </div>
        )}

        <div className='w-full max-w-md mx-auto bg-white shadow-lg rounded-2xl px-10 pt-10 pb-8'>

          {/* Logo */}
          <div className='flex justify-center mb-6'>
            <img src={logo} alt="Bhetghat Logo" className='h-10' />
          </div>

          {/* Heading */}
          <h2 className='text-2xl text-center font-bold mb-1'>Sign in as a Organizer</h2>
          <p className='text-center text-sm text-gray-500 mb-6'>
            Welcome back! Please login to your account and start posting your events.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <label className='block text-gray-700 text-sm font-medium mb-1' htmlFor="username">Username</label>
              <input
                {...register("username", { required: true })}
                type="text"
                name="username"
                id="username"
                placeholder='Your Username'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              {errors.username && <p className="text-red-500 text-xs italic mt-1">Username is required</p>}
            </div>

            {/* Password */}
            <div>
              <label className='block text-gray-700 text-sm font-medium mb-1' htmlFor="password">Password</label>
              <input
                {...register("password", { required: true })}
                type="password"
                name="password"
                id="password"
                placeholder='Password'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              {errors.password && <p className="text-red-500 text-xs italic mt-1">Password is required</p>}
            </div>

            {/* Error Message */}
            {message && <p className='text-red-500 text-xs italic'>{message}</p>}

            {/* Submit */}
            <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition'>
              Login
            </button>
          </form>

          {/* Links */}
          <div className="flex justify-between mt-5 text-sm text-blue-600 font-medium">
            <a href="#" className='hover:underline'>Create an account</a>
            <a href="#" className='hover:underline'>Forgot password?</a>
          </div>

          <p className='mt-6 text-center text-gray-400 text-xs'>©2025 Bhetghat. All rights reserved.</p>
        </div>
      </div>

    </>
  );
};

export default AdminLogin;
