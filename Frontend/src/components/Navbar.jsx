import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiUser, FiPlusCircle, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentSearch = new URLSearchParams(location.search).get('query') || '';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-950 border-b border-gray-800 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-500 tracking-tight">
              CampusLoop
            </Link>
          </div>

          {/* Search Bar (Hidden on Mobile) */}
          <div className="hidden md:flex flex-1 mx-8">
            <SearchBar
              initialValue={currentSearch}
              className="w-full max-w-xl"
              compact
              placeholder="Search for books, electronics, notes..."
              inputClassName="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              buttonClassName="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-950"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/sell" className="hidden sm:flex items-center space-x-1 text-gray-300 hover:text-primary-400 font-medium font-sans transition-colors duration-200">
              <FiPlusCircle className="text-lg" />
              <span>Sell Item</span>
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                 <Link to="/my-products" className="text-gray-300 hover:text-primary-400 font-medium hidden sm:block">My Products</Link>
                 <Link to="/profile" className="flex items-center space-x-1 text-gray-300 hover:text-primary-400 font-medium transition-colors" title="My Profile">
                   <FiUser className="text-xl" />
                   <span className="hidden md:block">Profile</span>
                 </Link>
                 <button onClick={handleLogout} className="flex items-center space-x-1 text-gray-300 hover:text-red-500 focus:outline-none transition-colors" title="Logout">
                  <FiLogOut className="text-xl" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-primary-500 transition-colors duration-200">
                Log In
              </Link>
            )}
          </div>
          
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <SearchBar
          initialValue={currentSearch}
          compact
          placeholder="Search..."
          inputClassName="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          buttonClassName="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:ring-offset-gray-950"
        />
      </div>
    </header>
  );
};

export default Navbar;
