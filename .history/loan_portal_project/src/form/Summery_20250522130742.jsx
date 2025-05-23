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

  const { personalInfo, employeeDetails, loanDetails, documentUpdates } =
    useSelector((state) => state.formData || {});
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
    // ... your existing switch-case (unchanged)
  };

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="max-w-3xl mx-auto mb-4">
        <ProgressBar currentStep={5} totalSteps={5} />
      </div>

      <div className="max-w-3xl mx-auto mb-2 flex justify-end">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm"
        >
          Toggle Theme
        </button>
      </div>

      <div className="flex justify-between max-w-md mx-auto mb-4 px-2">
        {/* ... existing progress bullets */}
      </div>

      <div className="w-full max-w-md mx-auto">
        <div className="relative pt-1 mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
              Step 6 of 8
            </span>
            <span className="text-xs font-semibold text-teal-600">60%</span>
          </div>
          <div className="h-1.5 bg-teal-200 rounded">
            <div className="h-full bg-green-500 w-1/2 transition-all duration-500" />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 rounded-xl shadow bg-white space-y-5">
        <h2 className="text-2xl font-bold text-center">Summary</h2>

        {isEditing ? (
          <>
            {/* Static Summary Display */}
            <div className="p-4 rounded border bg-gray-50 mb-6 space-y-4">
              <h2 className="text-2xl font-bold text-center mb-4">Loan Application</h2>

              <section className="space-y-2">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <p><strong>Name:</strong> Gourab</p>
                <p><strong>Date of Birth:</strong> 21.05.2025</p>
                <p><strong>Phone:</strong> 01700</p>
                <p><strong>Email:</strong> aborty@gmail.com</p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-semibold">Employee Details</h3>
                <p><strong>Status:</strong> Full time</p>
                <p><strong>Company:</strong> Brain Station</p>
                <p><strong>Monthly Income:</strong> 10,000</p>
                <p><strong>Experience:</strong> 5 years</p>
                <p><strong>Tax ID:</strong> tx555055</p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-semibold">Loan Details</h3>
                <p><strong>Amount:</strong> 20000</p>
                <p><strong>Type:</strong> Home Loan</p>
                <p><strong>Term:</strong> 6 months</p>
                <p><strong>EMI Date:</strong> 21.5.25</p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-semibold">Document Updates</h3>
                <p><strong>ID Updated:</strong> {documentUpdates?.isUpdated === 'false' ? 'No' : 'Yes'}</p>
              </section>
            </div>

            {/* Form for editing */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded bg-gray-50 space-y-4">
              <h2 className="text-center font-semibold text-lg">{stepTitles[editStep]}</h2>
              {renderStepForm()}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => {
                    if (editStep > 0) {
                      setEditStep((prev) => prev - 1);
                    } else {
                      setIsEditing(false);
                      setEditStep(0);
                      navigate('/apply/summary');
                    }
                  }}
                  className="px-4 py-1.5 bg-gray-400 text-white rounded text-sm"
                >
                  Back
                </button>
                {editStep < stepTitles.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setEditStep((prev) => prev + 1)}
                    className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm"
                  >
                    Next
                  </button>
                ) : (
                  <button type="submit" className="px-4 py-1.5 bg-green-600 text-white rounded text-sm">
                    Submit
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          <>
            {/* Keep your original summary view untouched here */}
            {/* ... (unchanged content, as already in your post) */}
          </>
        )}
      </div>
    </div>
  );
};

export default Summary;
