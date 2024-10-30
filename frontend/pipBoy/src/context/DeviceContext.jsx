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
      

      const deviceResponse = await axios.get('http://localhost:8081/api/pip_boy/get-device-id?tenant=pip_boy', {
        headers: { Authorization: `${token}` },
      });
      setComparisonValue(deviceResponse.data.deviceId);

      await axios.get('http://localhost:8081/api/auth/verifyToken?tenant=pip_boy', {
        headers: { Authorization: `${token}` },
      });

      setIsInitialized(true);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Remove useEffect that calls fetchData on component mount
  // useEffect(() => {
  //   if (!isInitialized) {
  //     fetchData();
  //   }
  // }, [isInitialized]);

  return (
    <DeviceContext.Provider value={{  comparisonValue, isInitialized, loading, error, fetchData }}>
      {children}
    </DeviceContext.Provider>
  );
};
