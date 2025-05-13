import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Apply from './components/Apply';
import Review from './components/review';
import Thankyou from './components/thank-you';
import Summery from './form/Summery';
import { useState } from 'react';
import PersonalInformation from './form/personal information';
import EmployeeDetails from './form/Employee Details';
import LoanDetails from './form/Loan Details';
import DocumentUpdates from './form/document updates';
import UpdatedID from './form/updatedID'; // Correct import
import ProgressBar from './components/progressbar';
// Removed incorrect import: import Login from './Login/Login';
import LoginForm from './Login/Login'; // Correct import

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
          <Route path="/login" element={<LoginForm />} /> {/* Correct route for LoginForm */}
          <Route path="/apply" element={<Navigate to="/apply/personal-info" />} />
          <Route path="/apply/personal-info" element={<PersonalInformation userData={userData} setUserData={setUserData} />} />
          <Route path="/apply/employee-details" element={<EmployeeDetails userData={userData} setUserData={setUserData} />} />
          <Route path="/apply/loan-details" element={<LoanDetails userData={userData} setUserData={setUserData} />} />
          <Route path="/apply/document-updates" element={<DocumentUpdates userData={userData} setUserData={setUserData} />} />
          <Route path="/apply/updatedID" element={<UpdatedID />} />
          <Route path="/apply/summary" element={<Summery userData={userData} onSubmit={(updatedInfo) => setUserData({ ...userData, personalInfo: updatedInfo })} />} />
          <Route path="/review" element={<Review />} />
          <Route path="/thank-you" element={<Thankyou />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
