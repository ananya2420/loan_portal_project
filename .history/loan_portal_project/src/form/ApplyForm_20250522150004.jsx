import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PersonalInformation from './personal information';
import EmployeeDetails from './Employee Details';
import LoanDetails from './Loan Details';

const ApplyForm = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handlePersonalInfoSubmit = (data) => {
    // Save personal info data first
    setUserData(prev => ({
      ...prev,
      ...data,
    }));

    // Navigate next
    navigate('employee-details');

    // Then clear personal info fields after navigating
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

  const handleBackToPersonalInfo = () => {
    // Navigate back to personal info; data stays because we don't clear here
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
