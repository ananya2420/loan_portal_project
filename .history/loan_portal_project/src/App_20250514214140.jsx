import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Components
import Home from './components/Home';
import Apply from './components/Apply';
import Review from './components/Review';
//import Thankyou from './components/Thankyou';
import Thankyou from './components/thank-you'

//import ProgressBar from './components/ProgressBar';
import ProgressBar from './components/progressbar';
import LoginForm from './Login/Login';

//import PersonalInformation from './form/PersonalInformation';
import PersonalInformation from './form/personal information';
import PicturePreview from './form/PicturePreview';
//import EmployeeDetails from './form/EmployeeDetails';
import EmployeeDetails from './form/Employee Details';
//import LoanDetails from './form/LoanDetails';
import LoanDetails from './form/Loan Details';
//import DocumentUpdates from './form/DocumentUpdates';
import DocumentUpdates from './form/document updates'
//import UpdatedPicture from './form/UpdatedPicture';
import UpdatedPicture from './form/'
//import Summary from './form/Summary';
import Summary from './form/Summery';

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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          
          {/* Default route for /apply */}
          <Route path="/apply" element={<Navigate to="/apply/personal-info" />} />
{/* Personal Information Route */}
          <Route
            path="/apply/personal-info"
            element={
              <PersonalInformation userData={userData} setUserData={setUserData} />
            }
          />

          {/* Employee Details Route */}
          <Route
            path="/apply/employee-details"
            element={
              <EmployeeDetails userData={userData} setUserData={setUserData} />
            }
          />

          {/* Loan Details Route */}
          <Route
            path="/apply/loan-details"
            element={
              <LoanDetails userData={userData} setUserData={setUserData} />
            }
          />

          {/* Document Updates Route */}
          <Route
            path="/apply/document-updates"
            element={
              <DocumentUpdates userData={userData} setUserData={setUserData} />
            }
          />

          {/* Updated Picture Route */}
          <Route path="/apply/updated-picture" element={<UpdatedPicture />} />

          {/* Picture Preview Route */}
          <Route path="/apply/picture-preview" element={<PicturePreview />} />

          {/* Summary Route */}
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

          {/* Review Route */}
          <Route path="/apply/review" element={<Review />} />

          {/* Thank You Route */}
          <Route path="/thank-you" element={<Thankyou />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


