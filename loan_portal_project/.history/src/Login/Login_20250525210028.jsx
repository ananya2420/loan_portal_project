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
    <label className="block text-sm font-medium text-purple-700 mb-1">{label}</label>
    <input
      {...register(name, { required: `${label} is required` })}
      type={type}
      // Placeholder removed as requested
      // placeholder={`Enter your ${label.toLowerCase()}`}
      className="w-full px-4 py-2 border-2 border-purple-400 focus:border-purple-600 rounded-lg outline-none transition"
    />
    {errors[name] && <p className="text-red-600 text-sm mt-1">{errors[name].message}</p>}
  </div>
);

const LoginFormComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
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
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 border-2 border-purple-300 rounded-lg shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">Login</h2>

        <InputField label="Username" name="username" type="text" register={register} errors={errors} />
        <InputField label="Email" name="email" type="email" register={register} errors={errors} />
        <InputField label="Password" name="password" type="password" register={register} errors={errors} />

        {/* Button Row: Back and Next */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={() => navigate('/thank-you')}
            className="px-5 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Back
          </button>

          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        {user && (
          <div className="mt-6 text-green-800 bg-green-200 border border-green-400 p-4 rounded text-sm">
            <p className="font-semibold mb-1">Welcome, {user.username}!</p>
            <pre className="text-xs text-green-900">{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </form>

      {user && (
        <div className="mt-4">
          <button
            onClick={logoutHandler}
            className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
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



