//var mysql = require('mysql'); // Declarando dependencia del modulo mysql
var config = require('../helpers/config'); // Variable que contiene la ruta del config.js
var pool = config.pool; // Crear la conexion con los datos almacenados en config


/**
 * [Function that gets all data from an user]
 * @param  user_id
 * @return response/error
 */ 
module.exports.getUser = (request, response) => {
    var sql = "SELECT * FROM users WHERE id = ?"; 
    console.log("user_id: "+[request.params.user_id]);
    pool.query(sql, [request.params.user_id], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}
