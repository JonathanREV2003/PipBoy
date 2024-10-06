const express = require('express');
const router = express.Router();
const cors = require('cors');
const { create, test, getAll, startTemperature, stopTemperature} = require('../controllers/dataController');



const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Origen permitido
  credentials: true, // Permitir credenciales
};

router.use(cors(corsOptions));

router.post('/temperatures', create);
router.get('/', test);
router.get('/getTemperatures', getAll);
router.post('/start-temperature', startTemperature);
router.post('/stop-temperature', stopTemperature);


module.exports = router;