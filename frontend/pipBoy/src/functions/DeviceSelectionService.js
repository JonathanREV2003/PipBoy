import axios from 'axios';

const token = sessionStorage.getItem('token'); // Obtener el token de la sesión

export const fetchDevices = async () => {
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