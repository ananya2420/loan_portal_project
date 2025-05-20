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
        <div className="absolute inset-0 flex flex-col justify-center items-center p-6 rounded-lg">
          <h1 className="text-4xl font-bold text-white text-center drop-shadow-lg">
            Welcome to Loan Application
          </h1>

          <p className="text-lg text-white text-center max-w-lg drop-shadow-md mt-4">
            Start your loan application process or review your application summary.
          </p>

          <button
            onClick={() => navigate('/apply')}
            className="mt-6 px-8 py-3 bg-blue-600 rounded hover:bg-blue-700 transition drop-shadow-md"
          >
            Start Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

