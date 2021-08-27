const fs = require('fs-extra');

const consultarCiudadRestaurante = async (req, res) => {

    const restaurantes = await fs.readJSON('./src/data/restaurantes.json');
    const restaurante = {
        Ciudad: req.params.ciudad.toUpperCase()
    }
    const restaurantesConsultados = restaurantes.filter(item => item.Ciudad === restaurante.Ciudad) || [];
    
    if(restaurantesConsultados.length === 0){
         res.json({
            status: 404,
            data: null,
            message: `No se ha encontrado ningún restaurante en ${restaurante.Ciudad}`
        });
    }else{
        res.json({
            status: 200,
            data: restaurantesConsultados,
            message: null
        });
    }
    
}
module.exports = consultarCiudadRestaurante;