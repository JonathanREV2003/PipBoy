import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Title, Button, ChartContainer } from '../components/StyledComponents';
import { startSending, stopSending } from '../functions/apiFunctions';
import {toast} from 'react-hot-toast'

function Graficas() {
  const navigate = useNavigate();
  const [sensorData, setSensorData] = useState([]);
  const [fetchActive, setFetchActive] = useState(false);
  const maxDataPoints = 20; // Limitar a los últimos 20 puntos de datos
  const [alertSettings, setAlertSettings] = useState({});
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    // Cargar configuración de alertas desde localStorage
    const savedSettings = localStorage.getItem('alertSettings');
    if (savedSettings) {
      setAlertSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    if (!fetchActive) return;

    const worker = new Worker(new URL('../functions/sensorDataWorker.js', import.meta.url));
    worker.postMessage({token, maxDataPoints });

    worker.onmessage = (event) => {
      const { type, newData, error } = event.data;
      if (type === 'newData') {
        setSensorData(prevData => {
          const updatedData = [...prevData, newData];
          if (updatedData.length > maxDataPoints) {
            updatedData.shift(); // Quitar el dato más antiguo
          }

          // Comprobar alertas
          checkAlerts(newData.value);

          return updatedData;
        });
      } else if (type === 'error') {
        console.error(error);
      }
    };

    return () => worker.terminate();
  }, [fetchActive, alertSettings]);

  const checkAlerts = (value) => {
    
    const alertSettings = JSON.parse(localStorage.getItem("alertSettings"));
        const pulseMin = alertSettings?.pulseMin;
        const pulseMax = alertSettings?.pulseMax;
    console.log(pulseMax)
    console.log(value)
    if ((pulseMin && value >= pulseMin) && (pulseMax && value <= pulseMax)) {
      stopSending(setFetchActive);
          toast.error(
            `Alerta: El pulso se encuentra en el rango de (${pulseMin}-${pulseMax}) con ${value}`
          );
    }
  };

  const handleNavigateHome = () => {
    navigate('/home');
  };

  const handleButtonClick = () => {
    console.log('fetchActive before click:', fetchActive);
    if (fetchActive) {
      stopSending(setFetchActive);
    } else {
      startSending(setFetchActive);
    }
    console.log('fetchActive after click:', !fetchActive);
  };

  return (
    <div>
      <button onClick={handleNavigateHome} className="bg-primary-100 py-2 px-6 rounded-xl text-white inline-block mt-4">
        Back
      </button>
      <Container>
        <Title>Heart Rate Monitor</Title>
        <Button onClick={handleButtonClick} style={{ marginBottom: '20px' }}>
          {fetchActive ? 'Stop Monitoring' : 'Start Monitoring'}
        </Button>
        <ChartContainer>
          <ResponsiveContainer>
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="time" stroke="#00c6ff" />
              <YAxis stroke="#00c6ff" domain={['dataMin', 'dataMax']} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#00c6ff' }} itemStyle={{ color: '#121212' }} />
              <Legend wrapperStyle={{ color: '#00c6ff' }} />
              <Line 
                type="linear" 
                dataKey="value" 
                stroke="#00c6ff" 
                dot={false} 
                isAnimationActive={true} 
                animationDuration={300} 
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Container>
    </div>
  );
}

export default Graficas;
