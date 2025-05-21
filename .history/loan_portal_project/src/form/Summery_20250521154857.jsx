import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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

  const [localPersonalInfo, setLocalPersonalInfo] = useState({});
  const [localEmployeeDetails, setLocalEmployeeDetails] = useState({});
  const [localLoanDetails, setLocalLoanDetails] = useState({});
  const [localDocumentUpdates, setLocalDocumentUpdates] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!personalInfo?.name) {
      alert('No user data available. Please complete the form steps before accessing the summary.');
      navigate('/apply/document-updates');
    } else {
      reset({
        personalInfo: {
          name: '',
          dob: '',
          phone: '',
          email: '',
        },
        employeeDetails: {
          status: '',
          company: '',
          income: '',
          experience: '',
          taxId: '',
        },
        loanDetails: {
          amount: '',
          type: '',
          repaymentTerm: '',
          emiDate: '',
        },
        documentUpdates: {
          isUpdated: '',
        },
      });
    }
  }, [personalInfo, employeeDetails, loanDetails, documentUpdates, reset, navigate]);

  const stepTitles = ['Personal Info', 'Employee Details', 'Loan Details', 'Document Updates'];

  const onSubmit = () => {
    dispatch(setPersonalInfo(localPersonalInfo));
    dispatch(setEmployeeDetails(localEmployeeDetails));
    dispatch(setLoanDetails(localLoanDetails));
    dispatch(setDocumentUpdates(localDocumentUpdates));
    alert('Changes saved!');
    setIsEditing(false);
    setEditStep(0);
  };

  const renderStepForm = () => {
    switch (editStep) {
      case 0:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Edit Personal Information</h3>
            {['name', 'dob', 'phone', 'email'].map((field) => {
              const suggestions = {
                name: ['Gourab', 'Bob'],
                dob: ['21.5.25', '22.5.25'],
                phone: ['01700', '01654'],
                email: ['a@mail.com', 'aborty@gmail.com'],
              };
              return (
                <div key={field} className="relative group mb-4">
                  <label className="block font-semibold mb-1 capitalize">{field}</label>
                  <input
                    value={localPersonalInfo[field] || ''}
                    onChange={(e) =>
                      setLocalPersonalInfo({ ...localPersonalInfo, [field]: e.target.value })
                    }
                    className="w-full border rounded px-4 py-2"
                  />
                  {suggestions[field] && (
                    <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-white border rounded shadow z-10 w-full">
                      {suggestions[field].map((suggestion) => (
                        <div
                          key={suggestion}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            setLocalPersonalInfo({ ...localPersonalInfo, [field]: suggestion })
                          }
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors?.personalInfo?.[field] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.personalInfo[field].message}
                    </p>
                  )}
                </div>
              );
            })}
          </>
        );
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Edit Employee Details</h3>

            {/* STATUS with hover suggestions */}
            <div className="relative group mb-4">
              <label className="block font-semibold mb-1 capitalize">Status</label>
              <input
                value={localEmployeeDetails.status || ''}
                onChange={(e) =>
                  setLocalEmployeeDetails({ ...localEmployeeDetails, status: e.target.value })
                }
                className="w-full border rounded px-4 py-2"
              />
              <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-white border rounded shadow z-10 w-full">
                {['Full Time', 'Part Time'].map((suggestion) => (
                  <div
                    key={suggestion}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      setLocalEmployeeDetails({ ...localEmployeeDetails, status: suggestion })
                    }
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>

            {/* COMPANY with hover suggestions */}
            <div className="relative group mb-4">
              <label className="block font-semibold mb-1 capitalize">Company</label>
              <input
                value={localEmployeeDetails.company || ''}
                onChange={(e) =>
                  setLocalEmployeeDetails({ ...localEmployeeDetails, company: e.target.value })
                }
                className="w-full border rounded px-4 py-2"
              />
              <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-white border rounded shadow z-10 w-full">
                {['Brain station', 'Tech Solution', 'Enosis Solution'].map((suggestion) => (
                  <div
                    key={suggestion}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      setLocalEmployeeDetails({ ...localEmployeeDetails, company: suggestion })
                    }
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>

            {/* INCOME with hover suggestions */}
            <div className="relative group mb-4">
              <label className="block font-semibold mb-1 capitalize">Income</label>
              <input
                type="number"
                value={localEmployeeDetails.income || ''}
                onChange={(e) =>
                  setLocalEmployeeDetails({ ...localEmployeeDetails, income: e.target.value })
                }
                className="w-full border rounded px-4 py-2"
              />
              <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-white border rounded shadow z-10 w-full">
                {[5000, 10000, 12000, 15000].map((suggestion) => (
                  <div
                    key={suggestion}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      setLocalEmployeeDetails({
                        ...localEmployeeDetails,
                        income: suggestion.toString(),
                      })
                    }
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>

            {/* EXPERIENCE with hover suggestions */}
            <div className="relative group mb-4">
              <label className="block font-semibold mb-1 capitalize">Experience</label>
              <input
                value={localEmployeeDetails.experience || ''}
                onChange={(e) =>
                  setLocalEmployeeDetails({ ...localEmployeeDetails, experience: e.target.value })
                }
                className="w-full border rounded px-4 py-2"
              />
              <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-white border rounded shadow z-10 w-full">
                {['5 years', '6 years'].map((suggestion) => (
                  <div
                    key={suggestion}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      setLocalEmployeeDetails({ ...localEmployeeDetails, experience: suggestion })
                    }
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>

            {/* TAXID with hover suggestions */}
            <div className="relative group mb-4">
              <label className="block font-semibold mb-1 capitalize">TaxId</label>
              <input
                value={localEmployeeDetails.taxId || ''}
                onChange={(e) =>
                  setLocalEmployeeDetails({ ...localEmployeeDetails, taxId: e.target.value })
                }
                className="w-full border rounded px-4 py-2"
              />
              <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-white border rounded shadow z-10 w-full">
                {['tx55505', '583006'].map((suggestion) => (
                  <div
                    key={suggestion}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      setLocalEmployeeDetails({ ...localEmployeeDetails, taxId: suggestion })
                    }
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Edit Loan Details</h3>
            {['amount', 'type', 'repaymentTerm', 'emiDate'].map((field) => (
              <div key={field} className="mb-4">
                <label className="block font-semibold mb-1 capitalize">{field}</label>
                <input
                  type={field === 'amount' ? 'number' : 'text'}
                  value={localLoanDetails[field] || ''}
                  onChange={(e) =>
                    setLocalLoanDetails({ ...localLoanDetails, [field]: e.target.value })
                  }
                  className="w-full border rounded px-4 py-2"
                />
              </div>
            ))}
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Edit Document Updates</h3>
            <label className="block font-semibold mb-1 capitalize">Is Updated</label>
            <input
              value={localDocumentUpdates.isUpdated || ''}
              onChange={(e) =>
                setLocalDocumentUpdates({ ...localDocumentUpdates, isUpdated: e.target.value })
              }
              className="w-full border rounded px-4 py-2"
            />
          </>
        );
      default:
        return null;
    }
  };

  const handleEditClick = (stepIndex) => {
    setIsEditing(true);
    setEditStep(stepIndex);
    switch (stepIndex) {
      case 0:
        setLocalPersonalInfo(personalInfo || {});
        break;
      case 1:
        setLocalEmployeeDetails(employeeDetails || {});
        break;
      case 2:
        setLocalLoanDetails(loanDetails || {});
        break;
      case 3:
        setLocalDocumentUpdates(documentUpdates || {});
        break;
      default:
        break;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Loan Application Summary</h1>
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-2 rounded border"
        >
          Toggle Theme ({theme})
        </button>
      </div>

      {!isEditing && (
        <>
          {/* Personal Info */}
          <div className="mb-8 border p-4 rounded shadow">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Personal Info</h2>
              <button
                onClick={() => handleEditClick(0)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
            </div>
            <p><strong>Name:</strong> {personalInfo?.name}</p>
            <p><strong>Date of Birth:</strong> {personalInfo?.dob}</p>
            <p><strong>Phone:</strong> {personalInfo?.phone}</p>
            <p><strong>Email:</strong> {personalInfo?.email}</p>
          </div>

          {/* Employee Details */}
          <div className="mb-8 border p-4 rounded shadow">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Employee Details</h2>
              <button
                onClick={() => handleEditClick(1)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
            </div>
            <p><strong>Status:</strong> {employeeDetails?.status}</p>
            <p><strong>Company:</strong> {employeeDetails?.company}</p>
            <p><strong>Income:</strong> {employeeDetails?.income}</p>
            <p><strong>Experience:</strong> {employeeDetails?.experience}</p>
            <p><strong>TaxId:</strong> {employeeDetails?.taxId}</p>
          </div>

          {/* Loan Details */}
          <div className="mb-8 border p-4 rounded shadow">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Loan Details</h2>
              <button
                onClick={() => handleEditClick(2)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
            </div>
            <p><strong>Amount:</strong> {loanDetails?.amount}</p>
            <p><strong>Type:</strong> {loanDetails?.type}</p>
            <p><strong>Repayment Term:</strong> {loanDetails?.repaymentTerm}</p>
            <p><strong>EMI Date:</strong> {loanDetails?.emiDate}</p>
          </div>

          {/* Document Updates */}
          <div className="mb-8 border p-4 rounded shadow">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Document Updates</h2>
              <button
                onClick={() => handleEditClick(3)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
            </div>
            <p><strong>Is Updated:</strong> {documentUpdates?.isUpdated}</p>
          </div>
        </>
      )}

      {isEditing && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border p-6 rounded shadow"
        >
          {renderStepForm()}
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditStep(0);
              }}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Summary;
