import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiPhone, FiBookOpen } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setShowOTP(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name,
        email,
        phoneNumber: phone,
        collegeName: college,
        password
      };
      const res = await api.post('/auth/signup', payload);
      if (res.data.success) {
        toast.success(res.data.message || 'OTP sent to email!');
        setShowOTP(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/verify-otp', { email, otp });
      if (res.data.success) {
        toast.success(res.data.message || 'OTP verified successfully! Please log in.');
        setShowOTP(false);
        setIsLogin(true); // Switch to login screen
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        const { token, user } = res.data.data;
        login(user, token);
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {isLogin ? 'Sign in to your account' : showOTP ? 'Verify your email' : 'Create your account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          {isLogin ? 'Or ' : showOTP ? 'Enter the unique OTP sent to your email ' : 'Or '}
          {!showOTP && (
            <button onClick={handleToggle} className="font-medium text-primary-500 hover:text-primary-400 focus:outline-none focus:underline transition duration-150 ease-in-out">
              {isLogin ? 'create a new account' : 'sign in to your existing account'}
            </button>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-800">
          {isLogin ? (
            /* --- LOGIN FORM --- */
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-500" />
                  </div>
                  <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-gray-950 text-white" placeholder="student@college.edu.in" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-500" />
                  </div>
                  <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-gray-950 text-white" placeholder="••••••••" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" type="checkbox" className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-700 rounded bg-gray-900" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">Remember me</label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-500 hover:text-primary-400">Forgot password?</a>
                </div>
              </div>

              <div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-primary-500 transition-colors disabled:opacity-50">
                  {loading ? 'Please wait...' : 'Sign in'}
                </button>
              </div>
            </form>
          ) : showOTP ? (
            /* --- OTP VERIFICATION FORM --- */
            <form className="space-y-6" onSubmit={handleOTPSubmit}>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-300 text-center mb-2">One-Time Password (OTP)</label>
                <div className="mt-1 flex justify-center">
                   <input 
                     id="otp" 
                     type="text" 
                     value={otp}
                     onChange={e => setOtp(e.target.value)}
                     required 
                     maxLength={6}
                     className="appearance-none block w-full max-w-[200px] text-center text-2xl tracking-widest px-3 py-2 border border-gray-700 rounded-md placeholder-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-gray-950 text-white" 
                     placeholder="000000" 
                   />
                </div>
                <p className="mt-2 text-xs text-center text-gray-500">Please check your college email inbox and spam folder.</p>
              </div>
              
              <div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-primary-500 transition-colors disabled:opacity-50">
                  {loading ? 'Verifying...' : 'Verify Email'}
                </button>
              </div>
            </form>
          ) : (
            /* --- SIGNUP FORM --- */
            <form className="space-y-6" onSubmit={handleSignupSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-500" />
                  </div>
                  <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-gray-950 text-white" placeholder="John Doe" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">College Email</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-500" />
                  </div>
                  <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-gray-950 text-white" placeholder="john.doe@college.edu.in" />
                </div>
                <p className="mt-1 text-xs text-green-500">A .edu.in email automatically gives you a verified badge!</p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-500" />
                  </div>
                  <input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-gray-950 text-white" placeholder="+91 9876543210" />
                </div>
              </div>

              <div>
                <label htmlFor="college" className="block text-sm font-medium text-gray-300">College Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiBookOpen className="text-gray-500" />
                  </div>
                  <input id="college" type="text" value={college} onChange={e => setCollege(e.target.value)} required className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-gray-950 text-white" placeholder="Bhopal Institute of Technology" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-500" />
                  </div>
                  <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-gray-950 text-white" placeholder="••••••••" />
                </div>
              </div>

              <div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-primary-500 transition-colors disabled:opacity-50">
                  {loading ? 'Sending OTP...' : 'Continue (Send OTP)'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
