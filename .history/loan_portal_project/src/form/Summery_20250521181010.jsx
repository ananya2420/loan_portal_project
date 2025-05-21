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

            {/* Tax ID input - kept as text because only one value */}
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
              <label className="block font-semibold mb-1 capitalize">EMI Date</label>
              <select
                {...register(`loanDetails.emiDate`, { required: 'EMI Date is required' })}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select EMI Date</option>
                <option value="10">10</option>
                <option value="15">15</option>
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

            {/* Photo ID checkbox */}
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                {...register(`documentUpdates.photoId`)}
                className="mr-2"
              />
              <label className="capitalize">Photo ID</label>
            </div>

            {/* Address Proof checkbox */}
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                {...register(`documentUpdates.addressProof`)}
                className="mr-2"
              />
              <label className="capitalize">Address Proof</label>
            </div>

            {/* Income Proof checkbox */}
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                {...register(`documentUpdates.incomeProof`)}
                className="mr-2"
              />
              <label className="capitalize">Income Proof</label>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const renderSummary = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Summary</h2>

      <section className="mb-6 p-4 border rounded">
        <h3 className="font-semibold text-lg mb-2">Personal Info</h3>
        <p><strong>Name:</strong> {personalInfo?.name || '-'}</p>
        <p><strong>DOB:</strong> {personalInfo?.dob || '-'}</p>
        <p><strong>Phone:</strong> {personalInfo?.phone || '-'}</p>
        <p><strong>Email:</strong> {personalInfo?.email || '-'}</p>
      </section>

      <section className="mb-6 p-4 border rounded">
        <h3 className="font-semibold text-lg mb-2">Employee Details</h3>
        <p><strong>Company:</strong> {employeeDetails?.company || '-'}</p>
        <p><strong>Status:</strong> {employeeDetails?.status || '-'}</p>
        <p><strong>Monthly Income:</strong> {employeeDetails?.income || '-'}</p>
        <p><strong>Experience:</strong> {employeeDetails?.experience || '-'}</p>
        <p><strong>Tax ID:</strong> {employeeDetails?.taxId || '-'}</p>
      </section>

      <section className="mb-6 p-4 border rounded">
        <h3 className="font-semibold text-lg mb-2">Loan Details</h3>
        <p><strong>Amount:</strong> {loanDetails?.amount || '-'}</p>
        <p><strong>Type:</strong> {loanDetails?.type || '-'}</p>
        <p><strong>Repayment Term:</strong> {loanDetails?.repaymentTerm || '-'}</p>
        <p><strong>EMI Date:</strong> {loanDetails?.emiDate || '-'}</p>
      </section>

      <section className="mb-6 p-4 border rounded">
        <h3 className="font-semibold text-lg mb-2">Document Updates</h3>
        <p><strong>Photo ID:</strong> {documentUpdates?.photoId ? 'Yes' : 'No'}</p>
        <p><strong>Address Proof:</strong> {documentUpdates?.addressProof ? 'Yes' : 'No'}</p>
        <p><strong>Income Proof:</strong> {documentUpdates?.incomeProof ? 'Yes' : 'No'}</p>
      </section>

      <button
        type="button"
        onClick={() => {
          setIsEditing(true);
          setEditStep(0);
        }}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        Edit
      </button>
    </div>
  );

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Loan Application Summary</h1>
          <button
            onClick={() => dispatch(toggleTheme())}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded shadow">
            <ProgressBar currentStep={editStep} totalSteps={stepTitles.length} />

            <h2 className="text-2xl font-semibold mb-4">{stepTitles[editStep]}</h2>

            {renderStepForm()}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => {
                  if (editStep === 0) {
                    setIsEditing(false);
                    setEditStep(0);
                  } else {
                    setEditStep((prev) => prev - 1);
                  }
                }}
                className="px-6 py-2 bg-gray-400 text-white rounded"
              >
                Back
              </button>

              {editStep < stepTitles.length - 1 ? (
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
        ) : (
          renderSummary()
        )}
      </div>
    </div>
  );
};

export default Summary;
