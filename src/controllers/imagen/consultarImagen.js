const path = require('path');
const fs = require('fs-extra');

const consultarImagen = (req, res) => {
    const nombreImagen = req.params.imagen;
    const rutaImagen = path.resolve(__dirname, `../../../images/${nombreImagen}`);
    if(fs.existsSync(rutaImagen)){
        res.sendFile(rutaImagen)
    }else{
        res.json({
            status: 404,
            data: null,
            message: `No hay imagen ${rutaImagen.toString()}`
        })
    }
}

module.exports = consultarImagen;