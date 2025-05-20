import { HashRouter as BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Components
import Home from './components/Home';
import Apply from './components/Apply';
import Review from './components/Review';
import Thankyou from './components/thank-you';
import ProgressBar from './components/progressbar';
import LoginForm from './Login/Login';
import PersonalInformation from './form/personal information';
import PicturePreview from './form/PictureReview';
import EmployeeDetails from './form/Employee Details';
import LoanDetails from './form/Loan Details';
import DocumentUpdates from './form/document updates';
import UpdatedPicture from './form/updates picture';
import Summary from './form/Summery';
import Dashboard from './components/Dashboard';


function App() {
  const [userData, setUserData] = useState({
    personalInfo: {
      name: 'Gourab',
      dob: '2000-03-08',
      phone: '01700..',
      email: 'aborty@gmail.com',
    },
    employeeDetails: {
      status: 'Full-time',
      company: 'TechCorp',
      income: 40000,
      experience: 5,
      taxId: 'TX123456',
    },
    loanDetails: {
      amount: 200000,
      type: 'Home Loan',
      term: '10 years',
      emiDate: '5th of every month',
    },
    documentUpdates: {
      isUpdated: true,
    },
  });

  return (
    <BrowserRouter>
      <ProgressBar />
      <div className="form-container">
        <Routes>
           <Route path="/" element={<Landing />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/apply" element={<Navigate to="/apply/personal-info" />} />

          <Route
            path="/apply/personal-info"
            element={
              <PersonalInformation userData={userData} setUserData={setUserData} />
            }
          />
          <Route
            path="/apply/employee-details"
            element={
              <EmployeeDetails userData={userData} setUserData={setUserData} />
            }
          />
          <Route
            path="/apply/loan-details"
            element={
              <LoanDetails userData={userData} setUserData={setUserData} />
            }
          />
          <Route
            path="/apply/document-updates"
            element={
              <DocumentUpdates userData={userData} setUserData={setUserData} />
            }
          />
          <Route path="/apply/updated-picture" element={<UpdatedPicture />} />
          <Route path="/apply/picture-preview" element={<PicturePreview />} />
          <Route
            path="/apply/summary"
            element={
              <Summary
                userData={userData}
                onSubmit={(updatedInfo) =>
                  setUserData({ ...userData, personalInfo: updatedInfo })
                }
              />
            }
          />
          <Route path="/apply/review" element={<Review />} />
          <Route path="/thank-you" element={<Thankyou />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;