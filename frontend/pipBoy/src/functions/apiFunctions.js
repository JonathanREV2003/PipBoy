import axios from 'axios';

const getToken = () => {
    return sessionStorage.getItem('token');
};

export const startSending = (setFetchActive) => {
  const token = getToken();
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
  const token = getToken();
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
  const token = getToken();
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
  const token = getToken();
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
  const token = getToken();
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
  const token = getToken();
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
  const token = getToken();
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
  const token = getToken();
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