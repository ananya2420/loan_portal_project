//Application For Structure
//add  react hook form 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalInformation = ({ userData, setUserData }) => {
  const [form, setForm] = useState(userData.personalInfo || {});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData((prev) => ({ ...prev, personalInfo: form }));
    navigate('/apply/employee-details');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Personal Information</h2>
      <input name="name" placeholder="Name" value={form.name || ''} onChange={handleChange} required />
      <input name="dob" type="date" value={form.dob || ''} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={form.phone || ''} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email || ''} onChange={handleChange} required />
      <button type="submit">Next</button>
    </form>
  );
};

export default PersonalInformation;

