const express = require('express');
const multer = require('multer');
const upload = multer({dest: './uploads'});
// opcional 
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    res.send(`
        <form action='/subir-archivo' method='post' enctype='multipart/form-data'>
            <input type='text' name='nombre' />
            <input type='file' name='archivo' />
            <button type='submit'>Guardar</button>
        </form>
    `);
});

app.post('/subir-archivo', upload.single('archivo'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.send('El archivo se subió correctamente');
    /* req.file 
    { fieldname: 'archivo',
    originalname: 'ferias-libres-cerro-navia.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: './uploads',
    filename: '163df373373a52fd2871a73db6915329',
    path: 'uploads/163df373373a52fd2871a73db6915329',
    size: 207045 }
    */

    // renombrar el archivo de manera opcional
    const rutaActual = req.file.path;
    const nuevoNombre = req.file.destination + '/' + req.file.originalname;
    renombrarArchivo( rutaActual, nuevoNombre );
});

const port = 8080 || process.env.PORT;
app.listen(port, () => console.log(`listening on port ${port}`));


function renombrarArchivo( rutaActual, nuevoNombre) {
    fs.rename(rutaActual, nuevoNombre, (err) => {if(err)console.error(err)} );
}