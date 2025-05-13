import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Apply from './components/Apply';
import Review from './components/review';
import Thankyou from './components/thank-you';
import Summery from './form/Summery';
import { useState } from 'react';
import Toggle from './toggle/toggle';
import PersonalInformation from './form/personal information';
import EmployeeDetails from './form/Employee Details';
import LoanDetails from './form/Loan Details';
import DocumentUpdates from './form/document updates';
//import UploadStepPicture from './form/UploadStepPicture';
import PicturePreview from './form/PicturePreview';
import Login from './Login/Login';
import ProgressBar from './components/progressbar';

function App() {
  const [userData, setUserData] = useState({
    personalInfo: {
      name: 'Gourab',
      dob: '2000-03-08',
      phone: '01700..',
      email: 'aborty@gmail.com',
    },
    EmployeeDetails: {
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
    DocumentUpdates: {
      isUpdated: true,
    },
  });

  return (
    <BrowserRouter>
      <ProgressBar />
      <div className="form-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<Navigate to="/apply/personal-info" />} />
          <Route path="/apply/personal-info" element={<PersonalInformation userData={userData} setUserData={setUserData} />} />
          <Route path="/apply/employee-details" element={<EmployeeDetails />} />
          <Route path="/apply/loan-details" element={<LoanDetails />} />
          <Route path="/apply/document-updates" element={<DocumentUpdates />} />
          <Route path="/apply/updated-picture" element={<UploadStepPicture />} />
          <Route path="/apply/picture-preview" element={<PicturePreview />} />
          <Route
            path="/apply/summary"
            element={
              <Summery
                userData={userData}
                onSubmit={(updatedInfo) =>
                  setUserData((prev) => ({ ...prev, personalInfo: updatedInfo }))
                }
              />
            }
          />
          <Route path="/review" element={<Review />} />
          <Route path="/thank-you" element={<Thankyou />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
