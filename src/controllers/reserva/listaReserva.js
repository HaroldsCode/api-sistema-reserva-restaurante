const fs = require('fs-extra');

const listaReserva = async (req, res) => {
    const reservas = await fs.readJSON('./src/data/reservas.json');
    await res.json({
        status: 200,
        data: reservas,
        message: null
    });
}

module.exports = listaReserva;