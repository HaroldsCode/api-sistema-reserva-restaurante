const fs = require('fs-extra');

const consultarLetraRestaurante = async (req, res) => {
    try {
        const restaurantes = await fs.readJSON('./src/data/restaurantes.json');
        const restaurante = {
            Nombre: req.params.letra.toUpperCase()
        }
        const restaurantesConsultados = restaurantes.filter(item => item.Nombre.toUpperCase().charAt(0) === restaurante.Nombre) || [];
        if(restaurantesConsultados.length === 0){
            throw `No se ha encontrado ningún restaurante en ${restaurante.Nombre}`
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

module.exports = consultarLetraRestaurante;