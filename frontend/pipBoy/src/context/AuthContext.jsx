import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem('refreshToken') || '');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  const updateUsername = async (newUsername) => {
    const token = sessionStorage.getItem('token');
    const tenant = 'pip_boy'; // Asegúrate de que el tenant esté definido
  
    if (!token) {
      console.error('Token is missing');
      return;
    }
  
    try {
      const response = await axios.post(
        '/update-username?tenant=pip_boy', // Asegúrate de que la URL es correcta
        {
          username: newUsername
        },
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  const fetchUserData = async () => {
    const token = sessionStorage.getItem('token');
    const tenant = 'pip_boy';

    if (!token) {
      return;
    }

    try {
      const response = await axios.get('https://www.waetherlink.us/api/auth/verifyToken?tenant=pip_boy', {
        headers: {
          Authorization: `${token}`
        }
      });
      setUser(response.data);
      sessionStorage.setItem('userName', response.data.name);
      updateUsername(response.data.email);
      console.log('User data:', response.data.name);
    } catch (error) {
      toast.error('Session expired. Please login again');
    }
  };

  const login = async (email, password, tenant) => {
    try {
      const response = await axios.post(
        'https://www.waetherlink.us/api/auth/login', // Reemplaza con tu endpoint de Keycloak
        {
          username: email,
          password: password,
          tenant: tenant
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer xPF0yfpqs7N4JmUkgIiIMOxmQ0CHZLoR'
          },
          withCredentials: true
        }
      );

      const { accessToken, refreshToken } = response.data;

      // Actualizar el estado
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // Guardar los tokens en sessionStorage
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);

      // Actualizar el estado
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // Crear y guardar el token combinado
      const combinedToken = `Bearer xPF0yfpqs7N4JmUkgIiIMOxmQ0CHZLoR|${response.data.accessToken}`;
      sessionStorage.setItem('token', combinedToken);
      await fetchUserData(); 

      

      return true;
    } catch (error) {
      toast.error('Invalid credentials');
      console.error('Error logging in:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const yourToken = sessionStorage.getItem('token'); // Reemplaza 'yourTokenKey' con la clave adecuada
      const tenant = 'asgard'; // Reemplaza 'yourTenant' con el valor adecuado

      const response = await axios.get(
        'http://localhost:8081/api/auth/signout', // Reemplaza con tu endpoint de Keycloak
        {
          params: { tenant }, // Incluye el parámetro tenant en los parámetros de la solicitud
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${yourToken}`,
          },
          withCredentials: true, // Incluye credentials
        }
      );

      if (response.status !== 200) {
        throw new Error("Error logging out");
      }

      // Limpiar los tokens del sessionStorage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessToken');

      // Actualizar el estado
      setAccessToken('');
      setRefreshToken('');

      return true;
    } catch (error) {
      console.error('Error logging out:', error);
      return false;
    }
  };

  const hasRole = (role) => {
    return user?.realm_access?.roles.includes(role);
  };


  

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, user, login, logout, fetchUserData,hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };