import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { RiLineChartLine, RiHashtag } from "react-icons/ri";
import axios from "axios"; // Importa axios
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { DeviceContext } from '../context/DeviceContext'; 

const BlockedContent = () => (
  <div>
    <h1>Access Denied</h1>
    <p>You do not have permission to view this content.</p>
  </div>
);

function Home() {
  const [averageTemperature1, setAverageTemperature] = useState(null);
  const [averageOxygen1, setAverageOxygen] = useState(null);
  const [averageBPM1, setAverageBPM] = useState(null);

  const fetchAverageTemperature = async () => {
    const token = sessionStorage.getItem('token'); // Obtener el token de la sesión del navegador

    try {
      const tempResponse = await axios.get('/average-temperature?tenant=pip_boy', {
        headers: {
          Authorization: `${token}`
        }
      });
      const averageTempC = parseFloat(tempResponse.data.averageTemperatureC);
      if (!isNaN(averageTempC)) {
        setAverageTemperature(averageTempC.toFixed(2)); // Redondear a 2 decimales
      } else {
        console.error('Invalid temperature value:', tempResponse.data.averageTemperatureC);
      }
    } catch (error) {
      console.error('Error fetching average temperature:', error);
    }
  };

  const fetchAverageBPM = async () => {
    const token = sessionStorage.getItem('token'); // Obtener el token de la sesión del navegador

    try {
      const tempResponse = await axios.get('/average-heart-rate?tenant=pip_boy', {
        headers: {
          Authorization: `${token}`
        }
      });
      const averageAvgBpm = parseFloat(tempResponse.data.averageAvgBpm);
      if (!isNaN(averageAvgBpm)) {
        setAverageBPM(averageAvgBpm.toFixed(2)); // Redondear a 2 decimales
      } else {
        console.error('Invalid BPM value:', tempResponse.data.averageAvgBpm);
      }
    } catch (error) {
      console.error('Error fetching average BPM:', error);
    }
  };

  const fetchAverageOyxgen = async () => {
    const token = sessionStorage.getItem('token'); // Obtener el token de la sesión del navegador

    try {
      const tempResponse = await axios.get('/average-oxygen?tenant=pip_boy', {
        headers: {
          Authorization: `${token}`
        }
      });
      const averageOxygen = parseFloat(tempResponse.data.averageOxygen);
      if (!isNaN(averageOxygen)) {
        setAverageOxygen(averageOxygen.toFixed(2)); // Redondear a 2 decimales
      } else {
        console.error('Invalid oxygen value:', tempResponse.data.averageOxygen);
      }
    } catch (error) {
      console.error('Error fetching average oxygen:', error);
    }
  };


  const { comparisonValue, averageTemperature, averageOxygen, loading, error, isInitialized } = useContext(DeviceContext);

  const { user } = useContext(AuthContext); // Usa el contexto
  

  const navigate = useNavigate();

  const paraGraficas = () => {
    navigate('/graficas');
  };
  const paraPagina2 = () => {
    navigate('/oxygen');
  };
  const paraPagina3 = () => {
    navigate('/temperature');
  };
  const paraPagina4 = () => {
    navigate('/alertas');
  };

  
  const fetchData = async () => {
    const token = sessionStorage.getItem('token'); // Obtener el token de la sesión del navegador
    const tenant = 'pip_boy'; // Reemplaza con el valor real de tenant

    try {
      const response = await axios.get('https://www.waetherlink.us/api/pip_boy/authenticate?tenant=pip_boy', {
        headers: {
          Authorization: `${token}`
        },

      });
      console.log(response.data);
    } catch (error) {
      toast.error('Session expired. Please login again');
      navigate('/'); // Redirigir al login en caso de error
    }
  };

  useEffect(() => {
    fetchAverageTemperature();
    fetchAverageOyxgen();
    fetchAverageBPM();
    const intervalId = setInterval(fetchData, 300000); // Ejecutar fetchData cada 5 minutos (300000 ms)
    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (user.Device !== comparisonValue) {
    return <BlockedContent />;
  }

  return (
    <>
      {/* Section 1 */}
      
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8">
        {/* Card 1 */}
        <div className="bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
          <RiLineChartLine className="text-5xl" />
          <h4 className="text-2xl">HR Graphics</h4>
          <span className="text-5xl text-white">Pulse</span>
          {/* con onclick para ir a otro lado */}
          <button onClick={paraGraficas} className="bg-red-100/20 py-2 px-6 rounded-xl text-white w-full">
            Measure Now
          </button>

        </div>
        {/* Card 2 */}
        <div className="p-4 bg-white rounded-xl flex flex-col justify-between gap-4 drop-shadow-2xl">
            <div className="flex items-center gap-4 bg-primary-100/10 rounded-xl p-4">
              <span className="bg-primary-100 text-gray-300 text-2xl font-bold p-4 rounded-xl">
                98
              </span>
              <div>
                <h3 className="font-bold">AVG</h3>
                <p className="text-gray-500">Beats per Minute</p>
              </div>
            </div>
            <div className="bg-primary-100/10 rounded-xl p-4">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-primary-100 text-gray-300 text-2xl font-bold p-4 rounded-xl">
                  32
                </span>
                <div>
                  <h3 className="font-bold">Blood Oxygen</h3>
                  <p className="text-gray-500">Percentage</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <button onClick={paraPagina2} className="bg-primary-100 py-2 px-6 rounded-xl text-white w-full">
                  Measure now
                </button>
              </div>
            </div>
          </div>
          {/* Futuras secciones */}

          {/* Card 3*/}
          <div className="p-4 bg-white rounded-xl flex flex-col justify-between gap-4 drop-shadow-2xl">

            <div className="bg-primary-100/10 rounded-xl p-4">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-primary-100 text-gray-300 text-2xl font-bold p-4 rounded-xl">
                  32
                </span>
                <div>
                  <h3 className="font-bold">Temperature</h3>
                  <p className="text-gray-500">Body</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <button onClick={paraPagina3} className="bg-primary-100 py-2 px-6 rounded-xl text-white w-full">
                  Measure now
                </button>
              </div>
            </div>
          </div>
          
        </section>
      {/* Section 2 */}
      <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-8">Recent history</h1>
          <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
            {/* Card 1 */}
            <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
              <div className="col-span-2 flex items-center gap-4">
                <img
                  src="https://img.freepik.com/free-vector/cartoon-style-realistic-vector-icon-hot-cold-thermometer-cartoon-style-isolated-white-back_134830-1459.jpg?t=st=1729301989~exp=1729305589~hmac=35823c3b03d66494e0818f6f510b8ef810fbe481f43165cde8a05f3f6caf867d&w=996"
                  className="w-14 h-14 object-cover rounded-xl"
                  alt="BPM Graphics"
                />
                <div>
                  <h3 className="font-bold">Body Temperature</h3>
                  <p className="text-gray-500">Average of the most recent data</p>
                </div>
              </div>
              <div>
          
              </div>
              <div>
              <span className="font-bold">{averageTemperature1 ? `${averageTemperature1} °C` : 'Loading...'}</span>
              </div>
            </div>
            {/* Card 2 */}
            <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
              <div className="col-span-2 flex items-center gap-4">
                <img
                  src="https://img.freepik.com/free-vector/donation-blood-bag-hanging-icon_24877-83378.jpg"
                  className="w-14 h-14 object-cover rounded-xl"
                  alt="Blood Oxygen"
                />
                <div>
                  <h3 className="font-bold">Blood Xxygen</h3>
                  <p className="text-gray-500">Average of the most recent data</p>
                </div>
              </div>
              <div>
              </div>
              <div>
              <span className="font-bold">{averageOxygen1 ? `${averageOxygen1} %` : 'Loading...'}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
              <div className="col-span-2 flex items-center gap-4">
                <img
                  src="https://img.freepik.com/free-vector/healthy-heart-symbol-hospital-care-icon-isolated_24877-83410.jpg"
                  className="w-14 h-14 object-cover rounded-xl"
                  alt="Blood Oxygen"
                />
                <div>
                  <h3 className="font-bold">BPM</h3>
                  <p className="text-gray-500">Average of the most recent data</p>
                </div>
              </div>
              <div>
              </div>
              <div>
              <span className="font-bold">{averageBPM1 ? `${averageBPM1} BPM` : 'Loading...'}</span>
              </div>
            </div>
          </div>
        
        </div>

      </section>
    </>
  );
  
}

export default Home;