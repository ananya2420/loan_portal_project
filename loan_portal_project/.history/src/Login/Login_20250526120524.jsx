import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// InputField Component (Reusable)
const InputField = ({ label, name, type, register, errors }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <input
      {...register(name, { required: `${label} is required` })}
      type={type}
      placeholder={`Enter your ${label.toLowerCase()}`}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition duration-150"
    />
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);

const LoginFormComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    const { username, email, password } = data;
    const newUser = { username, email, password };
    dispatch(loginUser(newUser));
    setLoading(false);
    navigate('/dashboard');
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 border border-gray-200 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-yellow-600 mb-6">Login</h2>

        <InputField label="Username" name="username" type="text" register={register} errors={errors} />
        <InputField label="Email" name="email" type="email" register={register} errors={errors} />
        <InputField label="Password" name="password" type="password" register={register} errors={errors} />

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={() => navigate('/thank-you')}
            className="px-5 py-2 bg--400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Back
          </button>

          <button
            type="submit"
            className="px-5 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        {user && (
          <div className="mt-6 text-green-800 bg-green-100 border border-green-300 p-4 rounded-md text-sm">
            <p className="font-semibold mb-1">Welcome, {user.username}!</p>
            <pre className="text-xs text-gray-700">{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </form>

      {user && (
        <div className="mt-4">
          <button
            onClick={logoutHandler}
            className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const LoginForm = () => (
  <Provider store={store}>
    <LoginFormComponent />
  </Provider>
);

export default LoginForm;
