import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PortfolioPage = () => {
  const navigate = useNavigate();
  const portfolio = useSelector((state) => state.portfolio);

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Portfolio Page
        </h1>

        {portfolio && Object.keys(portfolio).length > 0 ? (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 overflow-auto text-sm text-gray-800 dark:text-gray-200">
            <pre>{JSON.stringify(portfolio, null, 2)}</pre>
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">No portfolio data available.</p>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={goBack}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
