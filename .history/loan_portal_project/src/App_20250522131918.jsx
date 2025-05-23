import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Landing from './components/Landing';
import Home from './components/Home';
import LoginForm from './Login/Login';
//import PersonalInformation from './form/personal information'; 
import PersonalInformation from './form/personal information';


import EmployeeDetails from './form/Employee Details';
import LoanDetails from './form/Loan Details';
import DocumentUpdates from './form/document updates';
import UpdatedPicture from './form/updates picture';
import PicturePreview from './form/PictureReview';
import Summary from './form/Summery'
//import Review from './components/Review';
import Review from './components/review';
import Thankyou from './components/thank-you';
import Dashboard from './components/Dashboard';
import ProgressBar from './components/progressbar';
import Apply from './components/Apply';
import ApplyForm from './form/ApplyForm';
import FullSummary from './form/FullSummary';
//import Review from './components/review';

function App() {
  // Hold all form data here, pass down setters to steps
  const [userData, setUserData] = useState({
    personalInfo: {},
    employeeDetails: {},
    loanDetails: {},
    documentUpdates: {},
  });

  return (
    <Router>
      <ProgressBar />
      <div className="form-container">
        <Routes>
          <Route path="/apply/*" element={<ApplyForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Apply Routes */}
          <Route path="/apply" element={<Apply userData={userData} setUserData={setUserData} />} />
          <Route
            path="/apply/personal-info"
            element={<PersonalInformation userData={userData} setUserData={setUserData} />}
          />
          <Route
            path="/apply/employee-details"
            element={<EmployeeDetails userData={userData} setUserData={setUserData} />}
          />
          <Route
            path="/apply/loan-details"
            element={<LoanDetails userData={userData} setUserData={setUserData} />}
          />
          <Route
            path="/apply/document-updates"
            element={<DocumentUpdates userData={userData} setUserData={setUserData} />}
          />
          <Route path="/apply/updated-picture" element={<UpdatedPicture />} />
          <Route path="/apply/picture-preview" element={<PicturePreview />} />
          <Route
            path="/apply/summary"
            element={<Summary userData={userData} setUserData={setUserData} />}
          />
          <Route path="/apply/full-summary" element={<FullSummary /}
          <Route path="/apply/review" element={<Review />} />
          <Route path="/thank-you" element={<Thankyou />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Catch all unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
