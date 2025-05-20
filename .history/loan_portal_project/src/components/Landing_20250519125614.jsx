// src/components/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';



const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Need a Loan?</h1>
        <p className="text-gray-600 text-lg mb-6">
          Fast, easy, and secure. Apply now and get a decision in minutes.
        </p>
        <img src="" alt="" />
        <Link
          to="/home"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
        >
          Apply for a Loan
        </Link>
      </div>
    </div>
  );
};

export default Landing;
