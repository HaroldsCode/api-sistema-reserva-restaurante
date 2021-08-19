const fs = require('fs-extra');

const eliminarRestaurante = async (req, res) => {
    try {
        const restaurantes = await fs.readJSON('./src/data/restaurantes.json');
        if(restaurantes.find(item => item.Nit == req.params.nit)){
            const restauranteEliminado = restaurantes.filter(item => item.Nit != req.params.nit)
            await fs.writeJSON('./src/data/restaurantes.json', [...restauranteEliminado]);
            await res.json({
                data: null,
                message: "Se ha eliminado satisfactoriamente"
            });
        }
        throw `No se ha encontrar un restaurante que contiene el nit ${req.params.nit}`;
    } catch (error) {
        res.json({
            data: null,
            message: error
        });
    }
}

module.exports = eliminarRestaurante;