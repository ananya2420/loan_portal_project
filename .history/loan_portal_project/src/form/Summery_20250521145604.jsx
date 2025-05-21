import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPersonalInfo,
  setEmployeeDetails,
  setLoanDetails,
  setDocumentUpdates,
} from '../redux/slices/formSlice';
import { toggleTheme } from '../redux/slices/themeSlice';

const steps = [
  'Apply',
  'Personal Info',
  'Employee Details',
  'Loan Details',
  'Document Updates',
  'Summary',
  'Review',
  'Thank You',
];

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { personalInfo, employeeDetails, loanDetails, documentUpdates } = useSelector(
    (state) => state.formData || {}
  );

  const theme = useSelector((state) => state.theme.theme);

  const [isEditing, setIsEditing] = useState(false);
  const [editStep, setEditStep] = useState(0);

  useEffect(() => {
    if (!personalInfo?.name) {
      alert('No user data available. Please complete the form steps before accessing the summary.');
      navigate('/apply/document-updates');
    }
  }, [personalInfo, navigate]);

  const stepTitles = ['Personal Info', 'Employee Details', 'Loan Details', 'Document Updates'];

  // We only build tooltip content here for summary display
  // On hover over label, show these tooltips (sample data options)

  const personalInfoTooltip = {
    name: 'Gourab / Bob',
    dob: '21.5.25',
    phone: '01700 / 01654',
    email: 'aborty@gmail.com / a@gmail.com',
  };

  const employeeDetailsTooltip = {
    company: 'Brain Station / Tech Solution / Enosis Solution',
    status: 'Full-time / Part-time',
    income: '10000 / 12000 / 15000',
    experience: '5 years / 6 years',
    taxId: 'TX55505 / TX58306',
  };

  const loanDetailsTooltip = {
    amount: '20000 / 50000',
    type: 'Home Loan / Auto Loan',
    repaymentTerm: '6 / 12 / 24 / 36 / 48 months',
    emiDate: '21.5.25 / 22.5.25',
  };

  const renderTooltipLabel = (label, tooltip) => (
    <div className="relative group cursor-default inline-block">
      <span className="underline text-blue-600">{label}</span>
      <div
        className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2
                   hidden group-hover:block
                   bg-black text-white text-xs rounded py-1 px-3 whitespace-nowrap z-10"
      >
        {tooltip}
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="max-w-4xl mx-auto mb-4 flex justify-end">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
        >
          Toggle Theme
        </button>
      </div>

      <div className="flex justify-between max-w-4xl mx-auto mb-6 px-4">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = label === 'Summary';

          return (
            <div key={label} className="flex flex-col items-center w-1/8">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {stepNumber}
              </div>
              <div
                className={`text-xs text-center ${
                  isActive ? 'font-bold text-blue-600' : 'text-gray-600'
                }`}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full max-w-md mx-auto mb-6">
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
              Step 6 of 8
            </span>
            <span className="text-xs font-semibold text-teal-600">75%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
            <div
              style={{ width: '75%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-lg space-y-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Summary</h2>

        {!isEditing && (
          <>
            {/* Personal Info Section */}
            <section className="space-y-2 border-b border-gray-300 pb-4">
              <h3 className="text-xl font-semibold mb-3">Personal Info</h3>
              <div>
                <strong>{renderTooltipLabel('Name', personalInfoTooltip.name)}:</strong>{' '}
                <span>••••••</span>
              </div>
              <div>
                <strong>{renderTooltipLabel('DOB', personalInfoTooltip.dob)}:</strong>{' '}
                <span>••••••</span>
              </div>
              <div>
                <strong>{renderTooltipLabel('Phone', personalInfoTooltip.phone)}:</strong>{' '}
                <span>••••••</span>
              </div>
              <div>
                <strong>{renderTooltipLabel('Email', personalInfoTooltip.email)}:</strong>{' '}
                <span>••••••</span>
              </div>
            </section>

            {/* Employee Details Section */}
            <section className="space-y-2 border-b border-gray-300 pb-4">
              <h3 className="text-xl font-semibold mb-3">Employee Details</h3>
              <div>
                <strong>{renderTooltipLabel('Company', employeeDetailsTooltip.company)}:</strong>{' '}
                <span>••••••</span>
              </div>
              <div>
                <strong>{renderTooltipLabel('Status', employeeDetailsTooltip.status)}:</strong>{' '}
                <span>••••••</span>
              </div>
              <div>
                <strong>{renderTooltipLabel('Monthly Income', employeeDetailsTooltip.income)}:</strong>{' '}
                <span>••••••</span>
              </div>
              <div>
                <strong>{renderTooltipLabel('Experience', employeeDetailsTooltip.experience)}:</strong>{' '}
                <span>••••••</span>
              </div>
              <div>
                <strong>{renderTooltipLabel('Tax ID', employeeDetailsTooltip.taxId)}:</strong>{' '}
                <span>••••••</span>
              </div>
            </section>

            {/* Loan Details Section */}
            <section className="space-y-2 border-b border-gray-300 pb-4">
              <h3 className="text-xl font-semibold mb-3">Loan Details</h3>
              <div>
                <strong>{renderTooltipLabel('Loan Amount', loanDetailsTooltip.amount)}:</strong>{' '}
                <span>••••••</span>
              </div>
              <div>
                <strong>{renderTooltipLabel('Loan Type', loanDetailsTooltip.type)}:</strong>{' '}
                <span>••••••</span>
              </div>
              <div>
                <strong>{renderTooltipLabel('Repayment Term (months)', loanDetailsTooltip.repaymentTerm)}:</strong>{' '}
                <span>••••••</span>
              </div>
              <div>
                <strong>{renderTooltipLabel('Preferred EMI Date', loanDetailsTooltip.emiDate)}:</strong>{' '}
                <span>••••••</span>
              </div>
            </section>

            {/* Document Updates Section */}
            <section className="space-y-2">
              <h3 className="text-xl font-semibold mb-3">Document Updates</h3>
              <div>
                <strong>ID Updated:</strong>{' '}
                <span>{documentUpdates?.isUpdated === 'true' ? 'Yes' : 'No'}</span>
              </div>
            </section>

            {/* Buttons */}
            <div className="flex justify-between mt-6 max-w-lg mx-auto">
              <button
                onClick={() => navigate('/apply/document-updates')}
                className="px-5 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditStep(0);
                }}
                className="px-6 py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600"
              >
                Edit Summary
              </button>
              <button
                onClick={() => navigate('/apply/review')}
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Add editing form logic here if needed */}

      </div>
    </div>
  );
};

export default Summary;

