import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/progressbar';

const Summary = () => {
  const navigate = useNavigate();

  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Doe',
    dob: '1990-01-01',
    phone: '123-456-7890',
    email: 'john@example.com',
  });

  const [employeeDetails, setEmployeeDetails] = useState({
    status: 'Full-time',
    company: 'Acme Corp',
    income: 5000,
    experience: 5,
    taxId: 'ABCD1234',
  });

  const [loanDetails, setLoanDetails] = useState({
    amount: 15000,
    type: 'Home Loan',
    repaymentTerm: 60,
    emiDate: '2025-06-01',
  });

  const [documentUpdates, setDocumentUpdates] = useState({
    isUpdated: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editStep, setEditStep] = useState(0);
  const [validationError, setValidationError] = useState('');

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
    reset({
      personalInfo,
      employeeDetails,
      loanDetails,
      documentUpdates,
    });
  }, [personalInfo, employeeDetails, loanDetails, documentUpdates, reset]);

  useEffect(() => {
    if (!personalInfo?.name) {
      alert('No user data available. Please complete the form steps before accessing the summary.');
      navigate('/apply/document-updates');
    }
  }, [personalInfo, navigate]);

  const onSubmit = (data) => {
    setPersonalInfo(data.personalInfo);
    setEmployeeDetails(data.employeeDetails);
    setLoanDetails(data.loanDetails);
    setDocumentUpdates(data.documentUpdates);

    alert('All details saved!');
    setIsEditing(false);
    setEditStep(0);
  };

  const stepTitles = ['Personal Info', 'Employee Details', 'Loan Details', 'Document Updates'];

  const renderStepForm = () => {
    switch (editStep) {
      case 0:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Edit Personal Information</h3>
            {['name', 'dob', 'phone', 'email'].map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize">{field}</label>
                <input
                  {...register(`personalInfo.${field}`, { required: `${field} is required` })}
                  className="w-full border rounded px-4 py-2"
                />
                {errors?.personalInfo?.[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalInfo[field].message}</p>
                )}
              </div>
            ))}
          </>
        );
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Edit Employee Details</h3>
            {['status', 'company', 'income', 'experience', 'taxId'].map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize">{field}</label>
                <input
                  {...register(`employeeDetails.${field}`, {
                    required: `${field} is required`,
                  })}
                  type={['income', 'experience'].includes(field) ? 'number' : 'text'}
                  className="w-full border rounded px-4 py-2"
                />
                {errors?.employeeDetails?.[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors.employeeDetails[field].message}</p>
                )}
              </div>
            ))}
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Edit Loan Details</h3>
            {['amount', 'type', 'repaymentTerm', 'emiDate'].map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize">{field}</label>
                <input
                  {...register(`loanDetails.${field}`, {
                    required: `${field} is required`,
                  })}
                  type={field === 'amount' || field === 'repaymentTerm' ? 'number' : 'text'}
                  className="w-full border rounded px-4 py-2"
                />
                {errors?.loanDetails?.[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors.loanDetails[field].message}</p>
                )}
              </div>
            ))}
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Edit Document Updates</h3>
            <label className="block font-semibold mb-1">ID Updated</label>
            <select
              {...register('documentUpdates.isUpdated', { required: 'Selection is required' })}
              className="w-full border rounded px-4 py-2"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors?.documentUpdates?.isUpdated && (
              <p className="text-red-500 text-sm mt-1">{errors.documentUpdates.isUpdated.message}</p>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-black">
      <div className="max-w-4xl mx-auto mb-6">
        <ProgressBar currentStep={5} totalSteps={5} />
      </div>

      <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-lg space-y-6 bg-white">
        <h2 className="text-3xl font-bold text-center">User Summary</h2>

        {validationError && (
          <div className="text-red-600 text-center font-semibold mb-4">{validationError}</div>
        )}

        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border p-5 rounded-lg space-y-5 max-w-lg mx-auto bg-gray-50 border-gray-200"
          >
            <h2 className="text-center font-bold text-xl mb-4">{stepTitles[editStep]}</h2>
            {renderStepForm()}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                disabled={editStep === 0}
                onClick={() => setEditStep((prev) => prev - 1)}
                className="px-6 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
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
                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded">
                  Submit
                </button>
              )}
            </div>
          </form>
        ) : (
          <>
            {[
              {
                title: 'Personal Information',
                content: [
                  { label: 'Name', value: personalInfo.name },
                  { label: 'Date of Birth', value: personalInfo.dob },
                  { label: 'Phone', value: personalInfo.phone },
                  { label: 'Email', value: personalInfo.email },
                ],
              },
              {
                title: 'Employee Details',
                content: [
                  { label: 'Status', value: employeeDetails.status },
                  { label: 'Company', value: employeeDetails.company },
                  {
                    label: 'Monthly Income',
                    value: employeeDetails.income ? `$${employeeDetails.income}` : 'N/A',
                  },
                  {
                    label: 'Experience',
                    value: employeeDetails.experience
                      ? `${employeeDetails.experience} years`
                      : 'N/A',
                  },
                  { label: 'Tax ID', value: employeeDetails.taxId },
                ],
              },
              {
                title: 'Loan Details',
                content: [
                  { label: 'Amount', value: loanDetails.amount ? `$${loanDetails.amount}` : 'N/A' },
                  { label: 'Type', value: loanDetails.type },
                  {
                    label: 'Term',
                    value: loanDetails.repaymentTerm
                      ? `${loanDetails.repaymentTerm} months`
                      : 'N/A',
                  },
                  { label: 'EMI Date', value: loanDetails.emiDate },
                ],
              },
              {
                title: 'Document Updates',
                content: [{ label: 'ID Updated', value: documentUpdates?.isUpdated ? 'Yes' : 'No' }],
              },
            ].map((section, i) => (
              <section key={i} className="p-5 rounded-lg border bg-gray-50 border-gray-200">
                <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.content.map((item, j) => (
                    <p key={j} className="text-sm">
                      <strong>{item.label}:</strong> {item.value || 'N/A'}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditStep(0);
                  reset({ personalInfo, employeeDetails, loanDetails, documentUpdates });
                }}
                className="px-6 py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600"
              >
                Edit Employee Details
              </button>

              <button
                onClick={() => navigate('/apply/review')}
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Go to Review
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Summary;

