import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Apply from './components/Apply';
import Review from './components/review';
import Thankyou from './components/thank-you';
import Summery from './form/Summery'; // keep the spelling if you're using Summery.jsx
import { useState } from 'react';
import Toggle from './toggle/toggle';
import PersonalInformation from './form/personal information';
import EmployeeDetails from './form/Employee Details';
import LoanDetails from './form/Loan Details';
import DocumentUpdates from './form/document updates';
import UpdatedPicture from './form/updatedID';
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

  const [viewMode, setViewMode] = useState(null); // 'edit' or 'submit'

  const handleEdit = () => setViewMode('edit');
  const handleSubmit = () => setViewMode('submit');

  return (
    <BrowserRouter>
      <ProgressBar />
      <div className="form-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/review" element={<Review />} />
          <Route path="/thank-you" element={<Thankyou />} />
          <Route path="/apply/personal-info" element={<PersonalInformation />} />
          <Route path="/apply/employee-details" element={<EmployeeDetails />} />
          <Route path="/apply/loan-details" element={<LoanDetails />} />
          <Route path="/apply/updated-picture" element={<UpdatedPicture />} />
          <Route path="/apply/document-updates" element={<DocumentUpdates />} />

          {/* ✅ Correct new route for Summary view */}
          <Route
            path="/apply/summery"
            element={
              <Summery
                userData={userData}
                onEdit={handleEdit}
                onSubmit={handleSubmit}
                mode={viewMode}
              />
            }
          />

          {/* Optional: still keep /summery route if needed */}
          <Route
            path="/summery"
            element={
              <Summery
                userData={userData}
                onEdit={handleEdit}
                onSubmit={handleSubmit}
                mode={viewMode}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
