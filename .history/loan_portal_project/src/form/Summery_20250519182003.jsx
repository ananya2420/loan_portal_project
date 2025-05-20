import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import { setEmployeeDetails } from '../redux/slices/formSlice'; // <-- Import here
import ProgressBar from '../components/progressbar';

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const userData = useSelector((state) => state.formData || {});
  const {
    personalInfo = {},
    employeeDetails = {},
    loanDetails = {},
    documentUpdates = {},
  } = userData;

  const [isEditingEmployee, setIsEditingEmployee] = useState(false);
  const [validationError, setValidationError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: employeeDetails,
  });

  useEffect(() => {
    reset(employeeDetails);
  }, [employeeDetails, reset]);

  // Updated to dispatch Redux action
  const submitEmployeeDetails = (data) => {
    dispatch(setEmployeeDetails(data));  // <-- dispatch update
    alert('Employee details saved!');
    setIsEditingEmployee(false);
  };

  useEffect(() => {
    if (!personalInfo?.name) {
      alert('No user data available. Please complete the form steps before accessing the summary.');
      navigate('/apply/document-updates');
    }
  }, [personalInfo, navigate]);

  const handleGoToReview = () => {
    navigate('/apply/review');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  if (!personalInfo?.name) return null;

  return (
    // ...your existing JSX here
  );
};

export default Summary;
