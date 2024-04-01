const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require("socket.io");

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
// Crear un servidor HTTP utilizando Express
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
  },
});


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
var games = []; // Utilizamos un array para almacenar las salas

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', function ({ mode }) {
      console.log("buscando sala");
      // Buscar una sala libre con el modo de juego especificado
      const room = games.find(room => room.mode === mode && room.players < 2);

      if (room) {
          // Si se encuentra una sala libre, el jugador se une a ella
          room.players++;
          room.playersIds.push(socket.id);
          socket.join(room.roomId);
          // Enviamos información adicional a cada jugador que se ha unido a la sala
          room.playersIds.forEach((playerId) => {
              const playerColor = playerId === socket.id ? 'white' : 'black'; // Asignar colores de manera diferente
              io.to(playerId).emit('game_ready', { roomId: room.roomId, color: playerColor, mode, playerId });
          });
      } else {
          // Si no se encuentra una sala libre, se crea una nueva sala
          const roomId = Math.floor(Math.random() * 100000); // Generar un ID de sala aleatorio
          games.push({ roomId, mode, players: 1, playersIds: [socket.id] });
          socket.join(roomId.toString()); // Convertir el ID de la sala a cadena antes de unirse
          socket.emit('room_created', { roomId, mode, color: 'white' });
      }
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("jugar", (data) => {
    console.log("unido")
    socket.join(data)
  });
  socket.on("move", (data) =>{
    socket.to(data.roomId).emit("movido", data.tableroEnviar)
  })
});


// Iniciar el servidor y escuchar en el puerto 3001
// app.listen(3001, () => {
//     console.log('Servidor escuchando en el puerto 3001');
// });

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});