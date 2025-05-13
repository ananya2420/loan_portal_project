import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white p-8 shadow-lg rounded-lg text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! The page you're looking for doesn't exist.</p>
        <p className="text-gray-500 mb-6">It might have been moved or deleted, or you might have typed the address incorrectly.</p>

        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
