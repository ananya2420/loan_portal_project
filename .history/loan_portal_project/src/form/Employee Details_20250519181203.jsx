//Application For Structure
//add react-hook-form
//conditional logic in forms 
//Add progress bar indicator

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployeeDetails } from '../store/formSlice';
import { toggleTheme } from '../redux/slices/themeSlice';
import ProgressBar from '../components/progressbar';

// Sample company data with full details to autofill
const sampleCompanies = [
  {
    company: 'Brain station',
    status: 'full-time',
    income: 5000,
    taxId: 'T999888777',
  },
  {
    company: 'Design Studio',
    status: 'part-time',
    income: 3000,
    taxId: '',
  },
  {
    company: 'Freelance Inc.',
    status: 'self-employed',
    income: 7000,
    taxId: 'TX1234567',
  },
  // Add more sample companies if you want
];

const EmployeeDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.theme);
  const savedData = useSelector((state) => state.formData?.employeeDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: savedData || { company: '', status: '', income: '', taxId: '' },
  });

  const employmentStatus = watch('status');
  const watchCompany = watch('company');

  // Manage filtered companies for autocomplete dropdown
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    if (watchCompany) {
      const filtered = sampleCompanies.filter((c) =>
        c.company.toLowerCase().includes(watchCompany.toLowerCase())
      );
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies([]);
    }
  }, [watchCompany]);

  // Required fields logic
  const requiredFields = ['company', 'status', 'income'];
  if (employmentStatus === 'self-employed') requiredFields.push('taxId');

  // Count valid & filled fields
  const watchedValues = watch();
  const validFieldsCount = requiredFields.filter(
    (field) => !errors[field] && watchedValues[field]
  ).length;
  const totalSteps = requiredFields.length;

  // Fill fields when user clicks suggestion
  const handleSelectCompany = (companyData) => {
    setValue('company', companyData.company);
    setValue('status', companyData.status);
    setValue('income', companyData.income);
    setValue('taxId', companyData.taxId || '');
    setFilteredCompanies([]); // hide dropdown
  };

  const onSubmit = (data) => {
    dispatch(setEmployeeDetails(data));
    navigate('/apply/loan-details');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleBack = () => {
    navigate('/apply/personal-info');
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Toggle Theme Button */}
      <div className="w-full max-w-md flex justify-end mb-4 px-0">
        <button
          onClick={handleToggleTheme}
          className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Toggle Theme
        </button>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className={`p-8 rounded-lg shadow-md w-full max-w-md text-center transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <ProgressBar currentStep={validFieldsCount} totalSteps={totalSteps} />
        <h2 className="mb-4 text-2xl font-bold text-center">Employment Details</h2>

        {/* Company input with autocomplete */}
        <div className="relative text-left">
          <input
            placeholder="Company Name"
            {...register('company', { required: 'Company name is required' })}
            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          />
          {errors.company && (
            <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>
          )}

          {filteredCompanies.length > 0 && (
            <ul
              className={`absolute z-10 w-full max-h-40 overflow-auto mt-1 bg-white border border-gray-300 rounded shadow-lg ${
                theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
              }`}
            >
              {filteredCompanies.map((company, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                  onClick={() => handleSelectCompany(company)}
                >
                  {company.company}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Status select */}
        <select
          {...register('status', { required: 'Employment status is required' })}
          className={`w-full p-3 mt-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-black'
          }`}
        >
          <option value="">Select Status</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="self-employed">Self-employed</option>
        </select>
        {errors.status && <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>}

        {/* Income input */}
        <input
          type="number"
          placeholder="Monthly Income"
          {...register('income', {
            required: 'Income is required',
            valueAsNumber: true,
          })}
          className={`w-full p-3 mt-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-black'
          }`}
        />
        {errors.income && <p className="text-sm text-red-500 mt-1">{errors.income.message}</p>}

        {/* Tax ID for self-employed */}
        {employmentStatus === 'self-employed' && (
          <div>
            <input
              placeholder="Tax ID"
              {...register('taxId', {
                required: 'Tax ID is required for self-employed individuals',
              })}
              className={`w-full p-3 mt-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-black'
              }`}
            />
            {errors.taxId && <p className="text-sm text-red-500 mt-1">{errors.taxId.message}</p>}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded transition duration-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition duration-300"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeDetails;


