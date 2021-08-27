const fs = require('fs-extra');

const consultarLetraRestaurante = async (req, res) => {
    const restaurantes = await fs.readJSON('./src/data/restaurantes.json');
    const restaurante = {
        Nombre: req.params.letra.toUpperCase().charAt(0)
    }
    const restaurantesConsultados = restaurantes.filter(item => item.Nombre.toUpperCase().charAt(0) === restaurante.Nombre) || [];
    if(restaurantesConsultados.length === 0){
        res.json({
            status: 404,
            data: null,
            message: `No se ha encontrado ningún restaurante con inicial ${restaurante.Nombre}`
        });
    }else{
        res.json({
            status: 200,
            data: restaurantesConsultados,
            message: null
        });
    }
}

module.exports = consultarLetraRestaurante;