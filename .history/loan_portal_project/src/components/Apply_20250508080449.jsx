//pages and routes
//Apply component-redirect to- Review page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Apply = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/review');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Loan Application Form
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Multi-step form
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
         
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default Apply;
