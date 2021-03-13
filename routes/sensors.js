var express = require('express'); // Declarando dependencia del modulo express
var router = express.Router(); // Variable para redirigir las peticiones que reciba externamente

var Scontroller = require('../controllers/sensors.controller'); // Variable que contiene la ruta del sensors.controller.js

router.get('/sensors', Scontroller.sensor_data_list); // Realizando la peticion GET para mostrar la lista de datos de los sensores
router.get('/sensors/:idSensorData', Scontroller.get_sensor_data); // Realizando la peticion GET para mostrar un dato del sensor mediante su ID
router.post('/sensors', Scontroller.insert_sensor_data); // Realizando peticion POST para insertar un dato del sensor

/*
var Ucontroller = require('../controllers/user.controller'); 


router.get('/user/:idUser', Ucontroller.getUser);
router.get('/user-plants/:userId', Ucontroller.getUserPlants);
*/
var UScontroller = require('../controllers/users.controller'); 

router.get('/users', UScontroller.usersList); // Realizando la peticion GET para mostrar la lista de usuarios
router.get('/users/:idUser', UScontroller.getUser); // Realizando la peticion GET para mostrar un usuario mediante su ID
router.post('/users/register', UScontroller.insertUser); // Realizando peticion POST para insertar un usuario
router.post('/users/login', UScontroller.loginUser); // Realizando peticion POST para verificar el login del usuario
router.get('/user-plants/:idUser', UScontroller.getUserPlants);


var Pcontroller = require('../controllers/plant.controller'); 

router.get('/plant-luminosity/:idPlant', Pcontroller.getPlantLuminosity);
router.get('/plant-humidity/:idPlant', Pcontroller.getPlantHumidity);
router.get('/plant-earth-humidity/:idPlant', Pcontroller.getPlantEarthHumidity);
router.get('/plant-temperature/:idPlant', Pcontroller.getPlantTemperature);

router.get('/plant-luminosity-byname/:name', Pcontroller.getPlantLuminosityByName);
router.get('/plant-humidity-byname/:name', Pcontroller.getPlantHumidityByName);
router.get('/plant-earth-humidity-byname/:name', Pcontroller.getPlantEarthHumidityByName);
router.get('/plant-temperature-byname/:name', Pcontroller.getPlantTemperatureByName);

router.get('/plant-byname/:name', Pcontroller.getPlantInfoByName);
router.get('/plant-last-status/:qrPlant', Pcontroller.getPlantLastStatus);


module.exports = router; // Objeto que quiero exportar o hacer publico fuera de este archivo