//Application For Structure
//add  react hook form 
//add form  progress bar


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoanDetails } from '../store/formSlice'; // Import the action to update loan details
import ProgressBar from '../components/progressbar'; // Import the progress bar component

const LoanDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch loan details from the Redux store (persisted data)
  const loanDetails = useSelector((state) => state.formData.loanDetails);

  // Provide fallback to empty object in case loanDetails is undefined
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: loanDetails || {}, // Use an empty object as fallback if loanDetails is undefined
  });

  const [currentStep] = use
