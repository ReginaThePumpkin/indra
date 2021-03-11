//var mysql = require('mysql'); // Declarando dependencia del modulo mysql
var config = require('../helpers/config'); // Variable que contiene la ruta del config.js
//var conexion = mysql.createConnection(config); // Crear la conexion con los datos almacenados en config
var pool = config.pool;

/**
 * [Function that gets all luminosity lectures for a plant]
 * @param  idPlant  
 * @return response/error
 */ 
module.exports.getPlantLuminosity = (request, response) => {
    var sql = "SELECT luminosity, registrationDate, registrationTime FROM sensorData WHERE qrPlant = ?"; 

    pool.query(sql, [request.params.idPlant], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all humidity lectures for a plant]
 * @param  idPlant 
 * @return response/error
 */ 
module.exports.getPlantHumidity = (request, response) => {
    var sql = "SELECT humidity, registrationDate, registrationTime FROM sensorData WHERE qrPlant = ?"; 

    pool.query(sql, [request.params.idPlant], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all earth humidity lectures for a plant]
 * @param  idPlant 
 * @return response/error
 */ 
module.exports.getPlantEarthHumidity = (request, response) => {
    var sql = "SELECT earthHumidity, registrationDate, registrationTime FROM sensorData WHERE qrPlant = ?"; 

    pool.query(sql, [request.params.idPlant], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all temperature lectures for a plant]
 * @param  idPlant 
 * @return response/error
 */ 
module.exports.getPlantTemperature = (request, response) => {
    var sql = "SELECT temperature, registrationDate, registrationTime FROM sensorData WHERE qrPlant = ?"; 

    pool.query(sql, [request.params.idPlant], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}

/////////////////////////////////////////////////////////////////////7
/**
 * [Function that gets all luminosity lectures for a plant]
 * @param  name 
 * @return response/error
 */ 
module.exports.getPlantLuminosityByName = (request, response) => {
    var sql = "SELECT sensordata.luminosity, sensordata.registrationDate, sensordata.registrationTime FROM plants LEFT JOIN sensordata ON plants.qrPlant = sensordata.qrPlant WHERE plants.nicknamePlant = ?"; 

    pool.query(sql, [request.params.name], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all humidity lectures for a plant]
 * @param  name
 * @return response/error
 */ 
module.exports.getPlantHumidityByName = (request, response) => {
    var sql = "SELECT sensordata.humidity, sensordata.registrationDate, sensordata.registrationTime FROM plants LEFT JOIN sensordata ON plants.qrPlant = sensordata.qrPlant WHERE plants.nicknamePlant = ?"; 

    pool.query(sql, [request.params.name], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all earth humidity lectures for a plant]
 * @param  name 
 * @return response/error
 */ 
module.exports.getPlantEarthHumidityByName = (request, response) => {
    var sql = "SELECT sensordata.earthHumidity, sensordata.registrationDate, sensordata.registrationTime FROM plants LEFT JOIN sensordata ON plants.qrPlant = sensordata.qrPlant WHERE plants.nicknamePlant = ?"; 

    pool.query(sql, [request.params.name], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all temperature lectures for a plant]
 * @param  name
 * @return response/error
 */ 
module.exports.getPlantTemperatureByName = (request, response) => {
    var sql = "SELECT sensordata.temperature, sensordata.registrationDate, sensordata.registrationTime FROM plants LEFT JOIN sensordata ON plants.qrPlant = sensordata.qrPlant WHERE plants.nicknamePlant = ?"; 

    pool.query(sql, [request.params.name], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all info for a plant]
 * @param  name
 * @return response/error
 */ 
module.exports.getPlantInfoByName = (request, response) => {
    var sql = "SELECT * FROM plants  WHERE nicknamePlant = ?";  

    pool.query(sql, [request.params.name], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all info for a plant]
 * @param  name
 * @return response/error
 */ 
module.exports.getPlantInfoByName = (request, response) => {
    var sql = "SELECT * FROM plants  WHERE nicknamePlant = ?";  

    pool.query(sql, [request.params.name], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all info for a plant]
 * @param  name
 * @return response/error
 */ 
module.exports.getPlantLastStatus = (request, response) => {
    var sql = "SELECT * FROM sensordata WHERE qrPlant = ? ORDER BY registrationDate DESC, registrationTime DESC LIMIT 1 ";  

    pool.query(sql, [request.params.qrPlant], (error, results, fields) => {
        if (error) response.send(error);
        else response.json(results);
    });
}

//SELECT * FROM sensordata WHERE qrPlant = 'JSHD23S2' ORDER BY registrationDate DESC, registrationTime DESC LIMIT 1 