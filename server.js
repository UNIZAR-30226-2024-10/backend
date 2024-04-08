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
const pool = new Pool({
    user: 'ugfchsan0qbfkvhvyuwl',
    host: 'bm9v4y7glvvz5acg8lj3-postgresql.services.clever-cloud.com',
    database: 'bm9v4y7glvvz5acg8lj3',
    password: 'FL2O9CrTAJ89cBxbHihI',
    port: 50013 // Puerto por defecto de PostgreSQL
});

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
const home_pageRouter = require("./routes/home_page");
const { disconnect } = require('process');
app.use("/home_page", home_pageRouter)

// Ruta para manejar la solicitud de registro de usuario
app.post('/', (req, res) => {
  // Aquí puedes escribir la lógica para procesar la solicitud de registro de usuario
  res.send('Registro exitoso'); // Envía una respuesta al cliente
});

// // Verificar conexión a la base de datos
pool.connect((err, client, done) => {
  if (err) {
      console.error('Error al conectarse a la base de datos:', err);
  } else {
      console.log('Conexión exitosa a la base de datos');

      // Consulta SQL para crear la tabla Usuario
      const createTableQuery = `
          CREATE TABLE IF NOT EXISTS Miguel.Usuario (
              Id SERIAL PRIMARY KEY,
              Nombre VARCHAR(100) NOT NULL,
              Contraseña VARCHAR(100) NOT NULL,
              CorreoElectronico VARCHAR(100) UNIQUE NOT NULL,
              EloBlitz INTEGER DEFAULT 1200,
              EloRapid INTEGER DEFAULT 1200,
              EloBullet INTEGER DEFAULT 1200,
              Victorias INTEGER DEFAULT 0,
              Derrotas INTEGER DEFAULT 0,
              Empates INTEGER DEFAULT 0,
              Arena VARCHAR(100)
          )
      `;

      // Ejecutar la consulta para crear la tabla Usuario
      pool.query(createTableQuery, (err, result) => {
          if (err) {
              console.error('Error al crear la tabla Usuario:', err);
          } else {
              console.log('Tabla Usuario creada exitosamente');

              // Consulta SQL para crear la tabla Recompensas
              const createTableRecompensasQuery = `
                  CREATE TABLE IF NOT EXISTS Miguel.Recompensas (
                      Id SERIAL PRIMARY KEY,
                      Tipo VARCHAR(100) NOT NULL,
                      Descripcion TEXT
                  )
              `;

              // Ejecutar la consulta para crear la tabla Recompensas
              pool.query(createTableRecompensasQuery, (err, result) => {
                  if (err) {
                      console.error('Error al crear la tabla Recompensas:', err);
                  } else {
                      console.log('Tabla Recompensas creada exitosamente');

                      // Consulta SQL para crear la tabla Partidas
                      const createTablePartidasQuery = `
                          CREATE TABLE IF NOT EXISTS Miguel.Partidas (
                              Id SERIAL PRIMARY KEY,
                              JugadorBlanco INTEGER,
                              JugadorNegro INTEGER,
                              FOREIGN KEY (JugadorBlanco) REFERENCES Miguel.Usuario(Id),
                              FOREIGN KEY (JugadorNegro) REFERENCES Miguel.Usuario(Id),
                              RitmoDeJuego VARCHAR(100),
                              Estado VARCHAR(100),
                              ModoJuego VARCHAR(100),
                              FechaHoraInicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              FechaHoraFin TIMESTAMP
                          )
                      `;

                      // Ejecutar la consulta para crear la tabla Partidas
                      pool.query(createTablePartidasQuery, (err, result) => {
                          if (err) {
                              console.error('Error al crear la tabla Partidas:', err);
                          } else {
                              console.log('Tabla Partidas creada exitosamente');
                              //Borrar todos los usuarios
                              /*pool.query('DELETE FROM Miguel.Usuario', (error, results) => {
                                if (error) {
                                    console.error('Error al borrar todas las filas:', error);
                                } else {
                                    console.log('Todas las filas han sido eliminadas exitosamente');
                                }
                              });*/
                          }

                          // Cierra la conexión cuando no se necesite más
                          done();
                      });
                  }
              });
          }
      });
  }
});

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
      socket.join((room.roomId).toString());
      // Enviamos información adicional a cada jugador que se ha unido a la sala
