//user can navigate Back/next between steps


import React, { useContext } from 'react';
import { formContext } from '../context/FormContext';

const NavigationButton = () => {
  const { page, setPage, title } = useContext(formContext);

  const isFirstPage = page === 0;
  const isLastPage = page === Object.keys(title).length - 1;

  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        disabled={isFirstPage}
        className={`px-6 py-2 rounded-lg font-semibold transition 
          ${isFirstPage ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        Back
      </button>

      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, Object.keys(title).length - 1))}
        disabled={isLastPage}
        className={`px-6 py-2 rounded-lg font-semibold transition 
          ${isLastPage ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
      >
        Next
      </button>
    </div>
  );
};

export default NavigationButton;
