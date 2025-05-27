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

  const renderSection = (title, data, color, bgColor) => (
    <section
      className={`p-4 rounded border ${bgColor} ${color} space-y-2 shadow-md`}
    >
      <h3 className="text-lg font-semibold text-gray-500 mb-2">{title}</h3>
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
          : 'bg-gradient-to-r 
      }`}
    >
      <div className="max-w-3xl mx-auto mb-2 flex justify-end">
        <button
          onClick={() => navigate('/apply/summary')}
          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm transition-shadow shadow-md"
        >
          Back to Summary
        </button>
      </div>

      <div
        className={`max-w-3xl mx-auto p-4 rounded-xl shadow-lg ${
          theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
        } space-y-6`}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Full Summary
        </h2>

        {renderSection(
          'Personal Information',
          personalInfo,
          'text-indigo-700 dark:text-indigo-300',
          'bg-indigo-50 dark:bg-indigo-900'
        )}
        {renderSection(
          'Employee Details',
          employeeDetails,
          'text-green-700 dark:text-green-300',
          'bg-green-50 dark:bg-green-900'
        )}
        {renderSection(
          'Loan Details',
          loanDetails,
          'text-yellow-700 dark:text-yellow-300',
          'bg-yellow-50 dark:bg-yellow-900'
        )}
        {renderSection(
          'Document Updates',
          documentUpdates,
          'text-purple-700 dark:text-purple-300',
          'bg-purple-50 dark:bg-purple-900'
        )}

        <div className="flex flex-wrap gap-2 justify-between mt-4">
          <button
            onClick={() => navigate('/apply/summary')}
            className="px-4 py-1.5 bg-gray-400 hover:bg-gray-500 text-white rounded text-sm shadow-sm"
          >
            Back
          </button>

          <button
            onClick={() => navigate('/apply/review')}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm shadow-md"
          >
            Proceed to Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullSummary;