/*       room.playersIds.forEach((playerId) => {
        const playerColor = playerId === socket.id ? 'white' : 'black'; // Asignar colores de manera diferente
        room.timeOutId = setTimeout(() => { // Da cierto tiempo para poder cancelar la partida
          io.to(playerId).emit('game_ready', { roomId: room.roomId, color: playerColor, mode, playerId });
          console.log("a jugar", room.roomId)
        }, 5000); // 5000 milisegundos = 5 segundos
        io.to(playerId).emit("match_found");
      }); */
      
      room.playersIds.forEach((playerId) => {
        io.to(playerId).emit("match_found");
      });
      // Con el siguiente timeOut, permitimos a los jugadores cancelar la partida durante un periodo de 5 segundos
      room.timeOutId = setTimeout(() => { // Da cierto tiempo para poder cancelar la partida
        room.playersIds.forEach((playerId) => {
          const playerColor = playerId === socket.id ? 'white' : 'black'; // Asignar colores de manera diferente
          io.to(playerId).emit('game_ready', { roomId: room.roomId, color: playerColor, mode, playerId });
          console.log("a jugar", room.roomId)
        });
      }, 5000); // 5000 milisegundos = 5 segundos
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
  socket.on("move", (data) => {
    console.log("ha movido")
    socket.to(data.roomId).emit("movido", data.tableroEnviar)
  })
  socket.on('chat message', (data) => { // Se recibe un menaje enviado por otro usuario
    console.log(data)
    socket.to(data.roomId).emit('chat message', {body:data.body,from:data.from} )
  });
  socket.on("cancel_search", ({ mode }) => { // Si se cancela la busqueda, se elimina la sala creada
    console.log(`cancel search: ${socket.id}`);
    const room = games.find(room => room.mode === mode && room.players < 2 );
    games.splice(games.indexOf(room),1);
    console.log(`Room ${room.roomId} is now empty and removed`);
  });
  socket.on("cancel_match", () => { // Si ya se había encontrado partida, se cancela
    console.log(`Game canceled by: ${socket.id}`);

    for (let i = 0; i < games.length; i++) {
      const room = games[i];
      const playerIndex = room.playersIds.indexOf(socket.id);
      if (playerIndex !== -1) {
        clearTimeout(room.timeOutId); // Limpia el timeout de comienzo de la partida
        room.playersIds.splice(playerIndex, 1);
        room.players--;
        const remainingPlayerId = room.playersIds[0]; // Avisa al otro jugador de la cancelación de la partida
        io.to(remainingPlayerId).emit("match_canceled");
        games.splice(i, 1); // Remove the room from the games array
        console.log(`Room ${room.roomId} is now empty and removed`);
        break;
      }
    }
  });
  socket.on("I_surrender", ({ roomId }) => {
    console.log(`User ${socket.id} surrendered from room ${roomId}`);
    for (let i = 0; i < games.length; i++) {
      const room = games[i];
      const playerIndex = room.playersIds.indexOf(socket.id);
      if (playerIndex !== -1) {
        room.playersIds.splice(playerIndex, 1);
        room.players--;

        const remainingPlayerId = room.playersIds[0]; // Avisa al otro jugador
        io.to(remainingPlayerId).emit("oponent_surrendered");
        games.splice(i, 1); // Remove the room from the games array
        console.log(`Room ${room.roomId} is now empty and removed`);
        break;
      }
    }
  });
  socket.on("disconnect", () => { // Un jugador se desconecta
/*     const roomsJoined = Object.keys(socket.rooms);
    roomsJoined.forEach((roomName) => {
      // Decrementar el contador de jugadores en la sala
      if (games[roomName]) {
        games[roomName].players--;
        // Si no hay más jugadores en la sala, cerrar la sala
        if (games[roomName].players === 0) {
          delete games[roomName];
          console.log("elimino room")
          // Aquí puedes notificar a los jugadores que la sala ha sido cerrada
        }
      }
    }); */

    for (let i = 0; i < games.length; i++) {
      const room = games[i];
      const playerIndex = room.playersIds.indexOf(socket.id);
      if (playerIndex !== -1) {
        // Player found in this room
        console.log(`User ${socket.id} disconnected from room ${room.roomId}`);
        // Perform any necessary actions, such as removing the player from the room
        room.playersIds.splice(playerIndex, 1);
        room.players--;

        // If there are no more players in the room, you might want to clean up the room
        if (room.players === 0) {
            games.splice(i, 1); // Remove the room from the games array
            console.log(`Room ${room.roomId} is now empty and removed`);
        }
        else { // Notificar al jugador de que ha ganado la partida (el otro ha abandonado)
          const remainingPlayerId = room.playersIds[0];
          io.to(remainingPlayerId).emit("player_disconnected");
          games.splice(i, 1); // Remove the room from the games array
        }
        break; // No need to continue searching
      }
    }
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