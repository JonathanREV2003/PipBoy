import axios from 'axios';

const getToken = () => {
  return sessionStorage.getItem('token');
};

export const fetchDevices = async () => {
  const token = getToken();
  try {
    const response = await axios.get('/getDevice?tenant=pip_boy', {
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los dispositivos', error);
    throw error;
  }
};

export const createDevice = async (newDevice) => {
  const token = getToken();
  try {
    await axios.post('/device?tenant=pip_boy', newDevice, {
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error al crear el dispositivo', error);
    throw error;
  }
};