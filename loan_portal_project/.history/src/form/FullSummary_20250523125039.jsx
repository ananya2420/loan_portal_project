import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FullSummary = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const { personalInfo, employeeDetails, loanDetails, documentUpdates } =
    useSelector((state) => state.formData || {});

  return (
    <div
      className={`min-h-screen p-4 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div
        className={`max-w-3xl mx-auto p-4 rounded-xl shadow ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
        } space-y-5`}
      >
        <h2 className="text-2xl font-bold text-center">Loan Application Full Summary</h2>

        {[
          {
            title: 'Personal Information',
            content: [
              {
                label: 'Name',
                value:
                  personalInfo?.firstName && personalInfo?.lastName
                    ? `${personalInfo.firstName} ${personalInfo.lastName}`
                    : personalInfo?.fullName || personalInfo?.name || 'N/A',
              },
              { label: 'Date of Birth', value: personalInfo?.dateOfBirth || personalInfo?.dob || 'N/A' },
              { label: 'Phone', value: personalInfo?.phoneNumber || personalInfo?.phone || 'N/A' },
              { label: 'Email', value: personalInfo?.email || 'N/A' },
            ],
          },
          {
            title: 'Employee Details',
            content: [
              { label: 'Status', value: employeeDetails?.status || 'N/A' },
              { label: 'Company', value: employeeDetails?.company || 'N/A' },
              { label: 'Monthly Income', value: employeeDetails?.income || 'N/A' },
              {
                label: 'Experience',
                value: employeeDetails?.experience
                  ? `${employeeDetails.experience} years`
                  : 'N/A',
              },
              { label: 'Tax ID', value: employeeDetails?.taxId || 'N/A' },
            ],
          },
          {
            title: 'Loan Details',
            content: [
              { label: 'Amount', value: loanDetails?.amount || 'N/A' },
              { label: 'Type', value: loanDetails?.type || 'N/A' },
              {
                label: 'Term',
                value: loanDetails?.repaymentTerm
                  ? `${loanDetails.repaymentTerm} months`
                  : 'N/A',
              },
              { label: 'EMI Date', value: loanDetails?.emiDate || 'N/A' },
            ],
          },
          {
            title: 'Document Updates',
            content: [
              {
                label: 'ID Updated',
                value:
                  documentUpdates?.isUpdated === 'true'
                    ? 'Yes'
                    : documentUpdates?.isUpdated === 'false'
                    ? 'No'
                    : 'N/A',
              },
              {
                label: 'Preview',
                value: documentUpdates?.previewUrl || null,
              },
            ],
          },
        ].map((section, i) => (
          <section
            key={i}
            className={`p-4 rounded border ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            } space-y-2`}
          >
            <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {section.content.map((item, j) => (
                <div key={j}>
                  <strong>{item.label}:</strong>{' '}
                  {item.label === 'Preview' && item.value ? (
                    <img
                      src={item.value}
                      alt="Document Preview"
                      className="mt-2 max-h-48 rounded border"
                    />
                  ) : (
                    item.value
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="flex justify-start mt-4">
          <button
            onClick={() => navigate('/apply/summary')}
            className="px-4 py-1.5 bg-gray-600 text-white rounded text-sm"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullSummary;
