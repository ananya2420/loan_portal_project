//create a basic login form 
//store a user object after login

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // ✅ Import React Hook Form
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// Redux slice
const userSlice = createSlice({
  name: 'user',
  initialState: { currentUser: null },
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = { ...action.payload, authenticated: true };
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

const { loginUser, logoutUser } = userSlice.actions;

// Store for this component
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// InputField Component (Reusable)
const InputField = ({ label, name, type, register, errors }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      {...register(name, { required: `${label} is required` })}
      type={type}
      placeholder={`Enter your ${label.toLowerCase()}`}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
    />
    {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
  </div>
);

const LoginFormComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

