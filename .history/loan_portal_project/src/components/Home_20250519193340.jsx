import React from 'react';
import { useNavigate } from 'react-router-dom';
import loan from '../assets/loan.png';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6 space-y-8">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center">Welcome to Loan Application</h1>

      {/* Description */}
      <p className="text-lg text-center max-w-md">
        Start your loan application process or review your application summary.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate('/apply')}
        className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Start Application
      </button>

      <div>
        <img src={loan} alt="Loan Illustration" className="max-w-xs mx-auto" />
      </div>
    </div>
  );
};

export default Homepage;
