import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPersonalInfo } from '../store/formSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PersonalInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const personalInfo = useSelector((state) => state.formData.personalInfo);
  const [selectedDate, setSelectedDate] = useState(null);
  const initialized = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      dob: '',
      phone: '',
      email: '',
    },
  });

  // Initialize the form with Redux state on mount
  useEffect(() => {
    if (!initialized.current && personalInfo) {
      reset({
        name: personalInfo.name || '',
        dob: personalInfo.dob || '',
        phone: personalInfo.phone || '',
        email: personalInfo.email || '',
      });
      if (personalInfo.dob) {
        setSelectedDate(new Date(personalInfo.dob));
      }
      initialized.current = true;
    }
  }, [personalInfo, reset]);

  // Save form data to Redux
  const saveFormData = () => {
    const currentData = {
      name: watch('name'),
      dob: watch('dob'),
      phone: watch('phone'),
      email: watch('email'),
    };
    dispatch(setPersonalInfo(currentData));
  };

  const onSubmit = (data) => {
    dispatch(setPersonalInfo(data));
    navigate('/apply/employee-details');
  };

  const handleBack = () => {
    saveFormData();
    navigate('/apply');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          placeholder="Full Name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setValue('dob', date?.toISOString().split('T')[0] || '');
          }}
          dateFormat="yyyy-MM-dd"
          placeholderText="Date of Birth"
        />
      </div>

      <div>
        <input
          placeholder="Phone"
          {...register('phone', {
            required: 'Phone is required',
            pattern: {
              value: /^\d{11}$/,
              message: 'Must be 11 digits',
            },
          })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className="flex justify-between mt-4">
        <button type="button" onClick={handleBack}>
          Back
        </button>
        <button type="submit" disabled={!isValid}>
          Next
        </button>
      </div>
    </form>
  );
};

export default PersonalInformation;
