import React from 'react';
import { useNavigate } from 'react-router-dom';
import loan from '../assets/loan.png';

const Homepage = () => {
  const navigate = useNavigate();
  const currentStep = 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 text-black transition-all duration-300">
      {/* Step Tracker */}
      <div className="mb-6 grid grid-cols-8 gap-2 text-xs font-semibold text-center">
        {[
          { step: 1, label: 'Apply' },
          { step: 2, label: <>Personal<br />Info</> },
          { step: 3, label: <>Employee<br />Details</> },
          { step: 4, label: <>Loan<br />Details</> },
          { step: 5, label: <>Document<br />Updates</> },
          { step: 6, label: 'Summary' },
          { step: 7, label: 'Review' },
          { step: 8, label: 'Thank You' },
        ].map(({ step, label }) => (
          <div key={step} className="flex flex-col items-center col-span-1">
            <span
              className={`w-7 h-7 flex items-center justify-center rounded-full font-bold ${
                step === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step}
            </span>
            <span className="mt-1 truncate" title={typeof label === 'string' ? label : undefined}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto">
        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
              Step 1 of 8
            </span>
            <span className="text-xs font-semibold text-teal-600">10%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
            <div
              style={{ width: '10%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
            />
          </div>
        </div>
      </div>

      {/* Homepage Card */}
      <div className="shadow-lg rounded-lg p-8 bg-white space-y-6 w-full max-w-md text-center transition-all duration-300">
        <div className="flex justify-center">
          <img src={loan} alt="Loan Illustration" className="w-32 h-32 object-contain" />
        </div>

        <h1 className="text-3xl font-bold">Welcome to Loan Application</h1>

        <p className="text-gray-700 text-base">
          Start your loan application process or review your application summary.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/apply/personal-info')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Start Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
