//Application For Structure
//show a read only summary of all user input with edts otion ad final submission
//react-hook-form 
//add progress bar

// src/pages/Summery.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import { setPersonalInfo } from '../redux/formSlice';
import { setPersonalInfo } from '../store/formSlice';
import ProgressBar from '../components/progressbar';

const Summery = ({ mode, onEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formData = useSelector((state) => state.formData || {});
  const {
    personalInfo = {},
    loanDetails = {},
    documentUpdates: DocumentUpdates = {},
    EmployeeDetails = {},
  } = formData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: personalInfo });

  const submitUpdatedInfo = (data) => {
    dispatch(setPersonalInfo(data));
    navigate('/review');
  };

  const handleFinalSubmit = () => {
    // Assuming all data already in store
    navigate('/review');
  };

  const currentStep = 5;
  const totalSteps = 5;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <h2 className="text-2xl font-bold text-center mb-4">User Summary</h2>

      {mode === 'edit' ? (
        <form onSubmit={handleSubmit(submitUpdatedInfo)} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold">Edit Personal Information</h3>

          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full border rounded p-2"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              {...register('dob', { required: 'DOB is required' })}
              className="w-full border rounded p-2"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              {...register('phone', { required: 'Phone number is required' })}
              className="w-full border rounded p-2"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full border rounded p-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={onEdit}
              className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <>
          <section className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
            <p><strong>Name:</strong> {personalInfo?.name}</p>
            <p><strong>Date of birth:</strong> {personalInfo?.dob}</p>
            <p><strong>Phone number:</strong> {personalInfo?.phone}</p>
            <p><strong>Email address:</strong> {personalInfo?.email}</p>
          </section>

          <section className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Employee Details</h3>
            <p><strong>Status:</strong> {EmployeeDetails?.status || 'N/A'}</p>
            <p><strong>Company name:</strong> {EmployeeDetails?.company || 'N/A'}</p>
            <p><strong>Monthly Income:</strong> {EmployeeDetails?.income || 'N/A'}</p>
            <p><strong>Experience:</strong> {EmployeeDetails?.experience || 'N/A'}</p>
            <p><strong>Tax ID:</strong> {EmployeeDetails?.taxId || 'N/A'}</p>
          </section>

          <section className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Loan Details</h3>
            <p><strong>Loan Amount:</strong> {loanDetails?.amount || 'N/A'}</p>
            <p><strong>Loan Type:</strong> {loanDetails?.type || 'N/A'}</p>
            <p><strong>Repayment Term:</strong> {loanDetails?.term || 'N/A'}</p>
            <p><strong>Preferred EMI Date:</strong> {loanDetails?.emiDate || 'N/A'}</p>
          </section>

          <section className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Document Update</h3>
            <p><strong>ID Status:</strong> {DocumentUpdates?.isUpdated ? 'Updated' : 'Pending'}</p>
          </section>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={onEdit}
              className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleFinalSubmit}
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





