const fs = require('fs-extra');

const listaReserva = async (req, res) => {
    try {
        const reservas = await fs.readJSON('./src/data/reservas.json');
        await res.json({
            data: reservas,
            message: null
        });
    } catch (error) {
        res.json({
            data: null,
            message: error.code
        });
    }
}

module.exports = listaReserva;