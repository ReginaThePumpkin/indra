var express = require('express'); // Declarando dependencia del modulo express
var router = express.Router(); // Variable para redirigir las peticiones que reciba externamente

// -> USERS
var UScontroller = require('../controllers/users.controller'); 

/* Routes for user.controller.js */
router.get('/users', UScontroller.getUsers);
router.get('/users/:id', UScontroller.getUser);

router.post('/register-user', UScontroller.insertUser);
router.post('/login-user', UScontroller.loginUser); 
router.post('/recovery:email', UScontroller.passRecover);

// -> CANDIDATES
var candidateController = require('../controllers/candidates.controller'); 

/* Routes for candidate.controller.js */
router.get('/candidates', candidateController.getCandidates);
router.get('/candidates/:id', candidateController.getCandidate);

router.post('/register-candidate', candidateController.insertCandidate);
router.post('/candidate-login', candidateController.loginCandidate); 
router.post('/candidate-recovery:email', candidateController.passRecover);

module.exports = router;