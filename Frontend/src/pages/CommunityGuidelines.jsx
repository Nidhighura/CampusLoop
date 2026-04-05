import React from 'react';
import { FiShield, FiUsers, FiAlertTriangle, FiThumbsUp } from 'react-icons/fi';

const CommunityGuidelines = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
         <div className="mx-auto h-16 w-16 bg-primary-900/30 text-primary-400 rounded-full flex items-center justify-center mb-4 border border-primary-800/50">
           <FiUsers className="h-8 w-8" />
         </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Community Guidelines</h1>
        <p className="mt-4 text-xl text-gray-400">
          We want CampusLoop to be a safe, trusting, and helpful environment for all students.
        </p>
      </div>

      <div className="space-y-12">
        
        {/* Guideline 1 */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-800 flex flex-col md:flex-row gap-6 hover:border-gray-700 transition-colors">
          <div className="flex-shrink-0">
             <div className="h-12 w-12 bg-green-900/30 text-green-400 border border-green-800/50 rounded-xl flex items-center justify-center">
               <FiShield className="h-6 w-6" />
             </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">1. Safety First (Meet on Campus)</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Always arrange to meet buyers or sellers in public, well-lit areas on your college campus. The library, student union, cafeteria, or front gates are standard spots. Never go to an unfamiliar or secluded location.
            </p>
          </div>
        </div>

        {/* Guideline 2 */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-800 flex flex-col md:flex-row gap-6 hover:border-gray-700 transition-colors">
          <div className="flex-shrink-0">
             <div className="h-12 w-12 bg-blue-900/30 text-blue-400 border border-blue-800/50 rounded-xl flex items-center justify-center">
               <FiThumbsUp className="h-6 w-6" />
             </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">2. Be Honest About Item Condition</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              When selling an item, please accurately describe its condition. If a textbook has highlighted pages, or a calculator has a scratch, mention it. Transparency builds trust within the community.
            </p>
          </div>
        </div>

        {/* Guideline 3 */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-800 flex flex-col md:flex-row gap-6 hover:border-gray-700 transition-colors">
          <div className="flex-shrink-0">
             <div className="h-12 w-12 bg-orange-900/30 text-orange-400 border border-orange-800/50 rounded-xl flex items-center justify-center">
               <FiAlertTriangle className="h-6 w-6" />
             </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">3. No Illegal or Prohibited Items</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              CampusLoop is strictly for educational items, dorm furniture, electronics, and standard student essentials. The sale of weapons, illegal substances, counterfeits, explicit materials, or stolen property is grounds for an immediate and permanent ban.
            </p>
          </div>
        </div>

        {/* Guideline 4 */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-800 flex flex-col md:flex-row gap-6 hover:border-gray-700 transition-colors">
          <div className="flex-shrink-0">
             <div className="h-12 w-12 bg-purple-900/30 text-purple-400 border border-purple-800/50 rounded-xl flex items-center justify-center">
               <FiUsers className="h-6 w-6" />
             </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">4. Verify Before You Pay</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Transactions are handled offline. Do not send UPI payments or wire money to individuals before seeing the item in person. We recommend exchanging cash or UPI only when you have physically inspected the product.
            </p>
          </div>
        </div>

      </div>
      
      <div className="mt-16 text-center border-t border-gray-800 pt-8">
        <p className="text-gray-500">
           By using the platform you agree to adhere to these rules. Failure to comply may result in account suspension.
        </p>
      </div>

    </div>
  );
};

export default CommunityGuidelines;
