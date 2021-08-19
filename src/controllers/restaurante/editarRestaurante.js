const fs = require('fs-extra');

const editarRestaurante = async(req, res) => {
    try {
        const restaurantes = await fs.readJSON('./src/data/restaurantes.json');
        const restaurante = {
            Nit: req.body.Nit,
            Nombre: req.body.Nombre,
            Descripcion: req.body.Descripcion,
            Direccion: req.body.Direccion,
            Ciudad: req.body.Ciudad.toUpperCase(),
            URL: req.body.URL,
            Mesas: 15
        }
        if(restaurante.Nit === undefined || restaurante.Nombre === undefined || restaurante.Descripcion === undefined || restaurante.Direccion === undefined || restaurante.Ciudad === undefined || restaurante.Ciudad === undefined){
            throw `Se esperaba un objeto con la información completa`;
        }
        if(restaurantes.find(item => item.Nit == req.params.nit)){
            const restauranteEliminado = restaurantes.filter(item => item.Nit != req.params.nit)
            await fs.writeJSON('./src/data/restaurantes.json', [...restauranteEliminado, restaurante]);
            await res.json({
                data: null,
                message: "Se ha actualizado satisfactoriamente"
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

module.exports = editarRestaurante;