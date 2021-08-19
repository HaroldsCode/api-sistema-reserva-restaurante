const Router = require('express').Router();
const consultarImagen = require('../controllers/imagen/consultarImagen');
const subirImagen = require('../controllers/imagen/subirImagen');

Router.get('/:imagen', consultarImagen);
Router.post('/', subirImagen);

module.exports = Router;