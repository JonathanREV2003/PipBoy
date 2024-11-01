import axios from 'axios';
let token = sessionStorage.getItem('token'); // Asegúrate de obtener el token de la sesión

export const startSending = (setFetchActive) => {
  axios.post('/start-sending?tenant=pip_boy', {},  {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
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
  axios.post('/stop-sending?tenant=pip_boy', {}, {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
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
  axios.post('/start-heart-rate?tenant=pip_boy', {}, {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
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
  axios.post('/stop-heart-rate?tenant=pip_boy', {}, {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
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

  axios.post('/start-temperature?tenant=pip_boy', {}, {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
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

  axios.post('/stop-temperature?tenant=pip_boy', {}, {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log(response.data.message);
    setTemperatureActive(false);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error al enviar la señal de parada de temperatura');
  });
};

export const startOxygen = (setOxygenActive) => {
  axios.post('/start-oxygen?tenant=pip_boy', {}, {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log(response.data.message);
      setOxygenActive(true);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al enviar la señal de inicio de oxigeno');
    });
};

export const stopOxygen = (setOxygenActive) => {
  axios.post('/stop-oxygen?tenant=pip_boy', {}, {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log(response.data.message);
      setOxygenActive(false);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al enviar la señal de detener oxigeno');
    });
};

