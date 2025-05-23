import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FullSummary = () => {
  const navigate = useNavigate();
  const {
    personalInfo = {},
    employeeDetails = {},
    loanDetails = {},
    documentUpdates = {},
  } = useSelector((state) => state.formData || {});

  return (
    <div
      className="max-w-3xl mx-auto p-6 rounded shadow bg-white dark:bg-gray-800 dark:text-white"
      style={{ minHeight: '100vh' }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Loan Application Full Summary</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
        <p><strong>Name:</strong>{' '}
          {personalInfo.firstName && personalInfo.lastName
            ? `${personalInfo.firstName} ${personalInfo.lastName}`
            : personalInfo.fullName || personalInfo.name || 'N/A'}
        </p>
        <p><strong>Date of Birth:</strong> {personalInfo.dob || personalInfo.dateOfBirth || 'N/A'}</p>
        <p><strong>Phone:</strong> {personalInfo.phone || personalInfo.phoneNumber || 'N/A'}</p>
        <p><strong>Email:</strong> {personalInfo.email || 'N/A'}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Employee Details</h3>
        <p><strong>Status:</strong> {employeeDetails.status || 'N/A'}</p>
        <p><strong>Company:</strong> {employeeDetails.company || 'N/A'}</p>
        <p><strong>Monthly Income:</strong> {employeeDetails.income || employeeDetails.monthlyIncome || 'N/A'}</p>
        <p><strong>Experience:</strong> {employeeDetails.experience ? `${employeeDetails.experience} years` : 'N/A'}</p>
        <p><strong>Tax ID:</strong> {employeeDetails.taxId || 'N/A'}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Loan Details</h3>
        <p><strong>Amount:</strong> {loanDetails.amount || 'N/A'}</p>
        <p><strong>Type:</strong> {loanDetails.type || 'N/A'}</p>
        <p><strong>Term:</strong> {loanDetails.repaymentTerm ? `${loanDetails.repaymentTerm} months` : loanDetails.term || 'N/A'}</p>
        <p><strong>EMI Date:</strong> {loanDetails.emiDate || 'N/A'}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Document Updates</h3>
        <p>
          <strong>ID Updated:</strong>{' '}
          {documentUpdates.isUpdated === 'true'
            ? 'Yes'
            : documentUpdates.isUpdated === 'false'
            ? 'No'
            : 'N/A'}
        </p>
        {documentUpdates.previewUrl && (
          <div className="mt-4">
            <strong>Preview:</strong>
            <img
              src={documentUpdates.previewUrl}
              alt="Document Preview"
              className="mt-2 max-h-48 rounded border"
            />
          </div>
        )}
      </section>

      <div className="mt-6 flex justify-start">
        <button
          onClick={() => navigate('/apply/summary')}
          className="px-4 py-2 bg-gray-600 text-white rounded text-sm"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default FullSummary;

