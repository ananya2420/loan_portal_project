//create a basic login form 
//store a user object after login


import React, { useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

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

// Redux store
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// Login form component
const LoginFormComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, email, password };
    dispatch(loginUser(newUser));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Login
        </button>

        {user && (
          <div className="mt-6 p-4 border border-green-300 rounded bg-green-50 text-green-800 text-sm">
            <p className="font-semibold mb-2">Welcome, {user.username}!</p>
            <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
};

// Export wrapped with provider
const LoginForm = () => (
  <Provider store={store}>
    <LoginFormComponent />
  </Provider>
);

export default LoginForm;




