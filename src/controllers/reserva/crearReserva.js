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
    const reservas = await fs.readJSON('./src/data/reservas.json');
    const reserva = {
        id: new Date().getTime(),
        Fecha: req.body.Fecha,
        Restaurante: req.body.Restaurante
    }

    if(reserva.Restaurante.Nit === undefined || reserva.Restaurante.Nombre === undefined || reserva.Restaurante.Descripcion === undefined || reserva.Restaurante.Direccion === undefined || reserva.Restaurante.Ciudad === undefined || reserva.Fecha === undefined){
        res.json({
            status: 400,
            data: null,
            message: `Se esperaba un objeto con la información completa`
        });
    }else if(reserva.Restaurante.Nit === '' || reserva.Restaurante.Nombre === '' || reserva.Restaurante.Descripcion === '' || reserva.Restaurante.Direccion === '' || reserva.Restaurante.Ciudad === '' || reserva.Fecha === ''){
        res.json({
            status: 400,
            data: null,
            message: `Se esperaba un objeto con la información completa`
        });
    }else if(formatoFecha(reserva.Fecha) < date){
        res.json({
            status: 400,
            data: null,
            message: `Se espera como mínimo la fecha actual`
        });
    }else if(numeroReservasDia(reservas, formatoFecha(reserva.Fecha)) >= 20 ){
        res.json({
            status: 401,
            data: null,
            message: `Se ha excedido el número de reservas para el día de hoy`
        });
    }else if(numeroReservasRestauranteDia(reservas, formatoFecha(reserva.Fecha), reserva.Restaurante.Nit) >= 15){
        res.json({
            status: 401,
            data: null,
            message: `Se ha excedido el número de reservas en el restaurante ${reserva.Restaurante.Nombre}`
        });
    }else{
        await fs.writeJSON('./src/data/reservas.json', [...reservas, reserva]);
        await res.json({
            status: 201,
            data: null,
            message: "Se ha guardado satisfactoriamente"
        });
    }

}

module.exports = crearReserva;