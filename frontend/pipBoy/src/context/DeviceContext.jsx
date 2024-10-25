// DeviceContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  
  const [comparisonValue, setComparisonValue] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const token = sessionStorage.getItem('token');
    const tenant = 'pip_boy';

    try {
      

      const deviceResponse = await axios.get('/get-device-id');
      setComparisonValue(deviceResponse.data.deviceId);

      await axios.get('http://localhost:8081/api/auth/verifyToken', {
        headers: { Authorization: `${token}` },
        params: { tenant: tenant }
      });

      setIsInitialized(true);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      fetchData();
    }
  }, [isInitialized]);

  return (
    <DeviceContext.Provider value={{  comparisonValue, isInitialized, loading, error }}>
      {children}
    </DeviceContext.Provider>
  );
};
