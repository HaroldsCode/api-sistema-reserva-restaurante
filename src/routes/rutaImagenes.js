const Router = require('express').Router();
const cambiarImagen = require('../controllers/imagen/cambiarImagen');
const consultarImagen = require('../controllers/imagen/consultarImagen');
const subirImagen = require('../controllers/imagen/subirImagen');

Router.get('/:imagen', consultarImagen);
Router.post('/', subirImagen);
Router.put('/', cambiarImagen);

module.exports = Router;