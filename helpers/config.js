var mysql = require('mysql');
// Configuracion de la base de datos en MySQL
/*var pool = mysql.createPool({
    connectionLimit: 100,
    host: '162.241.62.191',
    port: '3306',
    user: 'denisser_deni',
    password: 'cacahuate',
    database: 'denisser_indra'
})*/
var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'indra.crnfsnzlnaf7.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'root',
    password: 'tacosdepapaya',
    database: 'indra'
})

module.exports.pool = pool; // Objeto que quiero exportar o hacer publico fuera de este archivo