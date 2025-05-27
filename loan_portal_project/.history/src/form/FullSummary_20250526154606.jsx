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
      {/* Step Indicator */}
      <div className="max-w-3xl mx-auto mb-4">
        <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400">
          {[
            'Apply',
            'Personal Info',
            'Employee Details',
            'Loan Details',
            'Document Updates',
            'Summary',
            'Review',
            'Thank you',
          ].map((stepLabel, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === 6;
            return (
              <div
                key={stepLabel}
                className={`flex flex-col items-center w-full ${
                  isActive ? 'text-white-700 dark:text-white-300 font-bold' : ''
                }`}
                style={{ minWidth: '70px' }}
              >
                <div
                  className={`rounded-full w-6 h-6 flex items-center justify-center mb-1 border ${
                    isActive
                      ? 'border-white-600 text-white-200 bg-white-200 dark:bg-blue-700'
                      : 'border-white-300 bg-white-100 dark:bg-white-700'
                  }`}
                >
                  {stepNumber}
                </div>
                <div className="whitespace-nowrap">{stepLabel}</div>
              </div>
            );
          })}
        </div>
      </div>

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
          'text-black-700 dark:text-black-300',
          'bg-gray-50'
        )}
        {renderSection(
          'Employee Details',
          employeeDetails,
          'text-black-700 dark:text-black-300',
          'bg--50'
        )}
        {renderSection(
          'Loan Details',
          loanDetails,
          'text-yellow-700 dark:text-yellow-300',
          'bg-gray-50'
        )}
        {renderSection(
          'Document Updates',
          documentUpdates,
          'text-purple-700 dark:text-purple-300',
          'bg-gray-50'
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




