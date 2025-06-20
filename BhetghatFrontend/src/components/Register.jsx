import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import logo from '../assets/logoh.png';

const Register = () => {
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const passwordsMatch = password === confirmPassword && password?.length >= 8;

  const showToast = (msg, type = "success") => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const onSubmit = async (data) => {
    if (!data.terms) {
      showToast("Please accept the terms and conditions", "error");
      return;
    }

    if (data.password !== data.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/auth/register", data);
      localStorage.setItem("email", data.email);
      showToast("Registration successful! Check your email.", "success");
      setIsSubmitted(true);
    } catch (error) {
      showToast(error.response?.data?.message || "Registration failed", "error");
    }
  };

  return (
    <div className='flex justify-center items-center bg-gray-50 py-10'>
      {/* Toast */}
      {toast.show && (
        <div className={`fixed top-5 right-5 px-6 py-3 rounded shadow-lg text-white transition-all duration-300 ease-in-out z-50
        ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {toast.message}
        </div>
      )}

      <div className='w-full max-w-md bg-white shadow-lg rounded-2xl px-10 pt-10 pb-8'>
        {/* Logo */}
        <div className='flex justify-center mb-6'>
          <img src={logo} alt="Bhetghat Logo" className='h-10' />
        </div>

        {/* Title */}
        <h2 className='text-2xl font-bold text-center mb-1'>Create Your Account</h2>
        <p className='text-center text-sm text-gray-500 mb-6'>Join Bhetghat and start connecting!</p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Full Name */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input {...register("bio")} type="text" id="bio" placeholder="Full Name"
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input {...register("username", { required: true })} type="text" id="username" placeholder="Username"
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
            {errors.username && <p className="text-red-500 text-xs mt-1">Username is required</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input {...register("email", { required: true })} type="email" id="email" placeholder="you@email.com"
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
            {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input {...register("password", { required: true, minLength: 8 })}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className='w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <div
              className="absolute top-9 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">Password must be at least 8 characters</p>}
          </div>

          {/* Confirm Password */}
<div className="relative">
  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
  <input
    {...register("confirmPassword", {
      required: true,
      validate: value => value === password || "Passwords do not match"
    })}
    type={showConfirmPassword ? "text" : "password"}
    id="confirmPassword"
    placeholder="Confirm Password"
    className='w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
  />
  <div
    className="absolute top-9 right-3 cursor-pointer text-gray-500"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
  </div>

  {errors.confirmPassword && (
    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message || "Confirm your password"}</p>
  )}
</div>

          {/* Terms and Conditions */}
          <div className='flex items-center space-x-2 text-sm'>
            <input type="checkbox" {...register("terms", { required: true })} />
            <label>I agree to the <Link className='text-blue-600 font-medium hover:underline' to='/faq'>terms & conditions</Link></label>
          </div>
          {errors.terms && <p className="text-red-500 text-xs mt-1">You must accept the terms and conditions</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition'
          >
            {isSubmitted ? 'Check Your Email' : 'Register'}
          </button>
        </form>

        {/* Footer Link */}
        <p className='mt-6 text-center text-sm text-gray-600'>
          Already have an account? <Link to='/login' className='text-blue-600 font-medium hover:underline'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
