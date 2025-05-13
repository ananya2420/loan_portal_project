import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

import Home from './components/Home';
import Apply from './components/Apply';
import Review from './components/Review';
//import Thankyou from './components/Thankyou';
import Than
import Summery from './form/Summery';
import PersonalInformation from './form/personal information';
import EmployeeDetails from './form/Employee Details';
import LoanDetails from './form/Loan Details';
import DocumentUpdates from './form/document updates';
import UpdatedPicture from './form/updatedID';
import LoginForm from './Login/Login';
import Toggle from './components/Toggle';
import PortfolioPage from './components/PortfolioPage';
import NavigationButton from './NavigationButton/NavigationButton';
import TogglePage from './components/TogglePage';
import ProtectedReviewRoute from './components/ProtectedReviewRoute';

function App() {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

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
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <BrowserRouter>
          <div className={`form-container ${theme === 'dark' ? 'dark' : ''}`}>
            <Toggle />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/apply/summary" element={<Summery userData={userData} onEdit={handleEdit} onSubmit={handleSubmit} mode={viewMode} />} />
              <Route
                path="/apply/review"
                element={
                  <ProtectedReviewRoute>
                    <Review />
                  </ProtectedReviewRoute>
                }
              />
              <Route path="/thank-you" element={<Thankyou />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/navigation" element={<NavigationButton />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
