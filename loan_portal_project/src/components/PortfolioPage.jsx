import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const PortfolioPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const portfolio = useSelector((state) => state.portfolio);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: portfolio
  });

  const goBack = () => navigate('/');

  const onSubmit = (data) => {
    dispatch({ type: 'portfolio/updatePortfolio', payload: data }); // Make sure you have this action
    alert('Portfolio updated!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Portfolio Page
        </h1>

        {portfolio && Object.keys(portfolio).length > 0 ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 space-y-4 text-sm text-gray-800 dark:text-gray-200"
          >
            {Object.entries(portfolio).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <label className="font-semibold capitalize">{key}</label>
                <input
                  {...register(key)}
                  defaultValue={value}
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            ))}

            <div className="mt-4 text-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No portfolio data available.
          </p>
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

