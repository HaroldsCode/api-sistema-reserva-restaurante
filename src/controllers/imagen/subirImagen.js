const fs = require('fs-extra');
const dotenv = require('dotenv');

dotenv.config();

const subirImagen = async (req, res) => {
    try {
        const restaurantes = await fs.readJSON('./src/data/restaurantes.json');
        if(!req.files || Object.keys(req.files).length === 0){
            throw 'Se espera un archivo';
        }
        let archivo = req.files.imagen;
        let restaurante = restaurantes.find(item => item.Nit === parseInt(req.body.Nit))
        if(archivo.mimetype !== 'image/png' && archivo.mimetype !== 'image/jpeg' && archivo.mimetype !== 'image/gif'){
            throw 'El archivo debe ser una imagen';
        }
        if(restaurante === undefined){
            throw 'No se puede subir un archivo sin el nit de una empresa registrada';
        }
        const ruta = './images'
        const extencion = archivo.mimetype.split('/')[1];
        const imagen = `${req.body.Nit}.${extencion}`;
        await archivo.mv(`${ruta}/${imagen}`, (error) => {
            if(error)
                throw error;
        })
        if(restaurante){
            const restauranteEliminado = restaurantes.filter(item => item.Nit !== parseInt(req.body.Nit))
            restaurante['URL'] = `${process.env.URL_IMG}/${imagen}`;
            await fs.writeJSON('./src/data/restaurantes.json', [...restauranteEliminado, restaurante]);
            await res.json({
                data: null,
                message: "Se ha actualizado satisfactoriamente"
            });
        }
    } catch (error) {
        res.json({
            data: null,
            message: error
        });
    }
    
}

module.exports = subirImagen;