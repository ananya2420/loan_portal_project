import React from 'react';
import { useNavigate } from 'react-router-dom';
import loan from '../assets/loan.png';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="relative max-w-3xl w-full rounded-lg overflow-hidden shadow-lg">
        {/* The image */}
        <img src={loan} alt="Loan Illustration" className="w-full h-auto object-cover" />

        {/* Overlay container with light background behind text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-6 bg-white bg-opacity-70">
          <h1 className="text-4xl font-bold text-black text-center">
            Welcome to Loan Application
          </h1>

          <p className="text-lg text-black text-center max-w-lg mt-4">
            Start your loan application process or review your application summary.
          </p>

          <button
            onClick={() => navigate('/apply')}
            className="mt-6 px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Start Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

