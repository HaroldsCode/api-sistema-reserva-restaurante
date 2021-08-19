const fs = require('fs-extra');

const crearRestaurante = async (req, res) => {
    const restaurantes = await fs.readJSON('./src/data/restaurantes.json');
    try {
        const restaurante = {
            Nit: req.body.Nit,
            Nombre: req.body.Nombre,
            Descripcion: req.body.Descripcion,
            Direccion: req.body.Direccion,
            Ciudad: req.body.Ciudad,
            URL: req.body.URL,
            Mesas: 15
        }
        if(restaurante.Nit === undefined || restaurante.Nombre === undefined || restaurante.Descripcion === undefined || restaurante.Direccion === undefined || restaurante.Ciudad === undefined || restaurante.Ciudad === undefined){
            throw `Se esperaba un objeto con la información completa`;
        }
        if(restaurantes.find(item => item.Nit == restaurante.Nit)){
            throw `Se ha encontrar un restaurante que contiene ese nit (${restaurante.Nit})`;
        }
        await fs.writeJSON('./src/data/restaurantes.json', [...restaurantes, restaurante]);
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

module.exports = crearRestaurante;