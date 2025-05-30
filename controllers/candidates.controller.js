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
 * [Get candidates datatable]
 * @return response/error
 */ 
 module.exports.getCandidatesDatatable = (request, response) => {
    var sql = "SELECT * FROM candidate WHERE archived = 1"; 

    pool.query(sql, (error, results, fields) => {
        if (error) { response.send(error); }
        else { 
            var _res = [];
            var _results = {};
            var n = results.length;
            for(var i=0; i<n; i++){
                var theResults = {}
                theResults.name = results[i].name;
                theResults.age = results[i].id;
                theResults.curp = results[i].curp;
                theResults.career = results[i].career;
                var elmail = '"'+results[i].email+'"';
                theResults.pdf =  "<button class='btn btn-blue text-center' " + "onclick='getReport("+ elmail +")'><i class='far fa-file-pdf'></i></button>";
                theResults.info = "<button class='btn btn-blue text-center' " + "onclick='moreInfo("+ results[i].id.toString() +")'><i class='fas fa-file-alt'></i></button>";
                // theResults.clear = "<button"+"onclick='deleteApplicant("+results[i].id.toString()+")"+"class='btn btn-danger text-center'data-toggle='modal' data-target='#exampleModalCenter'><i class='fas fa-trash-alt'></i></button>";
                theResults.clear = "<button class='btn btn-blue text-center' " + "onclick='deleteCand("+ results[i].id.toString() +")'><i class='fas fa-trash-alt'></i></button>";
                _res.push(theResults);
            }
            _results.draw = 1;
            _results.recordsTotal = n;
            _results.recordsFiltered = n;
            _results.buttons = ['copy', 'csv', 'excel', 'pdf', 'print'];
            _results.data = _res;
            response.json(_results); 
        }
    });
}

/**
 * [Get candidates datatable]
 * @return response/error
 */ 
 module.exports.getCandidatesInQueueDatatable = (request, response) => {
    var sql = "SELECT * FROM candidate WHERE archived = 0"; 

    pool.query(sql, (error, results, fields) => {
        if (error) { response.send(error); }
        else { 
            var _res = [];
            var _results = {};
            var n = results.length;
            for(var i=0; i<n; i++){
                var theResults = {}
                theResults.name = results[i].name;
                theResults.age = results[i].id;
                theResults.curp = results[i].curp;
                theResults.career = results[i].career;
                theResults.email = results[i].email;
                theResults.phone = results[i].phone;
                theResults.info = "<button "+"onclick='moreInfo("+results[i].id.toString()+")"+" class='btn btn-blue text-center'><i class='fas fa-file-alt'></i></button>";
                _res.push(theResults);
            }
            _results.draw = 1;
            _results.recordsTotal = n;
            _results.recordsFiltered = n;
            _results.buttons = ['copy', 'csv', 'excel', 'pdf', 'print'];
            _results.data = _res;
            response.json(_results); 
        }
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
 * [Get score by email function]
 * @param  email
 * @return response/error
 */ 
 module.exports.getScore = (request, response) => {

    var sql = "SELECT * FROM scores WHERE email = ?";

    pool.query(sql, [request.params.email], (error, results, fields) => {
        if (error) { response.send(error); }
        else { response.json(results); }
    });
}

/**
 * [Archivate application]
 * @param  id
 * @return response/error
 */ 
 module.exports.deleteCandidate = (request, response) => {

    var sql = "UPDATE candidates SET archived = 2 WHERE id = ?";

    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) { response.send(error); }
        else { response.json('{"done":true, "errno":0, "message":"Candidate removed successfully."}'); }
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
 * [Insert user function]
* @param  id
* @param  name 
* @param  lastname
* @param  rol_id
* @param  email
* @param  password
* @return response/error
 */
/*module.exports.insertScores = (request, response) => {
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
}*/
module.exports.insertScore = (request, response) => {
    var scores = {};
    scores.email = request.body.results.email;
    scores.score = JSON.stringify(request.body);

    var sql = "INSERT INTO scores SET ?";

    pool.query(sql, [scores], (_error, _results, _fields) => {
        if (_error){
            var sendJson = '{"done":true, "errno":0, "message":"Datos enviados correctamente."}';
            response.send(JSON.parse(sendJson));
        }
        else {
            var sendJson = '{"done":true, "errno":0, "message":"Datos enviados correctamente."}';
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
        if (_error){ response.send(__error); } //Server error
        else {
            if (_results.length > 0){

                var sql2 = "SELECT * FROM candidate WHERE email='" + candidate.email + "' AND password = '" + candidate.password + "'";

                pool.query(sql2, [candidate], (__error, __results, __fields) => {
                    if (__error){ response.send(__error) } //Server error
                    else {
                        if (__results.length > 0){
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
                var sendJson = '{"status":false, "errno":19, "messageInSpanish":"Usuario o contraseña incorecta, vuelve a intentarlo.", "messageInEnglish":"Incorrect email or password, please try again."}';
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
    pool.query(sql1, [candidate], (_error, _results, fields1) => {
        if (_error) // Si encuentra algun error, envia el error
        {
            response.send(_error);
        } else { // En caso contrario obtiene la lista de resultados en formato JSON
            if (_results.length > 0)
            {
                var sql2 = "SELECT * FROM candidate WHERE email='" + candidate.email + "' AND password = '" + candidate.password + "'";

                pool.query(sql2, [candidate], (__error, __results, fields2) => {
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
                var sendJson = '{"done":false, "errno":18, "message":"El usuario \''+ candidate.candidatename + '\' no existe. Vuelve a intentarlo."}';
                response.send(sendJson);
            }
        }
    });
}
