import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-primary-500 mb-4 tracking-tight">CampusLoop</h2>
            <p className="text-gray-400 max-w-sm mb-6">
              The trusted peer-to-peer network designed exclusively for college students to trade books, electronics, and essentials safely on campus.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors">
                <FiInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors">
                <FiTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors">
                <FiMail className="text-2xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-400 hover:text-gray-200 transition-colors">Browse Products</Link>
              </li>
              <li>
                <Link to="/sell" className="text-base text-gray-400 hover:text-gray-200 transition-colors">Sell an Item</Link>
              </li>
              <li>
                <Link to="/login" className="text-base text-gray-400 hover:text-gray-200 transition-colors">Login / Signup</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/how-it-works" className="text-base text-gray-400 hover:text-gray-200 transition-colors">How it Works</Link>
              </li>
              <li>
                <Link to="/community-guidelines" className="text-base text-gray-400 hover:text-gray-200 transition-colors">Community Guidelines</Link>
              </li>
              <li>
                <a href="mailto:support@campusloop.edu.in" className="text-base text-gray-400 hover:text-gray-200 transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-500 xl:text-center">
            &copy; {new Date().getFullYear()} CampusLoop, Inc. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
             <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
             <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
