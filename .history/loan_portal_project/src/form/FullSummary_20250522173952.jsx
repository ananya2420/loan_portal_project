import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FullSummary = () => {
  const navigate = useNavigate();
  const { personalInfo, employeeDetails, loanDetails, documentUpdates } =
    useSelector((state) => state.formData || {});

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Loan Application</h2>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2"></h3>
        <p><strong>Name:</strong> Gourab</p>
        <p><strong>Date of Birth:</strong> 21.05.25</p>
        <p><strong>Phone:</strong> 01700-675324</p>
        <p><strong>Email:</strong> aborty@gmail.com</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Employee Details</h3>
        <p><strong>Status:</strong> Full time</p>
        <p><strong>Company:</strong> Brain Station</p>
        <p><strong>Monthly Income:</strong> 10,000</p>
        <p><strong>Experience:</strong> 5 years</p>
        <p><strong>Tax ID:</strong> tx555055</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Loan Details</h3>
        <p><strong>Amount:</strong> 20,000 </p>
        <p><strong>Type:</strong> Home Loan</p>
        <p><strong>Term:</strong> 6 months</p>
        <p><strong>EMI Date:</strong> 22.05.25</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Document Updates</h3>
        <p><strong>ID Updated:</strong> {documentUpdates?.isUpdated === 'true' ? 'Yes' : 'No'}</p>
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

