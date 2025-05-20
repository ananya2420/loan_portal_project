import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Need a Loan?</h1>
        <p className="text-gray-600 mb-6">
          Fast, easy, and secure. Apply now and get a decision in minutes.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
        >
          Apply for Loan
        </Link>
      </div>
    </div>
  );
};

export default CTA;
