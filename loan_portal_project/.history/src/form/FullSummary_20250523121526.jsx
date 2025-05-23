import React from 'react'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FullSummary = () => {
  const navigate = useNavigate();
  const { personalInfo, employeeDetails, loanDetails, documentUpdates } =
    useSelector((state) => state.formData || {});

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Loan Application Full Summary</h2>

      <section>
        <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
        <p><strong>Name:</strong> {personalInfo?.firstName && personalInfo?.lastName ? `${personalInfo.firstName} ${personalInfo.lastName}` : personalInfo?.fullName || personalInfo?.name || 'N/A'}</p>
        <p><strong>Date of Birth:</strong> {personalInfo?.dateOfBirth || personalInfo?.dob || 'N/A'}</p>
        <p><strong>Phone:</strong> {personalInfo?.phoneNumber || personalInfo?.phone || 'N/A'}</p>
        <p><strong>Email:</strong> {personalInfo?.email || 'N/A'}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Employee Details</h3>
        <p><strong>Status:</strong> {employeeDetails?.status || 'N/A'}</p>
        <p><strong>Company:</strong> {employeeDetails?.company || 'N/A'}</p>
        <p><strong>Monthly Income:</strong> {employeeDetails?.income || 'N/A'}</p>
        <p><strong>Experience:</strong> {employeeDetails?.experience ? `${employeeDetails.experience} years` : 'N/A'}</p>
        <p><strong>Tax ID:</strong> {employeeDetails?.taxId || 'N/A'}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Loan Details</h3>
        <p><strong>Amount:</strong> {loanDetails?.amount || 'N/A'}</p>
        <p><strong>Type:</strong> {loanDetails?.type || 'N/A'}</p>
        <p><strong>Term:</strong> {loanDetails?.repaymentTerm ? `${loanDetails.repaymentTerm} months` : 'N/A'}</p>
        <p><strong>EMI Date:</strong> {loanDetails?.emiDate || 'N/A'}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Document Updates</h3>
        <p><strong>ID Updated:</strong> {documentUpdates?.isUpdated === 'true' ? 'Yes' : documentUpdates?.isUpdated === 'false' ? 'No' : 'N/A'}</p>
        {documentUpdates?.previewUrl && (
          <img
            src={documentUpdates.previewUrl}
            alt="Document Preview"
            className="mt-2 max-h-48 rounded border"
          />
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
