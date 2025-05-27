import React from 'react';
import { useNavigate } from 'react-router-dom';
import loan from '../assets/loan.png';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 text-black">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-8 space-y-6 transition-all duration-300">
          <div className="flex justify-center">
            <img
              src={loan}
              alt="Loan Illustration"
              className="w-32 h-32 object-contain"
            />
          </div>

          <h1 className="text-3xl font-bold text-center">
            Welcome to Loan Application
          </h1>

          <p className="text-center text-gray-700 text-base">
            Start your loan application process or review your application summary.
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => navigate('/apply')}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Start Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
