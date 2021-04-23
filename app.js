// Declarando dependencias de diferentes modulos
var express = require('express');
var bodyParser = require('body-parser');
//const jwt = require('jsonwebtoken');
//const config = require('./config/jwt'); // Un archivo js no requiere la extension
var path = require('path');
var cors = require('cors');

var index = require('./routes/index'); // Variable que contiene la ruta del index.js
var routes = require('./routes/routes'); // Variable que contiene la ruta del routes.js

const host = '0.0.0.0';
const port = process.env.PORT || 3000;
//var port = 8060; // Declarando port en el 8060
var app = express(); // Metodos necesarios para poder crear una aplicacion web

app.use(cors()); // Inicializamos el cors()
app.use(bodyParser.json()); // Lo que recibamos del cliente o de la base de datos se convertira en formato JSON
app.use(bodyParser.urlencoded({extended: false})); // La informacion que recibamos desde el cliente o base de datos no estara codificada
app.use(express.static(__dirname + '/frontend')); // Enlazando a nuestro frontend de la pagina web

//HTML routes
app.use('', index); // Acceder al archivo index.js desde la raiz del sitio

//API routes
app.use('/api', routes); 

// Inicializar el servidor para poner en linea nuestra API
app.listen(port, () => {
    console.log('El servidor inicio en el puerto ' + port);
});

/*
const middleware = express.Router();
middleware.use((req,res,next)=>{
    const token = req.headers["auth-token"];

    if(token){
        //Valido
        //token,key,funcion
        jwt.verify(token, app.get("key"), (err, decoded)=>{
            if(err){
                return res.json({message: "Invalid token"})
            }else{
                console.log(decoded.id)
                console.log(decoded.user)
                req.decoded = decoded
                next()
            }

        });
    }else{
        res.send({mensaje: "Missing token"})
    }
})
*/