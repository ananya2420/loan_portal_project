import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
//import PersonalInformation from './PersonalInformation';
import PersonalInformation from './personal information';

const ApplyForm = () => {
  const [userData, setUserData] = useState(null);

  const handlePersonalInfoSubmit = (data) => {
    setUserData(data); // save personal info data in parent
    // Navigate to next step — example with useNavigate inside child
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/apply/personal-info"
          element={
            <PersonalInformation
              userData={userData}
              setUserData={setUserData}
              onSubmit={handlePersonalInfoSubmit}
            />
          }
        />
        {/* Define other routes for other steps */}
      </Routes>
    </Router>
  );
};

export default ApplyForm;

