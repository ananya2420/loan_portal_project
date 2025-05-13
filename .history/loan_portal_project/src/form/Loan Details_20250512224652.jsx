//Application For Structure
//add  react hook form 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoanDetails = ({ userData, setUserData }) => {
  const [form, setForm] = useState(userData.loanDetails || {});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData((prev) => ({ ...prev, loanDetails: form }));
    navigate('/apply/document-updates');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Loan Details</h2>
      <input name="amount" type="number" placeholder="Loan Amount" value={form.amount || ''} onChange={handleChange} required />
      <input name="type" placeholder="Loan Type" value={form.type || ''} onChange={handleChange} required />
      <button type="submit">Next</button>
    </form>
  );
};

export default LoanDetails;
