const fs = require('fs-extra');
const uuid = require('uuid');
const { reservasPorFecha, verificarFecha} = require('../../metodos/comparacionFechas');
const metodosReserva = require('../../metodos/comparacionMesas');

const crearReserva = async (req, res) => {
    const reservas = await fs.readJSON('./src/data/reservas.json');
    const reserva = {
        id: uuid.v4(),
        Fecha: req.body.Fecha,
        numeroMesas: parseInt(req.body.numeroMesas),
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
    }else{
        const { mesasOcupada, mesasDisponibles } = metodosReserva.numeroMesas(reservas, reserva);
        if(verificarFecha(reserva.Fecha)){
            res.json({
                status: 400,
                data: null,
                message: `Se espera como mínimo la fecha actual`
            });
        }else if(reservasPorFecha(reservas, reserva.Fecha) >= 20 ){
            res.json({
                status: 401,
                data: null,
                message: `Se ha excedido el número de reservas para el día de hoy`
            });
        }else if(mesasOcupada >= 15){
            if(mesasDisponibles !== 0){
                res.json({
                    status: 401,
                    data: null,
                    message: `Las mesas restantes del restaurante son ${mesasDisponibles}`
                });
            }else{
                res.json({
                    status: 401,
                    data: null,
                    message: `No hay mesas disponible en el restauarante`
                });
            }
        }else{
            await fs.writeJSON('./src/data/reservas.json', [...reservas, reserva]);
            await res.json({
                status: 201,
                data: null,
                message: `Reserva realizada satisfactoriamente`
            });
        }
    }

}

module.exports = crearReserva;