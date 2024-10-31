import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { DeviceContext } from '../context/DeviceContext'; // Import DeviceContext
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, fetchUserData } = useContext(AuthContext); // Destructure fetchUserData
  const { fetchData } = useContext(DeviceContext); // Destructure fetchData

  const paraHome = () => {
    navigate('/home');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password, 'pip_boy');
    if (success) {
      await fetchUserData(); // Fetch user data after login
      await fetchData(); // Fetch device data after login
      toast.success('Login successful. Welcome to the app');
      paraHome();
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100 overflow-hidden">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">PipBoy</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
        <button
          type="button"
          className="w-full bg-indigo-500 text-white p-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
          onClick={() => window.open('https://www.waetherlink.us/realms/pip_boy/login-actions/registration?client_id=account-console&tab_id=SmZ30yGV8-c', '_blank')}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;