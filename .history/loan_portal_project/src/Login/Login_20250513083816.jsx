//create a basic login form 
//store a user object after login


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavigationButton from '../NavigationButton/NavigationButton'; // ✅ Import NavigationButton

const LoginFormComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showNavButton, setShowNavButton] = useState(false); // ✅ Toggle for NavigationButton

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, email, password };
    dispatch({ type: 'user/loginUser', payload: newUser }); // or use `dispatch(loginUser(newUser))`
  };

  const goToTogglePage = () => {
    navigate('/navigation');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center flex-col">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 border border-gray-200 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
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

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={goToTogglePage}
            className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
          >
            Go to Toggle Page
          </button>

          <button
            type="button"
            onClick={() => setShowNavButton(true)}
            className="w-full bg-purple-500 text-white font-semibold py-2 rounded-lg hover:bg-purple-600 transition"
          >
            Show Navigation Button
          </button>
        </div>
      </form>

      {/* ✅ Conditionally render NavigationButton */}
      {showNavButton && (
        <div className="mt-6">
          <NavigationButton />
        </div>
      )}
    </div>
  );
};




