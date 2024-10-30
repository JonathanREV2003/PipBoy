import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { startTemperature, stopTemperature } from "../functions/apiFunctions";
import { Container, Title, Button } from "../components/StyledComponents";
import { toast } from "react-hot-toast";

function Temperature() {
  const [temperature, setTemperature] = useState(null);
  const [fetchActive, setFetchActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [counter, setCounter] = useState(25);
  const [counterIntervalId, setCounterIntervalId] = useState(null);
  const navigate = useNavigate();

  const sensorTemperature = async () => {
    const token = sessionStorage.getItem('token'); // Asegúrate de obtener el token de la sesión
    try {
      const response = await axios.get('/sensor-temperature?tenant=pip_boy', {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data.temperatureC !== undefined) {
        setTemperature(response.data.temperatureC);
        const alertSettings = JSON.parse(localStorage.getItem("alertSettings"));
        const temperatureMin = alertSettings?.temperatureMin;
        const temperatureMax = alertSettings?.temperatureMax;

        console.log(temperatureMin);
        console.log(temperatureMax);

        if (response.data.temperatureC >= temperatureMin && response.data.temperatureC <= temperatureMax) {
          stopTemperature(setFetchActive);
          toast.error(
            `¡Alerta! Temperatura esta entre el rango de: (${temperatureMin}-${temperatureMax}) con ${response.data.temperatureC}°C `
          );
        }
      }
    } catch (error) {
      console.error("Error fetching temperature data:", error);
    }
  };

  useEffect(() => {
    if (!fetchActive) return;

    // Primera medición a los 500ms
    const timeout = setTimeout(() => {
      sensorTemperature();
      // Luego configurar el intervalo para cada 25 segundos
      const interval = setInterval(sensorTemperature, 25000);
      setIntervalId(interval);
    }, 500);
    setTimeoutId(timeout);

    // Limpiar el timeout y el intervalo al desmontar el componente o cuando fetchActive cambie
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [fetchActive]);

  const handleNavigateHome = () => {
    navigate("/home");
  };

  const handleButtonClick = () => {
    console.log("fetchActive before click:", fetchActive);
    if (fetchActive) {
      stopTemperature(setFetchActive);
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      clearInterval(counterIntervalId);
      setCounter(25); // Reset counter to 25 when stopped
    } else {
      startTemperature(setFetchActive);
      const counterInterval = setInterval(() => {
        setCounter(prevCounter => {
          if (prevCounter === 1) {
            return 25;
          } else {
            return prevCounter - 1;
          }
        });
      }, 1000);
      setCounterIntervalId(counterInterval);
    }
    console.log("fetchActive after click:", !fetchActive);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gradient-to-r from-green-200 to-blue-200 p-4 relative">
      <button
        onClick={handleNavigateHome}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 absolute top-4 left-4"
      >
        Back
      </button>
      <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Body Temperature</h1>
        {temperature !== null ? (
          <div className="text-4xl md:text-7xl font-bold text-blue-500 mb-4">
            {temperature}°C
          </div>
        ) : (
          <div className="text-xl md:text-2xl text-gray-500 mb-4">
            Loading...
          </div>
        )}
        <button
          onClick={handleButtonClick}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mb-4"
        >
          {fetchActive ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
}

export default Temperature;
