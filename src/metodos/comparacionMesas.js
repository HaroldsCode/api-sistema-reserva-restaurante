const metodosReserva = {};

metodosReserva.numeroMesas = (reservas, reserva) => {
    let mesasOcupada = 0, mesasDisponibles = reserva.Restaurante.Mesas;
    reservas.forEach(item => {
        if(item.Fecha === reserva.Fecha && item.Restaurante.Nit === reserva.Restaurante.Nit){
            mesasOcupada = mesasOcupada + item.numeroMesas
            mesasDisponibles = mesasDisponibles - item.numeroMesas
        }
    })
    if((mesasOcupada + reserva.numeroMesas) <= 15){
        return {
            mesasOcupada,
            mesasDisponibles
        }
    }else{
        return {
            mesasOcupada: 15,
            mesasDisponibles: mesasDisponibles
        }
    }
}

module.exports = metodosReserva;