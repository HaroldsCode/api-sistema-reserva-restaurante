const path = require('path');
const fs = require('fs-extra');

const consultarImagen = (req, res) => {
    const nombreImagen = req.params.imagen;
    const rutaImagen = path.resolve(__dirname, `../../../images/${nombreImagen}`);
    if(fs.existsSync(rutaImagen)){
        res.status(200).sendfile(rutaImagen)
    }else{
        res.status(404).send('No hay imagen', rutaImagen.toString());
    }
}

module.exports = consultarImagen;