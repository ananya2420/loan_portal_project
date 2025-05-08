//pages and routes

//Home component- redirect to- Apply page

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/apply');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to the Loan Portal
        </h1>
        <p className="text-gray-600 mb-6">
          Basic homepage with a call-to-action to apply for a loan.
        </p>
        <button
          onClick={handleApplyClick}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Apply for Loan
        </button>
      </div>
    </div>
  );
};

export default Home;
