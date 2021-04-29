//var mysql = require('mysql'); // Declarando dependencia del modulo mysql
var config = require('../helpers/config'); // Variable que contiene la ruta del config.js
var nodemailer = require('nodemailer');
var pool = config.pool;
const bcrypt = require("bcrypt");

/**
 * [Get all users function]
 * @return response/error
 */ 
module.exports.getUsers = (request, response) => {
    var sql = "SELECT * FROM users LEFT JOIN rol ON users.id = rol.id"; 

    pool.query(sql, (error, results, fields) => {
        if (error) { response.send(error); }
        else { response.json(results); }
    });
}

/**
 * [Get user by id function]
 * @param  id
 * @return response/error
 */ 
module.exports.getUser = (request, response) => {

    var sql = "SELECT users.name, users.lastname, rol.rol, users.email FROM users LEFT JOIN rol ON users.id = rol.id WHERE users.id = ?";

    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) { response.send(error); }
        else { response.json(results); }
    });
}

/**
 * [Insert user function]
* @param  id
* @param  name 
* @param  lastname
* @param  rol_id
* @param  email
* @param  password
* @return response/error
 */
module.exports.insertUser = (request, response) => {
    var user = request.body;

    var sql = "INSERT INTO users SET ?";

    pool.query(sql, [user], (_error, _results, _fields) => {
        if (_error){
            var sendJson = '{"done":false, "errno":' + _error.errno + ', "message":"' + _error.sqlMessage + '"}';
            response.send(JSON.parse(sendJson));
        }
        else {
            var sendJson = '{"done":true, "errno":0, "message":"User registered successfuly."}';
            response.send(JSON.parse(sendJson));
        }
    });
}

/**
 * [Login function]
 * @param  email
 * @param  password
 * @return response/error
 */ 
module.exports.loginUser = (request, response) => {
    var user = request.body; 

    var sql1 = "SELECT * FROM users WHERE email='" + user.email + "'";

    pool.query(sql1, [user], (_error, _results, _fields) => {
        if (_error){ response.send(_error); } //Server error
        else {
            if (_results.length > 0){

                var sql2 = "SELECT * FROM users WHERE email='" + user.email + "' AND password = '" + user.password + "'";

                pool.query(sql2, [user], (__error, __results, __fields) => {
                    if (__error){ response.send(__error) } //Server error
                    else {
                        if (__results.length > 0){
                            //Success
                            var sendJson = '{"status":true, "errno":0, "messageInSpanish":"Usuario encontrado.", "messageInEnglish":"User found.", "name":"'+__results[0].name.split(' ')[0]+'"}';
                            response.send(JSON.parse(sendJson));
                        } else {
                            //Failure
                            var sendJson = '{"status":false, "errno":19, "messageInSpanish":"Usuario o contraseña incorecta, vuelve a intentarlo.", "messageInEnglish":"Incorrect email or password, please try again."}';
                            response.send(JSON.parse(sendJson));
                        }
                    }
                });
            } else {
                var sendJson = '{"status":false, "errno":19, "messageInSpanish":"Usuario o contraseña incorecta, vuelve a intentarlo.", "messageInEnglish":"Incorrect email or password, please try again."}';
                response.send(sendJson);
            }
        }
    });
}

module.exports.passRecover = (request, response) => {
    var user = request.body; // Esta variable contendra los datos de login del usuario en formato JSON (enviado por el cliente)

    var sql1 = "SELECT * FROM users WHERE email='" + user.email + "'";//si esta cosa está vacía, ese email no existe

    //esta es de mi login, namas la vo a adaptar
    // Ejecuntado query1
    pool.query(sql1, [user], (_error, _results, fields1) => {
        if (_error) // Si encuentra algun error, envia el error
        {
            response.send(_error);
        } else { // En caso contrario obtiene la lista de resultados en formato JSON
            if (_results.length > 0)
            {
                var sql2 = "SELECT * FROM users WHERE email='" + user.email + "' AND password = '" + user.password + "'";

                pool.query(sql2, [user], (__error, __results, fields2) => {
                    if (__error)
                    {
                        response.send(__error)
                    } else {
                        if (__results.length > 0)
                        {
                            var sendJson = '{"done":true, "errno":0, "message":"El usuario ingreso correctamente."}';
                            response.send(sendJson);
                        } else {
                            var sendJson = '{"done":false, "errno":19, "message":"La contraseña es incorrecta. Vuelve a intentarlo."}';
                            response.send(sendJson);
                        }
                    }
                });
            } else {
                var sendJson = '{"done":false, "errno":18, "message":"El usuario \''+ user.username + '\' no existe. Vuelve a intentarlo."}';
                response.send(sendJson);
            }
        }
    });
}
