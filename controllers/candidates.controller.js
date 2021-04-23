//var mysql = require('mysql'); // Declarando dependencia del modulo mysql
var config = require('../helpers/config'); // Variable que contiene la ruta del config.js
var nodemailer = require('nodemailer');
var pool = config.pool;

/**
 * [Get all candidates function]
 * @return response/error
 */ 
module.exports.getCandidates = (request, response) => {
    var sql = "SELECT * FROM candidate"; 

    pool.query(sql, (error, results, fields) => {
        if (error) { response.send(error); }
        else { response.json(results); }
    });
}

/**
 * [Get candidate by id function]
 * @param  id
 * @return response/error
 */ 
module.exports.getCandidate = (request, response) => {

    var sql = "SELECT * FROM candidate WHERE candidate.id = ?";

    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) { response.send(error); }
        else { response.json(results); }
    });
}

/**
 * [Insert candidate function]
* @param  id
* @param  name 
* @param  lastname
* @param  rol_id
* @param  email
* @param  password
* @return response/error
 */
module.exports.insertCandidate = (request, response) => {
    var candidate = request.body;

    var sql = "INSERT INTO candidate SET ?";

    pool.query(sql, [candidate], (_error, _results, _fields) => {
        if (_error){
            var sendJson = '{"done":false, "errno":' + _error.errno + ', "message":"' + _error.sqlMessage + '"}';
            response.send(JSON.parse(sendJson));
        }
        else {
            var sendJson = '{"done":true, "errno":0, "message":"Candidate registered successfuly."}';
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
module.exports.loginCandidate = (request, response) => {
    var candidate = request.body; 

    var sql1 = "SELECT * FROM candidate WHERE email='" + candidate.email + "'";

    pool.query(sql1, [candidate], (_error, _results, _fields) => {
        if (error1){ response.send(_error1); } //Server error
        else {
            if (results1.length > 0){

                var sql2 = "SELECT * FROM candidate WHERE email='" + candidate.email + "' AND password = '" + candidate.password + "'";

                pool.query(sql2, [candidate], (__error, __results, __fields) => {
                    if (__error){ response.send(__error) } //Server error
                    else {
                        if (results2.length > 0){
                            //Success
                            var sendJson = '{"status":true, "errno":0, "messageInSpanish":"Usuario encontrado.", "messageInEnglish":"Candidate found.", "name":"'+__results[0].name.split(' ')[0]+'"}';
                            response.send(JSON.parse(sendJson));
                        } else {
                            //Failure
                            var sendJson = '{"status":false, "errno":19, "messageInSpanish":"Usuario o contraseña incorecta, vuelve a intentarlo.", "messageInEnglish":"Incorrect email or password, please try again."}';
                            response.send(JSON.parse(sendJson));
                        }
                    }
                });
            } else {
                var sendJson = '{"status":false, "errno":18, "message":"The candidate \''+ candidate.candidatename + '\' does not exist. Please try again"}';
                response.send(sendJson);
            }
        }
    });
}

module.exports.passRecover = (request, response) => {
    var candidate = request.body; // Esta variable contendra los datos de login del usuario en formato JSON (enviado por el cliente)

    var sql1 = "SELECT * FROM candidate WHERE email='" + candidate.email + "'";//si esta cosa está vacía, ese email no existe

    //esta es de mi login, namas la vo a adaptar
    // Ejecuntado query1
    pool.query(sql1, [candidate], (error1, results1, fields1) => {
        if (error1) // Si encuentra algun error, envia el error
        {
            response.send(error1);
        } else { // En caso contrario obtiene la lista de resultados en formato JSON
            if (results1.length > 0)
            {
                var sql2 = "SELECT * FROM candidate WHERE email='" + candidate.email + "' AND password = '" + candidate.password + "'";

                pool.query(sql2, [candidate], (error2, results2, fields2) => {
                    if (error2)
                    {
                        response.send(error2)
                    } else {
                        if (results2.length > 0)
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
                var sendJson = '{"done":false, "errno":18, "message":"El usuario \''+ candidate.candidatename + '\' no existe. Vuelve a intentarlo."}';
                response.send(sendJson);
            }
        }
    });
}
