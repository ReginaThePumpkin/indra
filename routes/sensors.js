var express = require('express'); // Declarando dependencia del modulo express
var router = express.Router(); // Variable para redirigir las peticiones que reciba externamente



var Ucontroller = require('../controllers/user.controller'); 

router.get('/user/:user_id', Ucontroller.getUser);

var UScontroller = require('../controllers/users.controller'); 

router.get('/users', UScontroller.usersList); // Realizando la peticion GET para mostrar la lista de usuarios
router.get('/users/:idUser', UScontroller.getUser); // Realizando la peticion GET para mostrar un usuario mediante su ID
router.post('/register-user', UScontroller.insertUser); // Realizando peticion POST para insertar un usuario
router.post('/login', UScontroller.loginUser); // Realizando peticion POST para verificar el login del usuario
//router.get('/user-plants/:idUser', UScontroller.getUserPlants);


module.exports = router; // Objeto que quiero exportar o hacer publico fuera de este archivo