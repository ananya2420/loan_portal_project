// Summary.js
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
import ProgressBar from '../components/progressbar';

const fieldGroups = [
  {
    title: 'Edit Personal Information',
    stepKey: 'personalInfo',
    fields: [
      { name: 'name', label: 'Name', type: 'select', options: ['gourab', 'bob'] },
      { name: 'dob', label: 'Date of Birth', type: 'select', options: ['21.5.2025'] },
      { name: 'phone', label: 'Phone', type: 'select', options: ['01700', '01654'] },
      { name: 'email', label: 'Email', type: 'select', options: ['aborty@gmail.com', 'a@gmail.com'] },
    ],
  },
  {
    title: 'Edit Employee Details',
    stepKey: 'employeeDetails',
    fields: [
      { name: 'company', label: 'Company', type: 'select', options: ['Brain station', 'tech solution'] },
      { name: 'status', label: 'Status', type: 'select', options: ['part time', 'full time'] },
      { name: 'income', label: 'Monthly Income', type: 'select', options: ['10000', '12000', '15000'] },
      { name: 'experience', label: 'Experience (years)', type: 'select', options: ['5', '6'] },
      { name: 'taxId', label: 'Tax ID', type: 'input' },
    ],
  },
  {
    title: 'Edit Loan Details',
    stepKey: 'loanDetails',
    fields: [
      { name: 'amount', label: 'Amount', type: 'select', options: ['20000', '50000'] },
      { name: 'type', label: 'Type', type: 'select', options: ['home loan', 'auto loan'] },
      { name: 'repaymentTerm', label: 'Repayment Term (months)', type: 'select', options: ['6', '12', '24'] },
      { name: 'emiDate', label: 'Preferred EMI Date', type: 'select', options: ['21.5.2025', '22.5.2025'] },
    ],
  },
  {
    title: 'Edit Document Updates',
    stepKey: 'documentUpdates',
    fields: [
      {
        name: 'isUpdated',
        label: 'ID Updated',
        type: 'select',
        options: ['true', 'false'],
      },
    ],
  },
];

const FormField = ({ register, errors, stepKey, field }) => {
  const fieldPath = `${stepKey}.${field.name}`;
  const commonProps = {
    className: 'w-full border rounded px-4 py-2',
    ...register(fieldPath, { required: `${field.label} is required` }),
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1 capitalize">{field.label}</label>
      {field.type === 'select' ? (
        <select {...commonProps}>
          <option value="">Select {
