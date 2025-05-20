// src/components/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import loan from '../assets/loan.png';

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="relative max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
        <img src={loan} alt="uploaded" className="w-full h-auto object-cover" />
        
        {/* Overlay content */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Need a Loan?</h1>
          <p className="text-lg mb-6">
            Fast, easy, and secure. Apply now and get a decision in minutes.
          </p>
          <Link
            to="/home"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
          >
            Apply for a Loan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;

