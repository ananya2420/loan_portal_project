//create a basic login form 
//store a user object after login


import React, { useState } from 'react';

const mockUser = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
};

const Login = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  // Handle the login
  const handleLogin = (e) => {
    e.preventDefault();

    // Validate against mock data
    if (emailInput === mockUser.email && passwordInput === mockUser.password) {
      setUser({ email: mockUser.email, name: mockUser.name });
      setError('');
    } else {
      setError('Invalid email or password');
      setUser(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        {user && (
          <div className="mt-6 text-green-600">
            <p>Welcome, {user.name}!</p>
            <pre className="text-sm text-gray-700">{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
