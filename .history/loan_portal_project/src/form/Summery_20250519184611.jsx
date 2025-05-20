import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import ProgressBar from '../components/progressbar';

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  // Get all userData from Redux store (adjust path as per your slice)
  const userData = useSelector((state) => state.formData || {});
  const {
    personalInfo = {},
    employeeDetails = {},
    loanDetails = {},
    documentUpdates = {},
  } = userData;

  const [isEditingEmployee, setIsEditingEmployee] = useState(false);
  const [validationError, setValidationError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: employeeDetails,
  });

  useEffect(() => {
    reset(employeeDetails);
  }, [employeeDetails, reset]);

  // Update employee details on form submit
  const submitEmployeeDetails = (data) => {
    
    alert('Employee details saved! (Add dispatch to update Redux here)');
    setIsEditingEmployee(false);
  };

  // Redirect if personalInfo is missing
  useEffect(() => {
    if (!personalInfo?.name) {
      alert('No user data available. Please complete the form steps before accessing the summary.');
      navigate('/apply/document-updates'); // Adjust route to your form start page
    }
  }, [personalInfo, navigate]);

  const handleGoToReview = () => {
    navigate('/apply/review');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  if (!personalInfo?.name) {
    // While redirect happens, don't render anything
    return null;
  }

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Toggle Theme Button */}
      <div className="max-w-4xl mx-auto flex justify-end mb-4">
        <button
          onClick={handleToggleTheme}
          className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Toggle Theme
        </button>
      </div>

      {/* Progress Bar at the top */}
      <div className="max-w-4xl mx-auto mb-6">
        <ProgressBar currentStep={5} totalSteps={5} />
      </div>

      <div
        className={`max-w-4xl mx-auto p-6 rounded-xl shadow-lg space-y-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2 className="text-3xl font-bold text-center">User Summary</h2>

        {validationError && (
          <div className="text-red-600 text-center font-semibold mb-4">
            {validationError}
          </div>
        )}

        {isEditingEmployee ? (
          <form
            onSubmit={handleSubmit(submitEmployeeDetails)}
            className={`border p-5 rounded-lg space-y-5 max-w-lg mx-auto ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Edit Employee Details</h3>

            {[
              { label: 'Status', name: 'status' },
              { label: 'Company', name: 'company' },
              { label: 'Monthly Income', name: 'income', type: 'number' },
              { label: 'Experience (years)', name: 'experience', type: 'number' },
              { label: 'Tax ID', name: 'taxId' },
            ].map(({ label, name, type = 'text' }) => (
              <div key={name}>
                <label className="block font-semibold mb-1">{label}</label>
                <input
                  type={type}
                  placeholder={label}
                  {...register(name, { required: `${label} is required` })}
                  className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === 'dark'
                      ? 'bg-gray-600 border-gray-500 text-white'
                      : 'bg-white border-gray-300 text-black'
                  }`}
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
                )}
              </div>
            ))}

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setIsEditingEmployee(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
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
    { label: 'Monthly Income', value: employeeDetails.income ? `$${employeeDetails.income}` : 'N/A' },
    { label: 'Experience', value: employeeDetails.experience ? `${employeeDetails.experience} years` : 'N/A' },
    { label: 'Tax ID', value: employeeDetails.taxId },
  ],
},

              {
  title: 'Loan Details',
  content: [
    { label: 'Amount', value: loanDetails.amount ? `$${loanDetails.amount}` : 'N/A' },
    { label: 'Type', value: loanDetails.type },
    { label: 'Term', value: loanDetails.repaymentTerm ? `${loanDetails.repaymentTerm} months` : 'N/A' },
    { label: 'EMI Date', value: loanDetails.emiDate },
  ],
},

              
            ].map((section, i) => (
              <section
                key={i}
                className={`p-5 rounded-lg border ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}
              >
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
                onClick={() => setIsEditingEmployee(true)}
                className="px-6 py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600"
              >
                Edit Employee Details
              </button>

             <button
              onClick={handleGoToReview}
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
