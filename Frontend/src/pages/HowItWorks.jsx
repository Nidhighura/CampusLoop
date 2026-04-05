import React from 'react';
import { FiSearch, FiMessageCircle, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Find What You Need',
      description: 'Browse through categories like Books, Electronics, and Furniture. Use the search bar to find specific items being sold by students on your campus.',
      icon: <FiSearch className="h-8 w-8 text-primary-600" />,
    },
    {
      id: 2,
      title: 'Connect Securely',
      description: 'Log in with your verified college (.edu.in) email to unlock seller contact details. Reach out to them directly via phone or email.',
      icon: <FiMessageCircle className="h-8 w-8 text-primary-600" />,
    },
    {
      id: 3,
      title: 'Meet & Transact',
      description: 'Decide on a safe meeting spot on campus (like the library or cafeteria), inspect the item, and finalize the payment in person.',
      icon: <FiCheckCircle className="h-8 w-8 text-primary-600" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          How CampusLoop Works
        </h2>
        <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
          The safest and easiest way to buy and sell items within your college community.
        </p>
      </div>

      <div className="mt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          {steps.map((step) => (
            <div key={step.id} className="text-center">
              <div className="flex items-center justify-center mx-auto h-20 w-20 rounded-full bg-primary-900/30 text-primary-400 border border-primary-800/50 mb-6 group hover:scale-105 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-4">
                {step.id}. {step.title}
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 bg-gray-900 rounded-2xl p-8 md:p-12 text-center border border-gray-800 shadow-xl shadow-black/20">
        <h3 className="text-2xl font-bold text-white mb-4">Ready to clear out your dorm room?</h3>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          List your unused books, calculators, and furniture in under 2 minutes and make some quick cash while helping a junior out!
        </p>
        <Link to="/sell" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-gray-900 bg-primary-500 hover:bg-primary-400 shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary-500">
          Start Selling Today
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;
