//Application For Structure
//add react-hook-form

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeDetails = ({ userData, setUserData }) => {
  const [form, setForm] = useState(userData.employeeDetails || {});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData((prev) => ({ ...prev, employeeDetails: form }));
    navigate('/apply/loan-details');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Employment Details</h2>
      <input name="company" placeholder="Company" value={form.company || ''} onChange={handleChange} required />
      <input name="income" type="number" placeholder="Income" value={form.income || ''} onChange={handleChange} required />
      <button type="submit">Next</button>
    </form>
  );
};

export default EmployeeDetails;
