import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PersonalInformation from './personal information';
import EmployeeDetails from './Employee Details';
import LoanDetails from './Loan Details';

const ApplyForm = () => {
  const [userData, setUserData] = useState({});

  return (
    <Routes>
      <Route path="personal-info" element={<PersonalInformation userData={userData} setUserData={setUserData} />} />
      <Route path="employee-details" element={<EmployeeDetails userData={userData} setUserData={setUserData} />} />
      <Route path="loan-details" element={<LoanDetails userData={userData} setUserData={setUserData} }
    </Routes>
  );
};

export default ApplyForm;
