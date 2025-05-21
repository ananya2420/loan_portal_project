import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Summary = () => {
  const navigate = useNavigate();

  const { personalInfo, employeeDetails, loanDetails, documentUpdates } = useSelector(
    (state) => state.formData || {}
  );

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Summary</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Personal Info</h2>
        <p><strong>Name:</strong> {personalInfo?.name || 'N/A'}</p>
        <p><strong>Date of Birth:</strong> {personalInfo?.dob || 'N/A'}</p>
        <p><strong>Phone:</strong> {personalInfo?.phone || 'N/A'}</p>
        <p><strong>Email:</strong> {personalInfo?.email || 'N/A'}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Employee Details</h2>
        <p><strong>Status:</strong> {employeeDetails?.status || 'N/A'}</p>
        <p><strong>Company:</strong> {employeeDetails?.company || 'N/A'}</p>
        <p><strong>Monthly Income:</strong> {employeeDetails?.income || 'N/A'}</p>
        <p><strong>Experience:</strong> {employeeDetails?.experience || 'N/A'}</p>
        <p><strong>Tax ID:</strong> {employeeDetails?.taxId || 'N/A'}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Loan Details</h2>
        <p><strong>Amount:</strong> {loanDetails?.amount || 'N/A'}</p>
        <p><strong>Type:</strong> {loanDetails?.type || 'N/A'}</p>
        <p><strong>Repayment Term:</strong> {loanDetails?.repaymentTerm || 'N/A'}</p>
        <p><strong>EMI Date:</strong> {loanDetails?.emiDate || 'N/A'}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Document Updates</h2>
        <p><strong>ID Updated:</strong> {documentUpdates?.isUpdated === 'true' ? 'Yes' : 'No'}</p>
      </section>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate('/apply/document-updates')}
          className="px-5 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Back
        </button>
        <button
          onClick={() => navigate('/apply/review')}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Summary;
