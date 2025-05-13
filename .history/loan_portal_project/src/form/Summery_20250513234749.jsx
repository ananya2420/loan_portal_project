//Application For Structure
//show a read only summary of all user input with edts otion ad final submission
//react-hook-form 
//add progress bar

//Application For Structure
//show a read only summary of all user input with edts otion ad final submission

// Summery.jsx
 import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import Apply from './components/Apply';
import Review from './components/review';
import Thankyou from './components/thank-you';
import Summery from './form/Summery';
import PersonalInformation from './form/personal information';
import EmployeeDetails from './form/Employee Details';
import LoanDetails from './form/Loan Details';
import DocumentUpdates from './form/document updates';
import UpdatedPicture from './form/updatedID';
import LoginForm from './Login/Login';
import ProgressBar from './components/progressbar';

function App() {
  const [userData, setUserData] = useState({
    personalInfo: {
      name: '',
      dob: '',
      phone: '',
      email: '',
    },
    employeeDetails: {
      status: '',
      company: '',
      income: '',
      experience: '',
      taxId: '',
    },
    loanDetails: {},
    documentUpdates: {},
  });

  const [viewMode, setViewMode] = useState(null); // 'edit' or 'submit'

  const handleEdit = () => setViewMode('edit');
  const handleSubmit = () => setViewMode('submit');

  return (
    <BrowserRouter>
      <ProgressBar />
      <div className="form-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Navigate to="/apply/personal-info" />} />
          <Route
            path="/apply/personal-info"
            element={<PersonalInformation userData={userData} setUserData={setUserData} />}
          />
          <Route path="/apply/employee-details" element={<EmployeeDetails />} />
          <Route path="/apply/loan-details" element={<LoanDetails />} />
          <Route path="/apply/updated-picture" element={<UpdatedPicture />} />
          <Route path="/apply/document-updates" element={<DocumentUpdates />} />
          <Route
            path="/apply/summary"
            element={<Summery userData={userData} onEdit={handleEdit} onSubmit={handleSubmit} mode={viewMode} />}
          />
          <Route path="/apply/review" element={<Review />} />
          <Route path="/thank-you" element={<Thankyou />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App; import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Summery = ({ userData, onSubmit }) => {
  const { personalInfo, EmployeeDetails = {}, loanDetails, DocumentUpdates } = userData;
  const navigate = useNavigate();

  const [step, setStep] = useState('view'); // 'view' | 'edit' | 'submit'

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
    setStep('view'); // return to view after save
  };

  const handleGoToReview = () => {
    navigate('/apply/review');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">User Summary</h2>

      {/* STEP: EDIT PERSONAL INFO */}
      {step === 'edit' ? (
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

          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={() => setStep('view')}
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
          {/* STEP: VIEW PERSONAL INFO */}
          {step === 'view' && (
            <section className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
              <p><strong>Name:</strong> {personalInfo?.name}</p>
              <p><strong>Date of birth:</strong> {personalInfo?.dob}</p>
              <p><strong>Phone number:</strong> {personalInfo?.phone}</p>
              <p><strong>Email address:</strong> {personalInfo?.email}</p>
            </section>
          )}

          {/* STEP: SUBMIT SHOWS EXTRA DETAILS */}
          {step === 'submit' && (
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

          {/* COMMON CONTROL BUTTONS */}
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