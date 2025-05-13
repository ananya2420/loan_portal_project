//pages and routes
//Apply component-redirect to- Review page
//use React-hook-form

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Apply = () => {
  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate('/apply/personal-info');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h1>Welcome to the Loan Application</h1>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">Start Application</button>
    </form>
  );
};

export default Apply;
