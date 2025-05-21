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
              ID Proof Uploaded:
              <input
                type="checkbox"
                checked={localDocumentUpdates.idProof || false}
                onChange={(e) =>
                  setLocalDocumentUpdates({ ...localDocumentUpdates, idProof: e.target.checked })
                }
                className="mr-2"
              />
            </label>
            <label className="block">
              Address Proof Uploaded:
              <input
                type="checkbox"
                checked={localDocumentUpdates.addressProof || false}
                onChange={(e) =>
                  setLocalDocumentUpdates({ ...localDocumentUpdates, addressProof: e.target.checked })
                }
                className="mr-2"
              />
            </label>
            <label className="block">
              Income Proof Uploaded:
              <input
                type="checkbox"
                checked={localDocumentUpdates.incomeProof || false}
                onChange={(e) =>
                  setLocalDocumentUpdates({ ...localDocumentUpdates, incomeProof: e.target.checked })
                }
                className="mr-2"
              />
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`max-w-4xl mx-auto my-12 p-6 rounded-lg shadow-md ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Application Summary</h1>

      {!isEditing && (
        <>
          {/* Summary display */}
          <div className="space-y-6 mb-10">
            <section>
              <h2 className="text-2xl font-semibold mb-2">Personal Info</h2>
              <ul className="list-disc list-inside">
                <li>
                  {renderTooltipLabel('Name', personalInfoTooltip.name)}: {personalInfo?.name || 'N/A'}
                </li>
                <li>
                  {renderTooltipLabel('DOB', personalInfoTooltip.dob)}: {personalInfo?.dob || 'N/A'}
                </li>
                <li>
                  {renderTooltipLabel('Phone', personalInfoTooltip.phone)}: {personalInfo?.phone || 'N/A'}
                </li>
                <li>
                  {renderTooltipLabel('Email', personalInfoTooltip.email)}: {personalInfo?.email || 'N/A'}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Employee Details</h2>
              <ul className="list-disc list-inside">
                <li>
                  {renderTooltipLabel('Company', employeeDetailsTooltip.company)}: {employeeDetails?.company || 'N/A'}
                </li>
                <li>
                  {renderTooltipLabel('Status', employeeDetailsTooltip.status)}: {employeeDetails?.status || 'N/A'}
                </li>
                <li>
                  {renderTooltipLabel('Monthly Income', employeeDetailsTooltip.income)}: {employeeDetails?.income || 'N/A'}
                </li>
                <li>
                  {renderTooltipLabel('Experience', employeeDetailsTooltip.experience)}: {employeeDetails?.experience || 'N/A'}
                </li>
                <li>
                  {renderTooltipLabel('Tax ID', employeeDetailsTooltip.taxId)}: {employeeDetails?.taxId || 'N/A'}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Loan Details</h2>
              <ul className="list-disc list-inside">
                <li>
                  {renderTooltipLabel('Amount', loanDetailsTooltip.amount)}: {loanDetails?.amount || 'N/A'}
                </li>
                <li>
                  {renderTooltipLabel('Type', loanDetailsTooltip.type)}: {loanDetails?.type || 'N/A'}
                </li>
                <li>
                  {renderTooltipLabel('Repayment Term', loanDetailsTooltip.repaymentTerm)}: {loanDetails?.repaymentTerm || 'N/A'}
                </li>
                <li>
                  {renderTooltipLabel('EMI Date', loanDetailsTooltip.emiDate)}: {loanDetails?.emiDate || 'N/A'}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Document Updates</h2>
              <ul className="list-disc list-inside">
                <li>ID Proof Uploaded: {documentUpdates?.idProof ? 'Yes' : 'No'}</li>
                <li>Address Proof Uploaded: {documentUpdates?.addressProof ? 'Yes' : 'No'}</li>
                <li>Income Proof Uploaded: {documentUpdates?.incomeProof ? 'Yes' : 'No'}</li>
              </ul>
            </section>
          </div>

          {/* Edit Summary button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                setIsEditing(true);
                setEditStep(0);
                // Open edit forms with EMPTY inputs (no pre-fill)
                setLocalPersonalInfo({});
                setLocalEmployeeDetails({});
                setLocalLoanDetails({});
                setLocalDocumentUpdates({});
              }}
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit Summary
            </button>
          </div>
        </>
      )}

      {isEditing && (
        <div>
          {renderEditStep()}

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500 text-white"
            >
              {editStep === 0 ? 'Cancel' : 'Back'}
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 text-white"
            >
              {editStep < 3 ? 'Next' : 'Save & Finish'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
