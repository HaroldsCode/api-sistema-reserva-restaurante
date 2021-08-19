const Router = require('express').Router();
const crearReserva = require('../controllers/reserva/crearReserva');
const listaReserva = require('../controllers/reserva/listaReserva');

Router.get('/', listaReserva);
Router.post('/', crearReserva);

module.exports = Router;