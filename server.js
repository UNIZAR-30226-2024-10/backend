const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // Importar el cliente PostgreSQL
const app = express();
app.use(cors());
app.use(bodyParser.json());

// // Configuración de la conexión a la base de datos
// const pool = new Pool({
//     user: 'urvycv7gjbcvusmms2yi',
//     host: 'bwuq49rwo3gkbfsvigkw-postgresql.services.clever-cloud.com',
//     database: 'bwuq49rwo3gkbfsvigkw',
//     password: '3HP61jdkR8qSo68zNZbYB6uxjDNp8n',
//     port: 50013 // Puerto por defecto de PostgreSQL
// });

// Rutas de los usuarios
const userRouter = require("./routes/users")
app.use("/users", userRouter)

// Rutas para jugar
const playRouter = require("./routes/play")
app.use("/play", playRouter)

// Rutas para la página principal
const home_pageRouter = require("./routes/home_page")
app.use("/home_page", home_pageRouter)

// Ruta para manejar la solicitud de registro de usuario
app.post('/', (req, res) => {
    // Aquí puedes escribir la lógica para procesar la solicitud de registro de usuario
    res.send('Registro exitoso'); // Envía una respuesta al cliente
});

// // Verificar conexión a la base de datos
// pool.connect((err, client, done) => {
//     if (err) {
//         console.error('Error al conectarse a la base de datos:', err);
//     } else {
//         console.log('Conexión exitosa a la base de datos');
//         // Cierra la conexión cuando no se necesite más
//         done();
//     }
// });

// Iniciar el servidor y escuchar en el puerto 3001
app.listen(3001, () => {
    console.log('Servidor escuchando en el puerto 3001');
});
