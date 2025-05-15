import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Summary = ({ userData = {}, onSubmit }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('view'); // Set to 'view' initially

  const {
    personalInfo = {},
    employeeDetails = {},
    loanDetails = {},
    documentUpdates = {}
  } = userData;

  useEffect(() => {
    console.log('User Data:', userData);
  }, [userData]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: personalInfo });

  const submitUpdatedInfo = (data) => {
    onSubmit(data);
    setStep('view'); // After saving, go back to 'view' mode
  };

  const handleGoToReview = () => {
    navigate('/apply/review');
  };

  if (!personalInfo?.name) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        No user data available. Please complete the form steps before accessing summary.
      </div>
    );
  }
