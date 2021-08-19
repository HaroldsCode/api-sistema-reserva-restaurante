const fs = require('fs-extra');

const consultarCiudadRestaurante = async (req, res) => {
    try {
        const restaurantes = await fs.readJSON('./src/data/restaurantes.json');
        const restaurante = {
            Ciudad: req.params.ciudad.toUpperCase()
        }
        const restaurantesConsultados = restaurantes.filter(item => item.Ciudad === restaurante.Ciudad) || [];
        if(restaurantesConsultados.length === 0){
            throw `No se ha encontrado ningún restaurante en ${restaurante.Ciudad}`
        }
        await res.json({
            data: restaurantesConsultados,
            message: null
        });
    } catch (error) {
        res.json({
            data: null,
            message: error
        });
    }
}

module.exports = consultarCiudadRestaurante;