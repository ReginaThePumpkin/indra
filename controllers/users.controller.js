//var mysql = require('mysql'); // Declarando dependencia del modulo mysql
var config = require('../helpers/config'); // Variable que contiene la ruta del config.js
//var conexion = mysql.createConnection(config); // Crear la conexion con los datos almacenados en config
var pool = config.pool;

// Creando y exportando el metodo para visualizar la listas de los usuarios en la base de datos
module.exports.usersList = (request, response) => {
    var sql = "SELECT * FROM users"; // Declarando query a realizar (mostrar toda la tabla de user)

    // Ejecuntado dicha query
    pool.query(sql, (error, results, fields) => {
        if (error) // Si encuentra algun error, envia el error
            response.send(error);
        else // En caso contrario obtiene la lista de resultados en formato JSON
            response.json(results);
    });
}

// Creando y exportando el metodo para obtener un usuario mediante su ID
module.exports.getUser = (request, response) => {
    var sql = "SELECT * FROM users WHERE id = ?"; // Declarando query a realizar (mostrar un usuario mediante su ID)

    // Ejecuntado dicha query
    pool.query(sql, [request.params.idUser], (error, results, fields) => {
        if (error) // Si encuentra algun error, envia el error
            response.send(error);
        else // En caso contrario obtiene la lista de resultados en formato JSON
            response.json(results);
    });
}

// Creando y exportando el metodo para insertar un usuario
module.exports.insertUser = (request, response) => {
    var user = request.body; // Esta variable contendra los datos del usuario en formato JSON (enviado por el cliente)

    var sql = "INSERT INTO users SET ?"; // Declarando query a realizar (insertar un usuario)

    // Ejecuntado dicha query
    pool.query(sql, [user], (error, results, fields) => {
        if (error) // Si encuentra algun error, envia el error
        {
            var sendJson = '{"done":false, "errno":' + error.errno + ', "message":"' + error.sqlMessage + '"}';
            response.send(sendJson);
        } else {// En caso contrario obtiene la lista de resultados en formato JSON
            var sendJson = '{"done":true, "errno":0, "message":"Usuario registrado correctamente."}';
            response.send(sendJson);
        }
    });
}

// Creando y exportando el metodo para verificar si el usuario se logueo correctamente
module.exports.loginUser = (request, response) => {
    var user = request.body; // Esta variable contendra los datos de login del usuario en formato JSON (enviado por el cliente)

    var sql1 = "SELECT * FROM users WHERE email='" + user.email + "'";

    // Ejecuntado query1
    pool.query(sql1, [user], (error1, results1, fields1) => {
        if (error1) // Si encuentra algun error, envia el error
        {
            response.send(error1);
        } else { // En caso contrario obtiene la lista de resultados en formato JSON
            if (results1.length > 0)
            {
                var sql2 = "SELECT * FROM users WHERE email='" + user.email + "' AND password = '" + user.password + "'";

                pool.query(sql2, [user], (error2, results2, fields2) => {
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
                var sendJson = '{"done":false, "errno":18, "message":"El usuario \''+ user.username + '\' no existe. Vuelve a intentarlo."}';
                response.send(sendJson);
            }
        }
    });
}
