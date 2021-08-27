const fs = require('fs-extra');

const listarRestaurante = async (req, res) => {
    
    const restaurantes = await fs.readJSON('./src/data/restaurantes.json');
    await res.json({
        status: 200,
        data: restaurantes,
        message: null
    });
    
}
module.exports = listarRestaurante;