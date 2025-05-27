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

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    personalInfo = {},
    employeeDetails = {},
    loanDetails = {},
    documentUpdates = {},
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
    const hasAnyData =
      personalInfo?.name ||
      personalInfo?.firstName ||
      personalInfo?.lastName ||
      employeeDetails?.company ||
      loanDetails?.amount;

    if (!hasAnyData) {
      alert('No form data found. Please complete at least one step before viewing the summary.');
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

  const stepColors = [
    { numberBg: 'bg-red-300', numberBorder: 'border-red-600', text: 'text-red-600' },
    { numberBg: 'bg-orange-300', numberBorder: 'border-orange-600', text: 'text-orange-600' },
    { numberBg: 'bg-yellow-300', numberBorder: 'border-yellow-600', text: 'text-yellow-600' },
    { numberBg: 'bg-green-300', numberBorder: 'border-green-600', text: 'text-green-600' },
    { numberBg: 'bg-teal-300', numberBorder: 'border-teal-600', text: 'text-teal-600' },
    { numberBg: 'bg-indigo-300', numberBorder: 'border-indigo-600', text: 'text-indigo-600' },
    { numberBg: 'bg-purple-300', numberBorder: 'border-purple-600', text: 'text-purple-600' },
    { numberBg: 'bg-pink-300', numberBorder: 'border-pink-600', text: 'text-pink-600' },
  ];

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-gray-900'} transition-colors duration-500`}>
      <div className="max-w-3xl mx-auto mb-2 flex justify-end">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white rounded text-sm shadow-lg hover:from-indigo-700 hover:to-pink-700 transition"
        >
          Toggle Theme
        </button>
      </div>

      <div className="max-w-3xl mx-auto mb-4">
        <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400">
          {["Apply", "Personal Info", "Employee Details", "Loan Details", "Document Updates", "Summary", "Review", "Thank you"].map((stepLabel, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === 6;
            const colors = stepColors[index];
            return (
              <div
                key={stepLabel}
                className={`flex flex-col items-center w-full ${isActive ? colors.text + ' font-bold' : colors.text + ' opacity-70'}`}
                style={{ minWidth: '70px' }}
              >
                <div className={`rounded-full w-6 h-6 flex items-center justify-center mb-1 border ${isActive ? `${colors.numberBorder} ${colors.numberBg}` : 'border-gray-300 bg-gray-200'}`}>{stepNumber}</div>
                <div className="whitespace-nowrap">{stepLabel}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-md mx-auto mb-6">
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-pink-700 uppercase bg-pink-200 rounded-full shadow-sm">Step 6 of 8</span>
            <span className="text-xs font-semibold text-pink-700">60%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-pink-200 rounded">
            <div style={{ width: '60%' }} className="flex flex-col justify-center text-center text-white transition-all duration-700 bg-pink-500 shadow-lg" />
          </div>
        </div>
      </div>

      <div className={`max-w-3xl mx-auto p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} space-y-6 transition-colors duration-500`}>
        <h2 className="text-3xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">Summary</h2>

        <section className="p-5 rounded-lg border bg-red-50 border-red-200 space-y-3 shadow-sm transition-colors duration-300">
          <h3 className="text-xl font-semibold text-red-600">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
            <div><strong className="text-red-600">Name:</strong> Gourab</div>
            <div><strong className="text-red-600">Date of Birth:</strong> 2025-05-23</div>
            <div><strong className="text-red-600">Phone:</strong> 11111111111</div>
            <div><strong className="text-red-600">Email:</strong> a@gmail.com</div>
          </div>
        </section>

        <section className="p-5 rounded-lg border bg-yellow-50 border-yellow-200 space-y-3 shadow-sm transition-colors duration-300">
          <h3 className="text-xl font-semibold text-yellow-600">Employee Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
            <div><strong className="text-yellow-600">Status:</strong> full-time</div>
            <div><strong className="text-yellow-600">Company:</strong> Meta</div>
            <div><strong className="text-yellow-600">Monthly Income:</strong> 1000005</div>
            <div><strong className="text-yellow-600">Experience:</strong> 5 years</div>
            <div><strong className="text-yellow-600">Tax ID:</strong> tx50055</div>
          </div>
        </section>

        <section className="p-5 rounded-lg border bg-blue-50 border-blue-200 space-y-3 shadow-sm transition-colors duration-300">
          <h3 className="text-xl font-semibold text-blue-600">Loan Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
            <div><strong className="text-blue-600">Amount:</strong> 6000</div>
            <div><strong className="text-blue-600">Type:</strong> Auto Loan</div>
            <div><strong className="text-blue-600">Term:</strong> 6 months</div>
            <div><strong className="text-blue-600">EMI Date:</strong> 22.5.25</div>
          </div>
        </section>

        <section className="p-5 rounded-lg border bg-purple-50 border-purple-200 space-y-3 shadow-sm transition-colors duration-300">
          <h3 className="text-xl font-semibold text-purple-600">Document Updates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
            <div><strong className="text-purple-600">ID Updated:</strong> No</div>
            <div><strong className="text-purple-600">Preview:</strong> </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Summary;
