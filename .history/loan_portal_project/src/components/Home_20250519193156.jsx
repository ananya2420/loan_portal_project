import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8">Welcome to Loan Application</h1>

      <p className="mb-6 text-lg text-center max-w-md">
        Start your loan application process or review your application summary.
      </p>

      <div className="space-x-4">
        <button
          onClick={() => navigate('/apply')}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Start Application
        </button>

        <div>
          im
        </div>
      </div>
    </div>
  );
};

export default Homepage;
