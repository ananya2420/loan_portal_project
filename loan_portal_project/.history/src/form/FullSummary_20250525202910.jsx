import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FullSummary = () => {
  const navigate = useNavigate();
  const {
    personalInfo = {},
    employeeDetails = {},
    loanDetails = {},
    documentUpdates = {},
  } = useSelector((state) => state.formData || {});
  const theme = useSelector((state) => state.theme.theme);

  const renderSection = (title, data) => (
    <div
      className={`rounded-lg p-4 shadow-md ${
        theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-300">{title}</h3>
      <ul className="space-y-1">
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>{' '}
            <span className="ml-2">{value?.toString() || 'N/A'}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-300">
          Full Summary
        </h2>

        {renderSection('Personal Information', personalInfo)}
        {renderSection('Employment Details', employeeDetails)}
        {renderSection('Loan Details', loanDetails)}
        {renderSection('Document Updates', documentUpdates)}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate('/apply/summary')}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition"
          >
            Back
          </button>
          <button
            onClick={() => navigate('/apply/review')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            Proceed to Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullSummary;




