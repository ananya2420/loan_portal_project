import React from 'react';
import { useNavigate } from 'react-router-dom';
import loan from '../assets/loan.png';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 text-black">
      <div className="w-full max-w-md">
        <div className="shadow-lg rounded-lg p-8 bg-white space-y-6 transition-all duration-300">
          <div className="relative flex justify-center">
            <img src={loan} alt="Loan Illustration" className="w-32 h-32 object-contain" />
            
            {/* Overlay content inside the image */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
              <h1 className="text-lg font-bold text-white drop-shadow">Welcome to Loan Application</h1>
              <p className="text-sm text-white mt-1 drop-shadow">
                Start your loan application process or review your application summary.
              </p>
              <button
                onClick={() => navigate('/apply')}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
              >
                Start Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
