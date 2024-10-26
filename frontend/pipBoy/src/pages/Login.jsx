import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {toast} from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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
      toast.success('Login successfull. Welcome to the app');
      paraHome();
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100 overflow-hidden">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login Actions</h2>
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
          Login
        </button>
        
                         <button
                  type="button"
                  className="w-full bg-indigo-500 text-white p-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
                  onClick={() => window.open('http://localhost:8080/realms/pip_boy/protocol/openid-connect/auth?client_id=account-console&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Frealms%2Fpip_boy%2Faccount%2F%23%2F&state=2a5803bd-3cc1-4395-8131-413aede0c769&response_mode=fragment&response_type=code&scope=openid&nonce=c9503e52-4efc-4af3-9af7-472b0fc3ba05&code_challenge=SKsHTNl1QWwhKn8TfOIl7qaXkcXCvj2G2Feau7r_s84&code_challenge_method=S256', '_blank')}
                >
                  Register
                </button>
      </form>
    </div>
  );
};

export default Login;