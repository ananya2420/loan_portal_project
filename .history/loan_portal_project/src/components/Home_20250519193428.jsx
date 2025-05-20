import React from 'react';
import { useNavigate } from 'react-router-dom';
import loan from '../assets/loan.png';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="relative max-w-3xl w-full">
        {/* The image */}
        <img src={loan} alt="Loan Illustration" className="w-full rounded-lg shadow-lg" />

        {/* Overlay container */}
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-6 rounded-lg space-y-6">
          <h1 className="text-4xl font-bold text-center">
            Welcome to Loan Application
          </h1>

          <p className="text-lg text-center max-w-lg">
            Start your loan application process or review your application summary.
          </p>

          <button
            onClick={() => navigate('/apply')}
            className="px-8 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Start Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
