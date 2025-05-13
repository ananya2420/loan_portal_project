import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import Apply from './components/Apply';
import Review from './components/review';
import Thankyou from './components/thank-you';
import Summery from './form/Summery';
import PersonalInformation from './form/personal information';
import EmployeeDetails from './form/Employee Details';
import LoanDetails from './form/Loan Details';
import DocumentUpdates from './form/document updates';
import UpdatedPicture from './form/updatedID';
import LoginForm from './Login/Login';
import ProgressBar from './components/progressbar';

function App() {
  const [userData, setUserData] = useState({
    personalInfo: {
      name: '',
      dob: '',
      phone: '',
      email: '',
    },
    employeeDetails: {
      status: '',
      company: '',
      income: '',
      experience: '',
      taxId: '',
    },
    loanDetails: {},
    documentUpdates: {},
  });

  const [viewMode, setViewMode] = useState(null); // 'edit' or 'submit'

  const handleEdit = () => setViewMode('edit');
  const handleSubmit = () => setViewMode('submit');

  return (
    <BrowserRouter>
      <ProgressBar />
      <div className="form-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Navigate to="/apply/personal-info" />} />
          <Route
            path="/apply/personal-info"
            element={<PersonalInformation userData={userData} setUserData={setUserData} />}
          />
          <Route path="/apply/employee-details" element={<EmployeeDetails />} />
          <Route path="/apply/loan-details" element={<LoanDetails />} />
          <Route path="/apply/updated-picture" element={<UpdatedPicture />} />
          <Route path="/apply/document-updates" element={<DocumentUpdates />} />
          <Route
            path="/apply/summary"
            element={<Summery userData={userData} onEdit={handleEdit} onSubmit={handleSubmit} mode={viewMode} />}
          />
          <Route path="/apply/review" element={<Review />} />
          <Route path="/thank-you" element={<Thankyou />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
