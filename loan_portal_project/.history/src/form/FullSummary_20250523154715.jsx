import React from 'react'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FullSummary = () => {
  const navigate = useNavigate();

  // Grab all form data slices from Redux
  const {
    personalInfo = {},
    employeeDetails = {},
    loanDetails = {},
    documentUpdates = {},
  } = useSelector((state) => state.formData || {});

  // Helper to format name for display
  const getFullName = () => {
    if (personalInfo.name) return personalInfo.name;
    if (personalInfo.firstName && personalInfo.lastName) return `${personalInfo.firstName} ${personalInfo.lastName}`;
    return 'N/A';
  };

  return (
    <div className="min-h-screen p-4 bg-white text-black">
      <div className="max-w-3xl mx-auto p-6 rounded-xl shadow bg-white space-y-6">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Loan Application Full Summary
        </h2>

        <section className="p-4 rounded border bg-gray-50 space-y-2">
          <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Name:</strong> {getFullName()}</p>
              <p><strong>Phone:</strong> {personalInfo.phone || personalInfo.phoneNumber || 'N/A'}</p>
            </div>
            <div>
              <p><strong>Date of Birth:</strong> {personalInfo.dob || personalInfo.dateOfBirth || 'N/A'}</p>
              <p><strong>Email:</strong> {personalInfo.email || 'N/A'}</p>
            </div>
          </div>
        </section>

        <section className="p-4 rounded border bg-gray-50 space-y-2">
          <h3 className="text-xl font-semibold mb-2">Employee Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Status:</strong> {employeeDetails.status || 'N/A'}</p>
              <p><strong>Monthly Income:</strong> {employeeDetails.income || 'N/A'}</p>
              <p><strong>Tax ID:</strong> {employeeDetails.taxId || 'N/A'}</p>
            </div>
            <div>
              <p><strong>Company:</strong> {employeeDetails.company || 'N/A'}</p>
              <p><strong>Experience:</strong> {employeeDetails.experience ? `${employeeDetails.experience} years` : 'N/A'}</p>
            </div>
          </div>
        </section>

        <section className="p-4 rounded border bg-gray-50 space-y-2">
          <h3 className="text-xl font-semibold mb-2">Loan Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Amount:</strong> {loanDetails.amount || 'N/A'}</p>
              <p><strong>Term:</strong> {loanDetails.repaymentTerm ? `${loanDetails.repaymentTerm} months` : 'N/A'}</p>
            </div>
            <div>
              <p><strong>Type:</strong> {loanDetails.type || 'N/A'}</p>
              <p><strong>EMI Date:</strong> {loanDetails.emiDate || 'N/A'}</p>
            </div>
          </div>
        </section>

        <section className="p-4 rounded border bg-gray-50 space-y-2">
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
    </div>
  );
};

export default FullSummary;






