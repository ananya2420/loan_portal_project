//create a basic login form 
//store a user object after login


import React, { useState } from 'react';
import person from '../assets/person.png';
import email from '../assets/email.png';
import password from '../assets/password.png';

const Login = () => {
  const [action, setAction] = useState("login");
  const [userName, setUserName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [user, setUser] = useState(null);

  const handleSubmit = () => {
    const newUser = {
      userName: userName.trim(),
      email: emailInput.trim(),
      password: passwordInput,
    };
    setUser(newUser);
    console.log('User submitted:', newUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold capitalize text-gray-800">{action}</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-2 rounded"></div>
        </div>

        <div className="space-y-5">
          {action === 'login' ? null : (
            <div className="relative">
              <img src={person} alt="User Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="relative">
            <img src={email} alt="Email Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <img src={password} alt="Password Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {action === "login" ? null : (
          <div className="mt-4 text-sm text-right text-blue-600 hover:underline cursor-pointer">
            Lost Password? <span>Click here!</span>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {action === "login" ? "Login" : "Register"}
          </button>
        </div>

        {user && (
          <div className="mt-6 bg-gray-100 p-4 rounded-md text-sm text-gray-700">
            <h3 className="font-semibold mb-2">User object stored:</h3>
            <pre className="whitespace-pre-wrap break-words">{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
