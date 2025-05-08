//Application For Structure
//show a read only summary of all user input with edts otion ad final submission

import React from 'react'

const Summery = ({ userData, onEdit, onSubmit }) => {
  const { personalInfo, employeeDetails = {}, loanDetails, documentUpdate } = userData;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">User Summary</h2> 

      <section className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
        <p><strong>Name:</strong> {personalInfo?.name}</p>
        <p><strong>Date of birth:</strong> {personalInfo?.dob}</p>
        <p><strong>Phone number:</strong> {personalInfo?.phone}</p>
        <p><strong>Email address:</strong> {personalInfo?.email}</p>
      </section>

      <section className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Employee Details</h3> 
        <p><strong>Status:</strong> {employeeDetails?.status || 'N/A'}</p>
        <p><strong>Company name:</strong> {employeeDetails?.company || 'N/A'}</p>
        <p><strong>Monthly Income:</strong> {employeeDetails?.income || 'N/A'}</p>
        <p><strong>Experience:</strong> {employeeDetails?.experience || 'N/A'}</p>
        <p><strong>Tax ID:</strong> {employeeDetails?.taxId || 'N/A'}</p>
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
        <p><strong>ID Status:</strong> {documentUpdate?.idUpdated ? "Updated" : "Pending"}</p>
      </section>

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
    </div>
  )
}

export default Summery

