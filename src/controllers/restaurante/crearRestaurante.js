const fs = require('fs-extra');

const crearRestaurante = async (req, res) => {
    const restaurantes = await fs.readJSON('./src/data/restaurantes.json');
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
        res.json({
            status: 400,
            data: null,
            message: `Se esperaba un objeto con la información completa`
        });
    }else if(restaurante.Nit === '' || restaurante.Nombre === '' || restaurante.Descripcion === '' || restaurante.Direccion === '' || restaurante.Ciudad === '' || restaurante.Ciudad === ''){
        res.json({
            status: 400,
            data: null,
            message: `Se esperaba un objeto con la información completa`
        });
    }else if(restaurantes.find(item => item.Nit == restaurante.Nit)){
        res.json({
            status: 404,
            data: null,
            message: `Se ha encontrar un restaurante que contiene ese nit (${restaurante.Nit})`
        });
    }else{
        await fs.writeJSON('./src/data/restaurantes.json', [...restaurantes, restaurante]);
        await res.json({
            status: 201,
            data: null,
            message: "Se ha guardado satisfactoriamente"
        });
    }

}

module.exports = crearRestaurante;