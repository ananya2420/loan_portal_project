//Application For Structure
//show a read only summary of all user input with edts otion ad final submission
//react-hook-form 
//add progress bar

//Application For Structure
//show a read only summary of all user input with edts otion ad final submission

// Summery.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Summery = ({ userData, onEdit, onSubmit, mode }) => {
  const { personalInfo, EmployeeDetails = {}, loanDetails, DocumentUpdates } = userData;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: personalInfo || {}
  });

  const submitUpdatedInfo = (data) => {
    console.log('Updated Personal Info:', data);
    onSubmit(data);
  };

  const handleGoToReview = () => {
    navigate('/apply/review');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">User Summary</h2>

      {mode === 'edit' ? (
        <form onSubmit={handleSubmit(submitUpdatedInfo)} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold">Edit Personal Information</h3>

          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full border rounded p-2"
              defaultValue={personalInfo?.name || ""}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              {...register('dob', { required: 'DOB is required' })}
              className="w-full border rounded p-2"
              defaultValue={personalInfo?.dob || ""}
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              {...register('phone', { required: 'Phone number is required' })}
              className="w-full border rounded p-2"
              defaultValue={personalInfo?.phone || ""}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full border rounded p-2"
              defaultValue={personalInfo?.email || ""}
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
          {mode !== 'submit' && (
            <section className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
              <p><strong>Name:</strong> {personalInfo?.name}</p>
              <p><strong>Date of birth:</strong> {personalInfo?.dob}</p>
              <p><strong>Phone number:</strong> {personalInfo?.phone}</p>
              <p><strong>Email address:</strong> {personalInfo?.email}</p>
            </section>
          )}

          {mode === 'submit' && (
            <>
              <section className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Employee Details</h3>
                <p><strong>Status:</strong> {EmployeeDetails?.status}</p>
                <p><strong>Company:</strong> {EmployeeDetails?.company}</p>
                <p><strong>Monthly Income:</strong> ${EmployeeDetails?.income}</p>
                <p><strong>Experience:</strong> {EmployeeDetails?.experience} years</p>
                <p><strong>Tax ID:</strong> {EmployeeDetails?.taxId}</p>
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
                <p><strong>ID Updated:</strong> {DocumentUpdates?.isUpdated ? 'Yes' : 'No'}</p>
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

          {mode !== 'submit' && (
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={onEdit}
                className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={onSubmit}
                className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Summery;
