const dotenv = require('dotenv');

dotenv.config();

const cambiarImagen = async (req, res) => {

    if(!req.files || Object.keys(req.files).length === 0){
        res.json({
            status: 400,
            data: null,
            message: 'Se espera un archivo'
        });
    }else{
        let archivo = req.files.imagen;
        if(archivo.mimetype !== 'image/png' && archivo.mimetype !== 'image/jpeg' && archivo.mimetype !== 'image/gif'){
            res.json({
                status: 400,
                data: null,
                message: 'El archivo debe ser una imagen'
            });
        }else{
            const ruta = './images'
            const extencion = archivo.mimetype.split('/')[1];
            const imagen = `${req.body.Nit}.${extencion}`;
            await archivo.mv(`${ruta}/${imagen}`, (error) => {
                if(error){
                    res.json({
                        status: 500,
                        data: null,
                        message: error
                    });
                }else{
                    res.json({
                        status: 201,
                        data: {url: `${process.env.URL_IMG}/${imagen}`},
                        message: "Se ha actualizado satisfactoriamente"
                    });
                }
            })
        }
    } 
}

module.exports = cambiarImagen;