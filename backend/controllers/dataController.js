const dataService = require('../services/dataService');
const { getSensorData, getHeartRateData, getTemperatureData, 
    getWsClient, getOxygenData} = require('../handlers/webSocketHandler');
const WebSocket = require('ws');


const test = (req, res) => {
    res.json('Hello from the server!');
}

const getAll  = async (req, res) => {
    const temperatures = await dataService.getAll();
    res.json(temperatures);
}

const create = async (req, res) => {
    const temperature = req.body;
    const newTemperature = await dataService.create(temperature);
    res.json(newTemperature);
}

const createOxygen = async (req, res) => {
    const oxygen = req.body;
    const newOxygen = await dataService.createOxygen(oxygen);
    res.json(newOxygen);
}

const getAllOxygen = async (req, res) => {
    const oxygen = await dataService.getAllOxygen();
    res.json(oxygen);
}


const sensorData = async (req, res) => {
    res.json(getSensorData());
}

const sensorTemperature = async (req, res) => {
    res.json(getTemperatureData());
}

const sensorOxygen = async (req, res) => {
    res.json(getOxygenData());
}

const sensorHeartRate = async (req, res) => {
    res.json(getHeartRateData());
}

const startSensorData = async (req, res) => {
    const wsClient = getWsClient();
    if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send('START');
        res.json({ message: 'Señal de inicio enviada al ESP32' });
    } else {
        res.status(500).json({ message: 'No hay conexión WebSocket con el ESP32' });
    }
};

const stopSensorData = async (req, res) => {
    const wsClient = getWsClient();
    if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send('STOP');
        res.json({ message: 'Señal de inicio enviada al ESP32' });
    } else {
        res.status(500).json({ message: 'No hay conexión WebSocket con el ESP32' });
    }
};

const startTemperature = async (req, res) => {
    const wsClient = getWsClient();
    if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send('STARTT');
        res.json({ message: 'Señal de inicio enviada al ESP32' });
    } else {
        res.status(500).json({ message: 'No hay conexión WebSocket con el ESP32' });
    }
}

const stopTemperature = async (req, res) => {
    const wsClient = getWsClient();
    if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send('STOPT');
        res.json({ message: 'Señal de parada enviada al ESP32' });
    } else {
        res.status(500).json({ message: 'No hay conexión WebSocket con el ESP32' });
    }
}

const startOxygen = async (req, res) => {
    const wsClient = getWsClient();
    if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send('STARTO');
        res.json({ message: 'Señal de inicio enviada al ESP32' });
    } else {
        res.status(500).json({ message: 'No hay conexión WebSocket con el ESP32' });
    }
}

const stopOxygen = async (req, res) => {
    const wsClient = getWsClient();
    if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send('STOPO');
        res.json({ message: 'Señal de parada enviada al ESP32' });
    } else {
        res.status(500).json({ message: 'No hay conexión WebSocket con el ESP32' });
    }
}

const startHeartRate = async (req, res) => {
    const wsClient = getWsClient();
    if(wsClient && wsClient.readyState === WebSocket.OPEN){
        wsClient.send('STARTH');
        res.json({message: 'Señal de inicio enviada al ESP32'});
    } else {
        res.status(500).json({message: 'No hay conexión WebSocket con el ESP32'});
    }
}

const stopHeartRate = async (req, res) => {
    const wsClient = getWsClient();
    if(wsClient && wsClient.readyState === WebSocket.OPEN){
        wsClient.send('STOPH');
        res.json({message: 'Señal de parada enviada al ESP32'});
    } else {
        res.status(500).json({message: 'No hay conexión WebSocket con el ESP32'});
    }
}

// Nueva función para almacenar el refreshToken en la sesión
const storeSessionToken = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).send('Falta el token de sesión');
    }

    // Almacenar el token de sesión en la sesión del usuario
    req.session.refreshToken = refreshToken;

    console.log('Session Token almacenado en la sesión:', req.session.refreshToken);

    // Responder con éxito
    res.status(200).send('Token de sesión recibido y almacenado en la sesión');
};

const checkSession = (req, res) => {
    if (!req.session) {
        return res.status(500).send("Session is not available");
    }

    const refreshToken = req.session.refreshToken;
    if (!refreshToken) {
        return res.status(404).send("No refresh token found in session");
    }

    res.send({ refreshToken });
};

module.exports = {
    create,
    test,
    getAll,
    startTemperature,
    stopTemperature,
    sensorData,
    startSensorData,
    stopSensorData,
    sensorTemperature,
    stopOxygen,
    startOxygen,
    sensorOxygen,
    startHeartRate,
    stopHeartRate,
    sensorHeartRate,
    createOxygen,
    getAllOxygen,
    storeSessionToken,
    checkSession
}

