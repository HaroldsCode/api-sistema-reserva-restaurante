const fs = require('fs-extra');

const listarRestaurante = async (req, res) => {
    try {
        const restaurantes = await fs.readJSON('./src/data/restaurantes.json');
        await res.json({
            data: restaurantes,
            message: null
        });
    } catch (error) {
        res.json({
            data: null,
            message: error.code
        });
    }
}
module.exports = listarRestaurante;