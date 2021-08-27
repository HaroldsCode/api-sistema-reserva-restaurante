const fs = require('fs-extra');

const editarRestaurante = async(req, res) => {
    const reservas = await fs.readJSON('./src/data/reservas.json');
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
        res.json({
            status: 400,
            data: null,
            message: `Se esperaba un objeto con la información completa`
        });
    }if(restaurante.Nit === '' || restaurante.Nombre === '' || restaurante.Descripcion === '' || restaurante.Direccion === '' || restaurante.Ciudad === '' || restaurante.Ciudad === ''){
        res.json({
            status: 400,
            data: null,
            message: `Se esperaba un objeto con la información completa`
        });
    }else if( await restaurantes.find(item => item.Nit == req.params.nit)){
        if(await reservas.find(item => item.Restaurante.Nit == req.params.nit)){
            const reservaEditar = await reservas.filter(item => item.Restaurante.Nit == req.params.nit)
            reservaEditar.forEach(async(element) => {
                element.Restaurante = restaurante;
                await fs.writeJSON('./src/data/reservas.json', [...reservas, element]);
            });
        }
        const restauranteEliminado = await restaurantes.filter(item => item.Nit != req.params.nit)
        await fs.writeJSON('./src/data/restaurantes.json', [...restauranteEliminado, restaurante]);
        await res.json({
            status: 201,
            data: null,
            message: "Se ha actualizado satisfactoriamente"
        });
    }else{
        res.json({
            status: 404,
            data: null,
            message: `No se ha encontrar un restaurante que contiene el nit ${req.params.nit}`
        });
    }

}

module.exports = editarRestaurante;