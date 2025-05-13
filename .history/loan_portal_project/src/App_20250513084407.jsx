import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import portfolioReducer from './redux/actions/portfolioSlice';
import formReducer from './redux/slices/formSlice';        // ✅ New import
import sessionReducer from './redux/slices/sessionSlice';  // ✅ New import
import themeReducer from './redux/slices/themeSlice';      // ✅ New import

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
import ProgressBar from './components/progressbar';
import LoginFormCo
import LoginForm from './Login/Login';
import Toggle from './toggle/toggle';
import TogglePage from './toggle/toggle';
import PortfolioPage from './components/PortfolioPage';     
import NavigationButton from './NavigationButton/NavigationButton';


// ✅ Redux store with all slices
const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    form: formReducer,
    session: sessionReducer,
    theme: themeReducer,
  },
});

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

  const [viewMode, setViewMode] = useState(null);

  const handleEdit = () => setViewMode('edit');
  const handleSubmit = () => setViewMode('submit');

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ProgressBar />
        <Toggle />

        <div className="form-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply" element={<Navigate to="/apply/personal-info" />} />
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
            <Route
              path="/apply/updated-picture"
              element={<UpdatedPicture userData={userData} setUserData={setUserData} />}
            />
            <Route
              path="/apply/summary"
              element={
                <Summery
                  userData={userData}
                  onEdit={handleEdit}
                  onSubmit={handleSubmit}
                  mode={viewMode}
                />
              }
            />
            <Route path="/review" element={<Review />} />
            <Route path="/thank-you" element={<Thankyou />} />
            <Route path="/apply-start" element={<Apply />} />
            <Route path="/login" element={<LoginForm />} />
          {}  <Route path="/toggle" element={<TogglePage />} /> 
            <Route path="/portfolio" element={<PortfolioPage />} /> 
            <Eout path ="/navigation" element={<NavigationButton />}/>
          </Routes>

          
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
