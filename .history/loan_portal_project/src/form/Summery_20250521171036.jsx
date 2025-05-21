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
import ProgressBar from '../components/progressbar';

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    personalInfo,
    employeeDetails,
    loanDetails,
    documentUpdates,
  } = useSelector((state) => state.formData || {});

  const theme = useSelector((state) => state.theme.theme);

  const [isEditing, setIsEditing] = useState(false);
  const [editStep, setEditStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      personalInfo,
      employeeDetails,
      loanDetails,
      documentUpdates,
    },
  });

  useEffect(() => {
    if (!personalInfo?.name) {
      alert('No user data available. Please complete the form steps before accessing the summary.');
      navigate('/apply/document-updates');
    } else {
      reset({
        personalInfo,
        employeeDetails,
        loanDetails,
        documentUpdates,
      });
    }
  }, [personalInfo, employeeDetails, loanDetails, documentUpdates, reset, navigate]);

  const stepTitles = ['Personal Info', 'Employee Details', 'Loan Details', 'Document Updates'];

  const onSubmit = (data) => {
    dispatch(setPersonalInfo(data.personalInfo));
    dispatch(setEmployeeDetails(data.employeeDetails));
    dispatch(setLoanDetails(data.loanDetails));
    dispatch(setDocumentUpdates(data.documentUpdates));
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

            {/* Name select */}
            <div>
              <label className="block font-semibold mb-1 capitalize">Name</label>
              <select
                {...register(`personalInfo.name`, { required: 'Name is required' })}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select Name</option>
                <option value="gourab">gourab</option>
                <option value="bob">bob</option>
              </select>
              {errors?.personalInfo?.name && (
                <p className="text-red-500 text-sm mt-1">{errors.personalInfo.name.message}</p>
              )}
            </div>

            {/* DOB select */}
            <div>
              <label className="block font-semibold mb-1 capitalize">Date of Birth</label>
              <select
                {...register(`personalInfo.dob`, { required: 'DOB is required' })}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select DOB</option>
                <option value="21.5.2025">21.5.2025</option>
              </select>
              {errors?.personalInfo?.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.personalInfo.dob.message}</p>
              )}
            </div>

            {/* Phone select */}
            <div>
              <label className="block font-semibold mb-1 capitalize">Phone</label>
              <select
                {...register(`personalInfo.phone`, { required: 'Phone is required' })}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select Phone</option>
                <option value="01700">01700</option>
                <option value="01654">01654</option>
              </select>
              {errors?.personalInfo?.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.personalInfo.phone.message}</p>
              )}
            </div>

            {/* Email select */}
            <div>
              <label className="block font-semibold mb-1 capitalize">Email</label>
              <select
                {...register(`personalInfo.email`, { required: 'Email is required' })}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select Email</option>
                <option value="aborty@gmail.com">aborty@gmail.com</option>
                <option value="a@gmail.com">a@gmail.com</option>
              </select>
              {errors?.personalInfo?.email && (
                <p className="text-red-500 text-sm mt-1">{errors.personalInfo.email.message}</p>
              )}
            </div>
          </>
        );

      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Edit Employee Details</h3>

            {/* Company select */}
            <div>
              <label className="block font-semibold mb-1 capitalize">Company</label>
              <select
                {...register(`employeeDetails.company`, { required: 'Company is required' })}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select Company</option>
                <option value="Brain station">Brain station</option>
                <option value="tech solution">tech solution</option>
              </select>
              {errors?.employeeDetails?.company && (
                <p className="text-red-500 text-sm mt-1">{errors.employeeDetails.company.message}</p>
              )}
            </div>

            {/* Status select */}
            <div>
              <label className="block font-semibold mb-1 capitalize">Status</label>
              <select
                {...register(`employeeDetails.status`, { required: 'Status is required' })}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select Status</option>
                <option value="part time">part time</option>
                <option value="full time">full time</option>
              </select>
              {errors?.employeeDetails?.status && (
                <p className="text-red-500 text-sm mt-1">{errors.employeeDetails.status.message}</p>
              )}
            </div>

            {/* Monthly Income select */}
            <div>
              <label className="block font-semibold mb-1 capitalize">Monthly Income</label>
              <select
                {...register(`employeeDetails.income`, { required: 'Income is required' })}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select Income</option>
                <option value="10000">10,000</option>
                <option value="12000">12,000</option>
                <option value="15000">15,000</option>
              </select>
              {errors?.employeeDetails?.income && (
                <p className="text-red-500 text-sm mt-1">{errors.employeeDetails.income.message}</p>
              )}
            </div>

            {/* Experience select */}
            <div>
              <label className="block font-semibold mb-1 capitalize">Experience (years)</label>
              <select
                {...register(`employeeDetails.experience`, { required: 'Experience is required' })}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select Experience</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              {errors?.employeeDetails?.experience && (
                <p className="text-red-500 text-sm mt-1">{errors.employeeDetails.experience.message}</p>
              )}
            </div>

            {/* Tax ID input */}
            <div>
              <label className="block font-semibold mb-1 capitalize">Tax ID</label>
              <input
                {...register(`employeeDetails.taxId`, { required: 'Tax ID is required' })}
                type="text"
                className="w-full border rounded px-4 py-2"
              />
              {errors?.employeeDetails?.taxId && (
                <p className="text-red-500 text-sm mt-1">{errors.employeeDetails.taxId.message}</p>
              )}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Edit Loan Details</h3>

            {/* Loan Amount select */}
            <div>
              <label className="block font-semibold mb-1 capitalize">Amount</label>
              <select
                {...register(`loanDetails.amount`, { required: 'Amount is required' })}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select Amount</option>
                <option value="20000">20,000</option>
                <option value="50000">50,000</option>
              </select>
              {errors?.loanDetails?.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.loanDetails.amount.message}</p>
              )}
            </div>

            {/* Loan Type select */}
            <div>
              <label className="block font-semibold mb-1 capitalize">Type</label>
              <select
                {...register(`loanDetails.type`, { required: 'Type is required' })}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select Type</option>
                <option value="home loan">home loan</option>
                <option value="auto loan">auto loan</option>
              </select>
              {errors?.loanDetails?.type && (
                <p className="text-red-500 text-sm mt-1">{errors.loanDetails.type.message}</p>
              )}
            </div>

            {/* Repayment Term select */}
            <div>
              <label className="block font-semibold mb-1 capitalize">Repayment Term (months)</label>
              <select
                {...register(`loanDetails.repaymentTerm`, { required: 'Repayment term is required' })}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select Term</option>
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="24">24</option>
              </select>
              {errors?.loanDetails?.repaymentTerm && (
                <p className="text-red-500 text-sm mt-1">{errors.loanDetails.repaymentTerm.message}</p>
              )}
            </div>

            {/* EMI Date select */}
            <div>
              <label className="block font-semibold mb-1 capitalize">Preferred EMI Date</label>
              <select
                {...register(`loanDetails.emiDate`, { required: 'EMI date is required' })}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select EMI Date</option>
                <option value="21.5.2025">21.5.2025</option>
                <option value="22.5.2025">22.5.2025</option>
              </select>
              {errors?.loanDetails?.emiDate && (
                <p className="text-red-500 text-sm mt-1">{errors.loanDetails.emiDate.message}</p>
              )}
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Edit Document Updates</h3>

            {/* Documents select */}
            <div>
              <label className="block font-semibold mb-1 capitalize">Documents</label>
              <select
                {...register(`documentUpdates.documents`, { required: 'Documents are required' })}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select Document</option>
                <option value="passport">Passport</option>
                <option value="driver license">Driver License</option>
              </select>
              {errors?.documentUpdates?.documents && (
                <p className="text-red-500 text-sm mt-1">{errors.documentUpdates.documents.message}</p>
              )}
            </div>

            {/* Expiry Date select */}
            <div>
              <label className="block font-semibold mb-1 capitalize">Expiry Date</label>
              <select
                {...register(`documentUpdates.expiryDate`, { required: 'Expiry date is required' })}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select Expiry Date</option>
                <option value="21.5.2025">21.5.2025</option>
                <option value="22.5.2025">22.5.2025</option>
              </select>
              {errors?.documentUpdates?.expiryDate && (
                <p className="text-red-500 text-sm mt-1">{errors.documentUpdates.expiryDate.message}</p>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="max-w-3xl mx-auto border p-6 rounded shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Summary</h2>

        <ProgressBar
          currentStep={4}
          totalSteps={4}
          stepTitles={stepTitles}
        />

        {!isEditing ? (
          <>
            {/* Summary display */}
            <div className="space-y-4 mt-6">
              <div>
                <h3 className="text-xl font-semibold">Personal Info</h3>
                <p>Name: {personalInfo?.name}</p>
                <p>DOB: {personalInfo?.dob}</p>
                <p>Phone: {personalInfo?.phone}</p>
                <p>Email: {personalInfo?.email}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Employee Details</h3>
                <p>Company: {employeeDetails?.company}</p>
                <p>Status: {employeeDetails?.status}</p>
                <p>Monthly Income: {employeeDetails?.income}</p>
                <p>Experience: {employeeDetails?.experience}</p>
                <p>Tax ID: {employeeDetails?.taxId}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Loan Details</h3>
                <p>Amount: {loanDetails?.amount}</p>
                <p>Type: {loanDetails?.type}</p>
                <p>Repayment Term: {loanDetails?.repaymentTerm}</p>
                <p>Preferred EMI Date: {loanDetails?.emiDate}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Document Updates</h3>
                <p>Documents: {documentUpdates?.documents}</p>
                <p>Expiry Date: {documentUpdates?.expiryDate}</p>
              </div>
            </div>

            <div className="mt-8 space-x-2">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => dispatch(toggleTheme())}
                className="px-6 py-2 bg-gray-600 text-white rounded"
              >
                Toggle Theme
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            {renderStepForm()}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  if (editStep === 0) {
                    // Exit editing and show summary
                    setIsEditing(false);
                    setEditStep(0);
                  } else {
                    // Go back a step
                    setEditStep((prev) => prev - 1);
                  }
                }}
                className="px-6 py-2 bg-gray-400 text-white rounded"
              >
                Back
              </button>

              {editStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setEditStep((prev) => prev + 1)}
                  className="px-6 py-2 bg-blue-600 text-white rounded"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Summary;
