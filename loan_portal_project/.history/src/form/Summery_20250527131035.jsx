import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPersonalInfo,
  setEmployeeDetails,
  setLoanDetails,
  setDocumentUpdates,
} from '../redux/slices/formSlice';
import { toggleTheme } from '../redux/slices/themeSlice';

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { personalInfo, employeeDetails, loanDetails, documentUpdates } = useSelector((state) => state.formData || {});
  const theme = useSelector((state) => state.theme.theme);
  const [isEditing, setIsEditing] = useState(false);
  const [editStep, setEditStep] = useState(0);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: { personalInfo, employeeDetails, loanDetails, documentUpdates },
  });

  useEffect(() => {
    if (!personalInfo?.name && !employeeDetails?.company && !loanDetails?.amount) {
      alert('No form data found. Please complete at least one step before viewing the summary.');
      navigate('/apply/document-updates');
    } else {
      reset({ personalInfo, employeeDetails, loanDetails, documentUpdates });
    }
  }, [personalInfo, employeeDetails, loanDetails, documentUpdates, reset, navigate]);

  const onSubmit = (data) => {
    dispatch(setPersonalInfo(data.personalInfo));
    dispatch(setEmployeeDetails(data.employeeDetails));
    dispatch(setLoanDetails(data.loanDetails));
    dispatch(setDocumentUpdates(data.documentUpdates));
    alert('Changes saved!');
    setIsEditing(false);
    setEditStep(0);
  };

  const stepTitles = ['Personal Info', 'Employee Details', 'Loan Details', 'Document Updates'];

  const renderStepForm = () => {
    // For brevity, same form rendering logic as shared earlier
    return null;
  };

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Summary</h2>
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {renderStepForm()}
            <div className="flex justify-between">
              <button type="button" onClick={() => setEditStep(editStep - 1)}>Back</button>
              <button type="submit">Save</button>
            </div>
          </form>
        ) : (
          <div>
            {/* Render summary sections here using mapped data from Redux */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;