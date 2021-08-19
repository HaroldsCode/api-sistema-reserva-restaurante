const fs = require('fs-extra');

const numeroReservasDia = (objetosReserva, fechaReserva) => {
    const temp = objetosReserva.filter(item => formatoFecha(item.Fecha) === fechaReserva)
    return temp.length;
}
const numeroReservasRestauranteDia = (objetosReserva, fechaReserva, restaurante) => {
    const temp = objetosReserva.filter(item => {
        if((formatoFecha(item.Fecha) === fechaReserva && item.Restaurante.Nit === restaurante))
            return item;
    })
    return temp.length;
}
const formatoFecha = (string) => {
    const [dia, mes, anho] = string.split('/');
    let date = new Date();
    date.setDate(parseInt(dia), parseInt(mes), parseInt(anho));
    date.setHours(0,0,0,0);
    return date.getTime();
}
const crearReserva = async (req, res) => {
    let date = new Date();
    date.setHours(0,0,0,0);
    try {
        const reservas = await fs.readJSON('./src/data/reservas.json');
        const reserva = {
            id: 0,
            Fecha: req.body.Fecha,
            Restaurante: req.body.Restaurante
        }
        if(reserva.Restaurante.Nit === undefined || reserva.Restaurante.Nombre === undefined || reserva.Restaurante.Descripción === undefined || reserva.Restaurante.Dirección === undefined || reserva.Restaurante.Ciudad === undefined || reserva.Restaurante.Ciudad === undefined || reserva.Fecha === undefined){
            throw `Se esperaba un objeto con la información completa`;
        }
        if(formatoFecha(reserva.Fecha) < date){
            throw `Se espera como mínimo la fecha actual`;
        }
        if(numeroReservasDia(reservas, formatoFecha(reserva.Fecha)) >= 20 ){
            throw `Se ha excedido el número de reservas`;
        }
        if(numeroReservasRestauranteDia(reservas, formatoFecha(reserva.Fecha), reserva.Restaurante.Nit) >= 15){
            throw `Se ha excedido el número de reservas en el restaurante ${reserva.Restaurante.Nombre}`;
        }
        reserva.id = reservas.length+1;
        await fs.writeJSON('./src/data/reservas.json', [...reservas, reserva]);
        await res.json({
            data: null,
            message: "Se ha guardado satisfactoriamente"
        });
    } catch (error) {
        res.json({
            data: null,
            message: error
        });
    }
}

module.exports = crearReserva;