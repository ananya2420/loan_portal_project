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
      state.currentUser = action.payload;
    },
  },
});

const { loginUser } = userSlice.actions;

// Store for this component
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

const LoginFormComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  // Initialize React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const { username, email, password } = data;
    const newUser = { username, email, password };
    dispatch(loginUser(newUser));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)} // Hook form submission
        className="bg-white p-8 border border-gray-200 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            {...register('username', { required: 'Username is required' })} // React Hook Form registration
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>} {/* Error message */}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            {...register('email', { required: 'Email is required' })} // React Hook Form registration
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>} {/* Error message */}
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            {...register('password', { required: 'Password is required' })} // React Hook Form registration
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>} {/* Error message */}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>

        {user && (
          <div className="mt-6 text-green-700 bg-green-100 border border-green-300 p-4 rounded text-sm">
            <p className="font-semibold mb-1">Welcome, {user.username}!</p>
            <pre className="text-xs text-gray-700">{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
};

const LoginForm = () => (
  <Provider store={store}>
    <LoginFormComponent />
  </Provider>
);

export default LoginForm;

