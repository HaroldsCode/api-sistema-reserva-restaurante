const fs = require('fs-extra');

const eliminarRestaurante = async (req, res) => {

    const restaurantes = await fs.readJSON('./src/data/restaurantes.json');
    const reservas = await fs.readJSON('./src/data/reservas.json');
    if(restaurantes.find(item => item.Nit == req.params.nit)){
        const restauranteEliminado = restaurantes.filter(item => item.Nit != req.params.nit)
        if(reservas.find(item => item.Restaurante.Nit == req.params.nit)){
            const reservaEliminada = reservas.filter(item => item.Restaurante.Nit != req.params.nit)
            await fs.writeJSON('./src/data/reservas.json', [...reservaEliminada]);
        }
        await fs.writeJSON('./src/data/restaurantes.json', [...restauranteEliminado]);
        await res.json({
            status: 200,
            data: null,
            message: "Se ha eliminado satisfactoriamente"
        });
    }else{
        res.json({
            status: 404,
            data: null,
            message: `No se ha encontrar un restaurante que contiene el nit ${req.params.nit}`
        });
    }

}

module.exports = eliminarRestaurante;