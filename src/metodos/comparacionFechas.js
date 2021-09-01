const formatoFecha = (fecha = '')=>{
    if(fecha === ''){
        const date = new Date();
        date.setHours(0,0,0,0)
        return date.getTime()
    }else{
        const [dia, mes, anho] = fecha.split('/')
        const date = new Date(anho, mes-1, dia);
        date.setHours(0,0,0,0)
        return date.getTime()
    }
}

const metodosFecha = {}

metodosFecha.verificarFecha = (fecha) => {
    const actual = formatoFecha();
    const prop = formatoFecha(fecha);
    if(prop < actual){
        return true;
    }return false;
}

metodosFecha.reservasPorFecha = (objetosReserva, fechaReserva) => {
    let temp = 0;
    objetosReserva.forEach(item => {
        if(item.Fecha === fechaReserva)
            temp = temp + item.numeroMesas
    })
    return temp;
}

module.exports = metodosFecha;