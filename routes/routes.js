var express = require('express'); // Declarando dependencia del modulo express
var router = express.Router(); // Variable para redirigir las peticiones que reciba externamente

// -> USERS
var UScontroller = require('../controllers/users.controller'); 

/* Routes for user.controller.js */
router.get('/users', UScontroller.getUsers);
router.get('/users/:id', UScontroller.getUser);

router.post('/register-user', UScontroller.insertUser);
router.post('/login', UScontroller.loginUser); 
router.post('/recovery:email', UScontroller.passRecover);

module.exports = router;