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

  // Grab theme from Redux (assuming you have themeSlice like in Summary)
  const theme = useSelector((state) => state.theme.theme);

  // Helper to format name for display
  const getFullName = () => {
    if (personalInfo.name) return personalInfo.name;
    if (personalInfo.firstName && personalInfo.lastName) return `${personalInfo.firstName} ${personalInfo.lastName}`;
    return 'N/A';
  };

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div
        className={`max-w-3xl mx-auto p-6 rounded-xl shadow ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
        } space-y-6`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Loan Application Full Summary
        </h2>

        <section className={`p-4 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} space-y-2`}>
          <h3 className="text-xl font-semibold mb-2 text-teal-600">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong className="text-purple-700">Name:</strong> {getFullName()}</p>
              <p><strong className="text-purple-700">Phone:</strong> {personalInfo.phone || personalInfo.phoneNumber || 'N/A'}</p>
            </div>
            <div>
              <p><strong className="text-purple-700">Date of Birth:</strong> {personalInfo.dob || personalInfo.dateOfBirth || 'N/A'}</p>
              <p><strong className="text-purple-700">Email:</strong> {personalInfo.email || 'N/A'}</p>
            </div>
          </div>
        </section>

        <section className={`p-4 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} space-y-2`}>
          <h3 className="text-xl font-semibold mb-2 text-green-600">Employee Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong className="text-yellow-700">Status:</strong> {employeeDetails.status || 'N/A'}</p>
              <p><strong className="text-yellow-700">Monthly Income:</strong> {employeeDetails.income || 'N/A'}</p>
              <p><strong className="text-yellow-700">Tax ID:</strong> {employeeDetails.taxId || 'N/A'}</p>
            </div>
            <div>
              <p><strong className="text-yellow-700">Company:</strong> {employeeDetails.company || 'N/A'}</p>
              <p><strong className="text-yellow-700">Experience:</strong> {employeeDetails.experience ? `${employeeDetails.experience} years` : 'N/A'}</p>
            </div>
          </div>
        </section>

        <section className={`p-4 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} space-y-2`}>
          <h3 className="text-xl font-semibold mb-2 text-pink-600">Loan Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong className="text-red-600">Amount:</strong> {loanDetails.amount || 'N/A'}</p>
              <p><strong className="text-red-600">Term:</strong> {loanDetails.repaymentTerm ? `${loanDetails.repaymentTerm} months` : 'N/A'}</p>
            </div>
            <div>
              <p><strong className="text-red-600">Type:</strong> {loanDetails.type || 'N/A'}</p>
              <p><strong className="text-red-600">EMI Date:</strong> {loanDetails.emiDate || 'N/A'}</p>
            </div>
          </div>
        </section>

        <section className={`p-4 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} space-y-2`}>
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Document Updates</h3>
          <p>
            <strong className="text-indigo-700">ID Updated:</strong>{' '}
            {documentUpdates.isUpdated === 'true'
              ? 'Yes'
              : documentUpdates.isUpdated === 'false'
              ? 'No'
              : 'N/A'}
          </p>
          {documentUpdates.previewUrl && (
            <div className="mt-4">
              <strong className="text-indigo-700">Preview:</strong>
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
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded text-sm"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullSummary;



