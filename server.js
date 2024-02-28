const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
// Configurar middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());
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



// Iniciar el servidor y escuchar en el puerto 3000
app.listen(3002, () => {
    console.log('Servidor escuchando en el puerto 3002');
});
