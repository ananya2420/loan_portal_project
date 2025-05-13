//Application For Structure
//add  react hook form 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoanDetails = ({ userData, setUserData }) => {
  const [form, setForm] = useState(userData.loanDetails || {});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData((prev) => ({ ...prev, loanDetails: form }));
    navigate('/apply/document-updates');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Loan Details
        </h2>

        <input
          name="amount"
          type="number"
          placeholder="Loan Amount"
          value={form.amount || ''}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="type"
          placeholder="Loan Type"
          value={form.type || ''}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default LoanDetails;

