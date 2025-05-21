//Application For Structure
//add  react hook form 
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const sampleUsers = [
  { name: 'Gourab Sen', dob: '1990-01-01', phone: '01700000001', email: 'gourab@gmail.com' },
  { name: 'Bob Smith', dob: '1988-03-21', phone: '01700000002', email: 'bob@example.com' },
  { name: 'Alice Johnson', dob: '1992-07-11', phone: '01700000003', email: 'alice@example.com' },
];

const PersonalInformation = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    navigate('/apply/employee-details');
  };

  const handleSelectSuggestion = (user) => {
    setValue('name', user.name);
    setValue('dob', user.dob);
    setValue('phone', user.phone);
    setValue('email', user.email);
    setShowSuggestions(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="space-y-4 relative">
        <div
          onMouseEnter={() => setShowSuggestions(true)}
          onMouseLeave={() => setShowSuggestions(false)}
        >
          <label>Full Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="w-full p-2 border rounded"
            placeholder="Enter full name"
          />
        </div>

        <div
          onMouseEnter={() => setShowSuggestions(true)}
          onMouseLeave={() => setShowSuggestions(false)}
        >
          <label>Phone Number</label>
          <input
            {...register('phone', { required: 'Phone is required' })}
            className="w-full p-2 border rounded"
            placeholder="Enter phone"
          />
        </div>

        <div
          onMouseEnter={() => setShowSuggestions(true)}
          onMouseLeave={() => setShowSuggestions(false)}
        >
          <label>Email</label>
          <input
            {...register('email', { required: 'Email is required' })}
            className="w-full p-2 border rounded"
            placeholder="Enter email"
          />
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <ul className="absolute bg-white border shadow-lg rounded w-full mt-1 z-10">
            {sampleUsers.map((user, idx) => (
              <li
                key={idx}
                onMouseDown={() => handleSelectSuggestion(user)}
                className="p-2 hover:bg-blue-100 cursor-pointer"
              >
                <strong>{user.name}</strong> — {user.phone} — {user.email}
              </li>
            ))}
          </ul>
        )}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PersonalInformation;
