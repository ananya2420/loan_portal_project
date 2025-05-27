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

  const renderSection = (title, data, titleColor, bgColor) => (
    <section
      className={`p-4 rounded border ${bgColor} ${titleColor} space-y-2 shadow-md`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
        {Object.entries(data).map(([key, value], i) => (
          <div key={i}>
            <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong>{' '}
            {key === 'previewUrl' && value ? (
              <img
                src={value}
                alt="Document Preview"
                className="mt-2 max-h-48 rounded border shadow"
              />
            ) : (
              value?.toString() || 'N/A'
            )}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div
      className={`min-h-screen p-4 ${
        theme === 'dark'
          ? 'bg-gray-900 text-gray-100'
          : 'bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 text-gray-900'
      }`}
    >
    

      {/* Main Card */}
      <div
        className={`max-w-3xl mx-auto p-4 rounded-xl shadow-lg ${
          theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
        } space-y-6`}
      >
        <h2 className="text-2xl font-bold text-center text-black-700 dark:text-black-300">
          Full Summary
        </h2>

        {renderSection(
          'Personal Information',
          personalInfo,
          'text-black-700 dark:text-black-300 border border-gray-200',
          'bg-gray-100'
        )}
        {renderSection(
          'Employee Details',
          employeeDetails,
          'text-black-700 dark:text-black-300 border border-gray-200',
          'bg-gray-100'
        )}
        {renderSection(
          'Loan Details',
          loanDetails,
          'text-black-700 dark:text-black-300 border border-gray-200',
          'bg-gray-100'
        )}
        {renderSection(
          'Document Updates',
          documentUpdates,
          'text-black-700 dark:text-black-300 border border-gray-200',
          'bg-gray-100'
        )}

        <div className="flex flex-wrap gap-2 justify-between mt-4">
          <button
            onClick={() => navigate('/apply/summary')}
            className={`px-4 py-2 rounded transition border ${
                theme === 'dark' ? 'text-white border-gray-500 hover:bg-gray-700' : 'text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
          >
            Back
          </button>

          <button
            onClick={() => navigate('/apply/review')}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm shadow-md"
          >
            Proceed to Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullSummary;




