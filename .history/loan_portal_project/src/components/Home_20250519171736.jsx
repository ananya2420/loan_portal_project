//Home component- redirect to- Apply page
//use react-hook-form
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import loan from '../assets/loan.png';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    navigate('/apply', { state: { username: data.username, email: data.email } });
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const steps = ['Start', 'Application', 'Review', 'Complete'];
  const currentStep = 1;

  return (
    <div
      className={min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }}
    >
      {/* Progress */}
      <div className="w-full max-w-md mb-6 flex justify-between text-sm font-medium">
        {steps.map((label, index) => (
          <div
            key={index}
            className={flex-1 text-center border-b-4 pb-2 ${
              currentStep === index + 1
                ? 'border-blue-600 text-blue-600'
                : 'border-gray-300 text-gray-400'
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Toggle Theme Button */}
      <div className="w-full max-w-md flex justify-end mb-4">
        <button
          onClick={handleToggleTheme}
          className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Toggle Theme
        </button>
      </div>

      {/* Background Image Card with Form Overlay */}
      <div
        className={relative w-full max-w-md h-[500px] rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }}
      >
        {/* Background image */}
        <img src={loan} alt="Loan" className="absolute inset-0 w-full h-full object-cover" />

        {/* Overlay content */}
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center px-8">
          <h1 className="text-2xl font-bold text-white mb-4 text-center">
            Welcome to the Loan Portal
          </h1>
          <p className="text-gray-200 text-center mb-6 text-sm">
            Enter your name and email to begin your loan application.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                {...register('username', { required: 'Name is required' })}
                className="w-full p-3 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Your Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full p-3 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isValid}
              className={w-full px-6 py-2 rounded text-white font-semibold transition ${
                isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
              }}
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;