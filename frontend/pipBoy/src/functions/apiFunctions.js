import axios from 'axios';

export const startSending = (setFetchActive) => {
  axios.post('/start-sending', {}, { withCredentials: true })
    .then(response => {
      console.log(response.data.message);
      setFetchActive(true);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al enviar la señal de inicio');
    });
};

export const stopSending = (setFetchActive) => {
  axios.post('/stop-sending')
    .then(response => {
      console.log(response.data.message);
      setFetchActive(false);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al enviar la señal de parada');
    });
};

export const startHeartRate = (setHeartRateActive) => {
  axios.post('https://esp32-jk3y.onrender.com/api/start-heart-rate')
    .then(response => {
      console.log(response.data.message);
      setHeartRateActive(true);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al enviar la señal de inicio de frecuencia cardíaca');
    });
};

export const stopHeartRate = (setHeartRateActive) => {
  axios.post('https://esp32-jk3y.onrender.com/api/stop-heart-rate')
    .then(response => {
      console.log(response.data.message);
      setHeartRateActive(false);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al enviar la señal de parada de frecuencia cardíaca');
    });
};

export const startTemperature = (setTemperatureActive) => {
  axios.post('https://esp32-jk3y.onrender.com/api/start-temperature')
    .then(response => {
      console.log(response.data.message);
      setTemperatureActive(true);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al enviar la señal de inicio de temperatura');
    });
};

export const stopTemperature = (setTemperatureActive) => {
  axios.post('https://esp32-jk3y.onrender.com/api/stop-temperature')
    .then(response => {
      console.log(response.data.message);
      setTemperatureActive(false);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al enviar la señal de parada de temperatura');
    });
};