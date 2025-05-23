import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PersonalInformation from './personal information';
import EmployeeDetails from './Employee Details';

const ApplyForm = () => {
  const [userData, setUserData] = useState({});

  return (
    <Routes>
      <Route path="personal-info" element={<PersonalInformation userData={userData} setUserData={setUserData} />} />
      <Route path="employee-details" element={<EmployeeDetails userData={userData} setUserData={setUserData} />} />
      <Route 
    </Routes>
  );
};

export default ApplyForm;
