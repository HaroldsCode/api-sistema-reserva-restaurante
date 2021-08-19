const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const dotenv =  require('dotenv');

const rutaRestaurante = require('./src/routes/rutaRestaurante');
const rutaReserva = require('./src/routes/rutaReserva');
const rutaImagenes = require('./src/routes/rutaImagenes');

const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload())

app.use('/v1/api/restaurantes/', rutaRestaurante);
app.use('/v1/api/reservas/', rutaReserva);
app.use('/v1/api/images/', rutaImagenes);

app.listen(process.env.PORT, () => {
    console.log('funcionando', process.env.PORT);
});