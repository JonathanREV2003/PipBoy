/* eslint-disable no-restricted-globals */

self.onmessage = function (event) {
  const { maxDataPoints, token } = event.data; // Obtener el token del mensaje

  const fetchData = () => {
    fetch('http://localhost:8081/api/pip_boy/sensor-data?tenant=pip_boy', {
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.type === 'sensor') {
        const newData = { time: new Date().toLocaleTimeString(), value: data.ir };
        self.postMessage({ type: 'newData', newData });
      }
    })
    .catch(error => {
      self.postMessage({ type: 'error', error: 'Error fetching sensor data: ' + error });
    });
  };

  setInterval(fetchData, 500); // Obtener datos cada 500ms
};

/* eslint-enable no-restricted-globals */