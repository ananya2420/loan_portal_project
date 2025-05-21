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
import LoanDetails from './Loan Details';

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
            <label className="block font-semibold mb-1">ID Updated</label>
            <select
              {...register('documentUpdates.isUpdated', {
                required: 'Selection is required',
              })}
              className="w-full border rounded px-4 py-2"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors?.documentUpdates?.isUpdated && (
              <p className="text-red-500 text-sm mt-1">
                {errors.documentUpdates.isUpdated.message}
              </p>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="max-w-4xl mx-auto mb-6">
        <ProgressBar currentStep={5} totalSteps={5} />
      </div>

      {/* Toggle Bar */}
      <div className="max-w-4xl mx-auto mb-4 flex justify-end">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
        >
          Toggle Theme
        </button>
      </div>

      {/* Step tracker */}
      <div className="flex justify-between max-w-md mx-auto mb-6 px-4 w-full">
        {[
          'Apply',
          'Personal Info',
          'Employee Details',
          'Loan Details',
          'Document Updates',
          'Summary',
          'Review',
          'Thank You',
          
        ].map((label, index) => {
          const stepNumber = index + 1;
          const isActive = label === 'Summary';

          return (
            <div key={label} className="flex flex-col items-center w-1/8">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {stepNumber}
              </div>
              <div className={`text-xs text-center ${isActive ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
                {label}
              </div>
            </div>
          );
        })}
      </div>




      <div className="w-full max-w-md mx-auto">
        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
              Step 5 of 8
            </span>
            <span className="text-xs font-semibold text-teal-600">50%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
            <div
              style={{ width: '50%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-lg space-y-6 bg-white">
        <h2 className="text-3xl font-bold text-center">Summary</h2>

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
  onClick={() => {
    if (editStep > 0) {
      setEditStep((prev) => prev - 1);
    } else {
      setIsEditing(false);
      setEditStep(0);
      navigate('/apply/summary');
    }
  }}
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
                  { label: 'Name', value: 'Gourab' },
                  { label: 'Date of Birth', value: '21.05.2025' },
                  { label: 'Phone', value: '01700' },
                  { label: 'Email', value: 'aborty@gmail.com' },
                ],
              },
              {
                title: 'Employee Details',
                content: [
                  { label: 'Status', value: 'Full time' },
                  { label: 'Company', value: 'Brain Station' },
                  {
                    label: 'Monthly Income',
                    value: '10,000',
                  },
                  {
                    label: 'Experience',
                    value: '5 years',
                  },
                  { label: 'Tax ID', value: 'tx555055'},
                ],
              },
              {
                title: 'Loan Details',
                content: [
                  { label: 'Amount', value: loanDetails?.amount ? `$${loanDetails.amount}` : 'N/A' },
                  { label: 'Type', value: loanDetails?.type },
                  {
                    label: 'Term',
                    value: loanDetails?.repaymentTerm ? `${loanDetails.repaymentTerm} months` : 'N/A',
                  },
                  { label: 'EMI Date', value: loanDetails?.emiDate },
                ],
              },
              {
                title: 'Document Updates',
                content: [
                  {
                    label: 'ID Updated',
                    value: documentUpdates?.isUpdated === 'false' ? 'No' : 'Yes',
                  },
                ],
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
                onClick={() => navigate('/apply/document-updates')}
                className="px-5 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Back
              </button>

              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditStep(0);
                }}
                className="px-6 py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600"
              >
                Edit Summary
              </button>

              <button
                onClick={() => navigate('/apply/review')}
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Summary;