//create a basic login form 
//store a user object after login


import React, { useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';


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

// --- Store Setup ---
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// --- Login Form Component ---
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        {user && (
          <div className="mt-6 text-green-600 text-sm">
            <p>Welcome, {user.username}!</p>
            <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
};

// --- Wrap Component with Redux Provider ---
const LoginForm = () => (
  <Provider store={store}>
    <LoginFormComponent />
  </Provider>
);

export default LoginForm;



