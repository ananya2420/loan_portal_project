import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
//import PersonalInformation from './PersonalInformation';
import 
import EmployeeDetails from './EmployeeDetails'; // you'll need this next step

const ApplyForm = () => {
  const [userData, setUserData] = useState({});

  return (
    <Routes>
      <Route path="personal-info" element={<PersonalInformation userData={userData} setUserData={setUserData} />} />
      <Route path="employee-details" element={<EmployeeDetails userData={userData} setUserData={setUserData} />} />
    </Routes>
  );
};

export default ApplyForm;
