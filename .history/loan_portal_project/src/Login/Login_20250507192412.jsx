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
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === 'login' ? null : (
          <div className="input">
            <img src={person} alt="User Icon" />
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        )}

        <div className="input">
          <img src={email} alt="Email Icon" />
          <input
            type="email"
            placeholder="Email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={password} alt="Password Icon" />
          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
      </div>

      {action === "login" ? null : (
        <div className="forgot-password">
          Lost Password? <span>Click here!</span>
        </div>
      )}

      <div className="submit-container">
        <button className="submit" onClick={handleSubmit}>
          {action === "login" ? "Login" : "Register"}
        </button>
      </div>

      {user && (
        <div>
          <h3>User object stored:</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Login;