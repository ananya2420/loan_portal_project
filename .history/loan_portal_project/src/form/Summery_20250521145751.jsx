import React, { useState, useEffect } from 'react';
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

const editStepTitles = ['Personal Info', 'Employee Details', 'Loan Details', 'Document Updates'];

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { personalInfo, employeeDetails, loanDetails, documentUpdates } = useSelector(
    (state) => state.formData || {}
  );

  const theme = useSelector((state) => state.theme.theme);

  // Control whether in summary display mode or editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Which edit step currently active (0=Personal Info, 1=Employee Details, etc)
  const [editStep, setEditStep] = useState(0);

  // Local state for form editing fields
  const [localPersonalInfo, setLocalPersonalInfo] = useState(personalInfo || {});
  const [localEmployeeDetails, setLocalEmployeeDetails] = useState(employeeDetails || {});
  const [localLoanDetails, setLocalLoanDetails] = useState(loanDetails || {});
  const [localDocumentUpdates, setLocalDocumentUpdates] = useState(documentUpdates || {});

  useEffect(() => {
    if (!personalInfo?.name) {
      alert('No user data available. Please complete the form steps before accessing the summary.');
      navigate('/apply/document-updates');
    }
  }, [personalInfo, navigate]);

  // Tooltip data (for summary labels)
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

  // Tooltip label helper
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

  // Save changes from current edit step to redux
  const saveCurrentStep = () => {
    switch (editStep) {
      case 0:
        dispatch(setPersonalInfo(localPersonalInfo));
        break;
      case 1:
        dispatch(setEmployeeDetails(localEmployeeDetails));
        break;
      case 2:
        dispatch(setLoanDetails(localLoanDetails));
        break;
      case 3:
        dispatch(setDocumentUpdates(localDocumentUpdates));
        break;
      default:
        break;
    }
  };

  // Handle next step in editing
  const handleNext = () => {
    saveCurrentStep();
    if (editStep < 3) {
      setEditStep(editStep + 1);
    } else {
      // Done editing all steps, exit edit mode
      setIsEditing(false);
    }
  };

  // Handle back step in editing
  const handleBack = () => {
    if (editStep > 0) setEditStep(editStep - 1);
    else setIsEditing(false);
  };

  // Render editing form for each step
  const renderEditStep = () => {
    switch (editStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-4">Edit Personal Info</h3>
            <label className="block">
              Name:
              <input
                type="text"
                value={localPersonalInfo.name || ''}
                onChange={(e) =>
                  setLocalPersonalInfo({ ...localPersonalInfo, name: e.target.value })
                }
                className="border p-2 w-full rounded"
              />
            </label>
            <label className="block">
              DOB:
              <input
                type="date"
                value={localPersonalInfo.dob || ''}
                onChange={(e) =>
                  setLocalPersonalInfo({ ...localPersonalInfo, dob: e.target.value })
                }
                className="border p-2 w-full rounded"
              />
            </label>
            <label className="block">
              Phone:
              <input
                type="text"
                value={localPersonalInfo.phone || ''}
                onChange={(e) =>
                  setLocalPersonalInfo({ ...localPersonalInfo, phone: e.target.value })
                }
                className="border p-2 w-full rounded"
              />
            </label>
            <label className="block">
              Email:
              <input
                type="email"
                value={localPersonalInfo.email || ''}
                onChange={(e) =>
                  setLocalPersonalInfo({ ...localPersonalInfo, email: e.target.value })
                }
                className="border p-2 w-full rounded"
              />
            </label>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-4">Edit Employee Details</h3>
            <label className="block">
              Company:
              <input
                type="text"
                value={localEmployeeDetails.company || ''}
                onChange={(e) =>
                  setLocalEmployeeDetails({ ...localEmployeeDetails, company: e.target.value })
                }
                className="border p-2 w-full rounded"
              />
            </label>
            <label className="block">
              Status:
              <select
                value={localEmployeeDetails.status || ''}
                onChange={(e) =>
                  setLocalEmployeeDetails({ ...localEmployeeDetails, status: e.target.value })
                }
                className="border p-2 w-full rounded"
              >
                <option value="">Select status</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </label>
            <label className="block">
              Monthly Income:
              <select
                value={localEmployeeDetails.income || ''}
                onChange={(e) =>
                  setLocalEmployeeDetails({ ...localEmployeeDetails, income: e.target.value })
                }
                className="border p-2 w-full rounded"
              >
                <option value="">Select income</option>
                <option value="10000">10,000</option>
                <option value="12000">12,000</option>
                <option value="15000">15,000</option>
              </select>
            </label>
            <label className="block">
              Experience (years):
              <select
                value={localEmployeeDetails.experience || ''}
                onChange={(e) =>
                  setLocalEmployeeDetails({ ...localEmployeeDetails, experience: e.target.value })
                }
                className="border p-2 w-full rounded"
              >
                <option value="">Select experience</option>
                <option value="5">5 years</option>
                <option value="6">6 years</option>
              </select>
            </label>
            <label className="block">
              Tax ID:
              <select
                value={localEmployeeDetails.taxId || ''}
                onChange={(e) =>
                  setLocalEmployeeDetails({ ...localEmployeeDetails, taxId: e.target.value })
                }
                className="border p-2 w-full rounded"
              >
                <option value="">Select Tax ID</option>
                <option value="TX55505">TX55505</option>
                <option value="TX58306">TX58306</option>
              </select>
            </label>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-4">Edit Loan Details</h3>
            <label className="block">
              Loan Amount:
              <select
                value={localLoanDetails.amount || ''}
                onChange={(e) =>
                  setLocalLoanDetails({ ...localLoanDetails, amount: e.target.value })
                }
                className="border p-2 w-full rounded"
              >
                <option value="">Select amount</option>
                <option value="20000">20,000</option>
                <option value="50000">50,000</option>
              </select>
            </label>
            <label className="block">
              Loan Type:
              <select
                value={localLoanDetails.type || ''}
                onChange={(e) =>
                  setLocalLoanDetails({ ...localLoanDetails, type: e.target.value })
                }
                className="border p-2 w-full rounded"
              >
                <option value="">Select loan type</option>
                <option value="Home Loan">Home Loan</option>
                <option value="Auto Loan">Auto Loan</option>
              </select>
            </label>
            <label className="block">
              Repayment Term (months):
              <select
                value={localLoanDetails.repaymentTerm || ''}
                onChange={(e) =>
                  setLocalLoanDetails({ ...localLoanDetails, repaymentTerm: e.target.value })
                }
                className="border p-2 w-full rounded"
              >
                <option value="">Select term</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
                <option value="36">36 months</option>
                <option value="48">48 months</option>
              </select>
            </label>
            <label className="block">
              Preferred EMI Date:
              <input
                type="date"
                value={localLoanDetails.emiDate || ''}
                onChange={(e) =>
                  setLocalLoanDetails({ ...localLoanDetails, emiDate: e.target.value })
                }
                className="border p-2 w-full rounded"
              />
            </label>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-4">Edit Document Updates</h3>
            <label className="block">
              ID Updated:
              <select
                value={localDocumentUpdates.isUpdated || ''}
                onChange={(e) =>
                  setLocalDocumentUpdates({ ...localDocumentUpdates, isUpdated: e.target.value })
                }
                className="border p-2 w-full rounded"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Progress Bar and Steps */}
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
            {/* Personal Info Summary */}
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

            {/* Employee Details Summary */}
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

            {/* Loan Details Summary */}
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

            {/* Document Updates Summary */}
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
                  // Initialize local form states with current redux values
                  setLocalPersonalInfo(personalInfo || {});
                  setLocalEmployeeDetails(employeeDetails || {});
                  setLocalLoanDetails(loanDetails || {});
                  setLocalDocumentUpdates(documentUpdates || {});
                }}
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Summary
              </button>
            </div>
          </>
        )}

        {isEditing && (
          <>
            {/* Show editing step title */}
            <div className="mb-4 text-center text-lg font-semibold">
              Editing: {editStepTitles[editStep]}
            </div>

            {/* Render form for the current step */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className="max-w-lg mx-auto space-y-4"
            >
              {renderEditStep()}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  {editStep === 0 ? 'Cancel' : 'Back'}
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editStep === 3 ? 'Finish' : 'Next'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Summary;
