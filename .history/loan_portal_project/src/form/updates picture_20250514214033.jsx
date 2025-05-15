//Application For Structure
//add react-hook-form 
//add form progress bar

//Application For Structure

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDocumentUpdates } from '../store/formSlice';
import ProgressBar from '../components/progressbar';

const UpdatedPicture = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const [currentStep] = useState(5);
  const totalSteps = 5;
  
  const [picture, setPicture] = useState(null); // Added state to store picture

  const formData = useSelector((state) => state.formData);

  const isFormComplete = () => {
    return (
      formData.personalInfo?.name &&
      formData.employeeDetails?.status &&
      formData.loanDetails?.amount &&
      formData.loanDetails?.type
    );
  };

  const onSubmit = (data) => {
    const file = data.picture[0];
setPicture(URL.createObjectURL(file)); // Store the uploaded picture in state

    if (!isFormComplete()) {
      alert('Please complete all previous steps before proceeding to summary.');
      navigate('/apply');
      return;
    }

    dispatch(setDocumentUpdates({ isUpdated: true, fileName: file.name }));
    navigate('/apply/summary');
  };

  const goBack = () => {
    navigate('/apply/document-updates');
  };

  const goToPreview = () => {
    if (picture) {
      navigate('/apply/picture-preview', { state: { picture } }); // Pass the picture state to the preview page
    } else {
      alert("Please upload a picture first.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <div className="p-8 text-center bg-white shadow-md rounded-2xl">
          <h2 className="mb-4 text-2xl font-semibold">Upload Updated Picture</h2>
          <p className="mb-6 text-gray-600">Please upload your updated picture</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="picture"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="file"
