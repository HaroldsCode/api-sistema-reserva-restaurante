const Route = require('express').Router();
const crearRestaurante = require('../controllers/restaurante/crearRestaurante');
const editarRestaurante = require('../controllers/restaurante/editarRestaurante');
const eliminarRestaurante = require('../controllers/restaurante/eliminarRestaurante');
const listarRestaurante = require('../controllers/restaurante/listarRestaurante');
const consultarCiudadRestaurante = require('../controllers/restaurante/consultarCiudadRestaurante');
const consultarLetraRestaurante = require('../controllers/restaurante/consultarLetraRestaurante');


Route.get('/', listarRestaurante);
Route.get('/ciudad/:ciudad', consultarCiudadRestaurante);
Route.get('/nombre/:letra', consultarLetraRestaurante);
Route.post('/', crearRestaurante);
Route.put('/:nit', editarRestaurante);
Route.delete('/:nit', eliminarRestaurante);

module.exports = Route;