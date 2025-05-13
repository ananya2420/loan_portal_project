//Application For Structure
//show a read only summary of all user input with edts otion ad final submission
//react-hook-form 
//add progress bar

//Application For Structure
//show a read only summary of all user input with edts otion ad final submission

// Summery.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Summery = ({ userData = {}, onSubmit }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('view');

  // Extract safely with defaults
  const {
    personalInfo = {},
    employeeDetails = {},
    loanDetails = {},
    documentUpdates = {}
  } = userData;

  // Log to debug
  useEffect(() => {
    console.log('User Data:', userData);
  }, [userData]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: personalInfo });

  const submitUpdatedInfo = (data) => {
    onSubmit(data);
    setStep('view');
  };

  const handleGoToReview = () => {
    navigate('/apply/review');
  };

  // If no name, we assume no data was passed
  if (!personalInfo?.name) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        No user data available. Please complete the form steps before accessing summary.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">User Summary</h2>

      {step === 'edit' ? (
        <form onSubmit={handleSubmit(submitUpdatedInfo)} className="bg-gray-50 p-4 rounded-lg space-y-4">
          {/* Form fields... */}
          {/* same as you had it, keep input fields for name, dob, phone, email */}
          {/* Add buttons to cancel/save */}
        </form>
      ) : (
        <>
          {step === 'view' && (
            <section className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
              <p><strong>Name:</strong> {personalInfo?.name}</p>
              <p><strong>Date of birth:</strong> {personalInfo?.dob}</p>
              <p><strong>Phone number:</strong> {personalInfo?.phone}</p>
              <p><strong>Email address:</strong> {personalInfo?.email}</p>
            </section>
          )}

          {step === 'submit' && (
            <>
              <section className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Employee Details</h3>
                <p><strong>Status:</strong> {employeeDetails?.status}</p>
                <p><strong>Company:</strong> {employeeDetails?.company}</p>
                <p><strong>Monthly Income:</strong> ${employeeDetails?.income}</p>
                <p><strong>Experience:</strong> {employeeDetails?.experience} years</p>
                <p><strong>Tax ID:</strong> {employeeDetails?.taxId}</p>
              </section>

              <section className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Loan Details</h3>
                <p><strong>Amount:</strong> ${loanDetails?.amount}</p>
                <p><strong>Type:</strong> {loanDetails?.type}</p>
                <p><strong>Term:</strong> {loanDetails?.term}</p>
                <p><strong>EMI Date:</strong> {loanDetails?.emiDate}</p>
              </section>

              <section className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Document Updates</h3>
                <p><strong>ID Updated:</strong> {documentUpdates?.isUpdated ? 'Yes' : 'No'}</p>
              </section>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleGoToReview}
                  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Go to Review
                </button>
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setStep('edit')}
              className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => setStep('submit')}
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Summery;
