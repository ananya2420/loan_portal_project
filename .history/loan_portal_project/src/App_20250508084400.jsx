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
import UpdatedPicture from './form/updatedID';
import Login from './Login/Login';
import ProgressBar from './components/progressbar';


function App() {
  const [userData] = useState({
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

  const handleEdit = () => {
    console.log('Edit forms');
  };

  const handleSubmit = () => {
    console.log('Form is submitted');
  };

  return (
    <BrowserRouter>
   

      <ProgressBar />
      <Toggle />

      <div className="form-container">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/apply" element={<Apply />} /> 
          <Route path="/review" element={<Review />} />
          <Route path="/thank-you" element={<Thankyou />} />
          <Route path="/apply" element={<Navigate to="/apply/personal-info" />} />
          <Route path="/apply/personal-info" element={<PersonalInformation />} />
          <Route path="/apply/employee-details" element={<EmployeeDetails />} />
          <Route path="/apply/loan-details" element={<LoanDetails />} />
          <Route path="/apply/updated-picture" element={<UpdatedPicture />} />
          <Route path="/apply/document-updates" element={<DocumentUpdates />} />
          <Route path="/review" element={<Review />} />
          <Route path="/thank-you" element={<Thankyou />} />
          
        </Routes>
        <div>
          <Login />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

