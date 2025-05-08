//create a basic login form 
//store a user object after login


import React, { useState } from 'react';
import person from '../assets/person.png';  // User icon image
import email from '../assets/email.png';    // Email icon image
import password from '../assets/password.png';  // Password icon image

const Login = () => {
  const [action, setAction] = useState("login");  // 'login' or 'register'
  const [userName, setUserName] = useState('');   // Username (for registration)
  const [emailInput, setEmailInput] = useState(''); // Email input
  const [passwordInput, setPasswordInput] = useState('');  // Password input
  const [user, setUser] = useState(null);  // To store the user data after form submission
  const [error, setError] = useState("");  // Error message for invalid input

  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login or registration with mock data
    if (action === "login") {
      if (emailInput === 'test@example.com' && passwordInput === 'password123') {
        setUser({ email: emailInput, name: 'Test User' });
        setError('');
      } else {
        setError('Invalid email or password');
      }
    } else {
      const newUser = {
        userName: userName.trim(),
        email: emailInput.trim(),
        password: passwordInput,
      };
      setUser(newUser);
      setError('');
      console.log('User registered:', newUser); // You would typically make a POST request here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{action === "login" ? "Login" : "Register"}</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Username Input (only shown when registering) */}
        {action === 'register' && (
          <div className="mb-4">
            <img src={person} alt="User Icon" className="inline-block w-6 h-6 mr-2" />
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        {/* Email Input */}
        <div className="mb-4">
          <img src={email} alt="Email Icon" className="inline-block w-6 h-6 mr-2" />
          <input
            type="email"
            placeholder="Email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <img src={password} alt="Password Icon" className="inline-block w-6 h-6 mr-2" />
          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Forgot Password Link */}
        {action === "login" ? null : (
          <div className="text-right mb-4 text-sm">
            Lost Password? <span className="text-blue-500 cursor-pointer">Click here!</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {action === "login" ? "Login" : "Register"}
          </button>
        </div>

        {/* Switch action */}
        <div className="text-center text-sm">
          {action === 'login' ? (
            <span>
              Don't have an account?{' '}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setAction('register')}
              >
                Register
              </span>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setAction('login')}
              >
                Login
              </span>
            </span>
          )}
        </div>

        {/* User info display after successful submission */}
        {user && (
          <div className="mt-6 text-green-600">
            <p>Welcome, {user.userName || user.name}!</p>
            <pre className="text-sm text-gray-700">{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
