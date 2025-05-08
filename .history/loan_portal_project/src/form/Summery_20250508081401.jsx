//Application For Structure
//show a read only summary of all user input with edts otion ad final submission

import React from 'react'

const Summery = ({ userData, onEdit, onSubmit }) => {

  const { personalInfo, employeeDetails = {}, loanDetails, documentUpdate } = userData;

  return (
    <div>
      <h2>User Summary</h2> 

      <section>
        <h3>Personal information</h3>
        <p><strong>Name:</strong> {personalInfo?.name}</p>
        <p><strong>Date of birth:</strong> {personalInfo?.dob}</p>
        <p><strong>Phone number:</strong> {personalInfo?.phone}</p>
        <p><strong>Email address:</strong> {personalInfo?.email}</p>
      </section>

      <section>
        <h3>Employee details</h3> 
        <p><strong>Status:</strong> {employeeDetails?.status || 'N/A'}</p>
        <p><strong>Company name:</strong> {employeeDetails?.company || 'N/A'}</p>
        <p><strong>Monthly Income:</strong> {employeeDetails?.income || 'N/A'}</p>
        <p><strong>Experience:</strong> {employeeDetails?.experience || 'N/A'}</p>
        <p><strong>Tax ID:</strong> {employeeDetails?.taxId || 'N/A'}</p>
      </section>

      <section>
        <h3>Loan Details</h3> 
        <p><strong>Loan Amount:</strong> {loanDetails?.amount || 'N/A'}</p>
        <p><strong>Loan Type:</strong> {loanDetails?.type || 'N/A'}</p>
        <p><strong>Repayment Term:</strong> {loanDetails?.term || 'N/A'}</p>
        <p><strong>Preferred EMI Date:</strong> {loanDetails?.emiDate || 'N/A'}</p>
      </section>

      <section>
        <h3>Document Update</h3>
        <p><strong>ID Status:</strong> {documentUpdate?.idUpdated ? "Updated" : "Pending"}</p>
      </section>

      <div>
        <button onClick={onEdit}>Edit</button> 
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Summery;
