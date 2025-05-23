// ApplyForm.js
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PersonalInformation from './PersonalInformation';
import EmployeeDetails from './EmployeeDetails';
import LoanDetails from './LoanDetails';

const ApplyForm = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  // Called when PersonalInformation form submits Next
  const handlePersonalInfoSubmit = (data) => {
    // Save data first
    setUserData(prev => ({ ...prev, ...data }));

    // Navigate forward to EmployeeDetails
    navigate('employee-details');

    // Clear personal-info data AFTER navigation (so next time form is empty)
    setTimeout(() => {
      setUserData(prev => ({
        ...prev,
        name: '',
        dob: '',
        phone: '',
        email: '',
      }));
    }, 100);
  };

  // Called when EmployeeDetails Back button clicked
  const handleBackToPersonalInfo = () => {
    // Navigate back to PersonalInformation without clearing data
    navigate('personal-info');
  };

  return (
    <Routes>
      <Route
        path="personal-info"
        element={
          <PersonalInformation
            userData={userData}
            setUserData={setUserData}
            onSubmit={handlePersonalInfoSubmit}
          />
        }
      />
      <Route
        path="employee-details"
        element={
          <EmployeeDetails
            userData={userData}
            setUserData={setUserData}
            onBack={handleBackToPersonalInfo}
          />
        }
      />
      <Route
        path="loan-details"
        element={<LoanDetails userData={userData} setUserData={setUserData} />}
      />
    </Routes>
  );
};

export default ApplyForm;
