const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require("socket.io");
const pool = require('./db');

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const crypto = require('crypto');




const app = express();
app.use(cors());
app.use(bodyParser.json());



// Generate a random session secret
const sessionSecret = crypto.randomBytes(64).toString('hex');

// Configure session middleware
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: new session.MemoryStore(), // Use memory-store for session storage
  cookie: { secure: false } // Set secure to true if using HTTPS
}));

// Crear un servidor HTTP utilizando Express
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
  },
});
// Consulta SQL para borrar la tabla Usuario
const dropTableUsuarioQuery = `
      DROP TABLE Miguel.Usuario CASCADE;
`;
// Consulta SQL para crear la tabla Usuario
  const createTableUsuarioQuery = `
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
          Arena VARCHAR(100) DEFAULT 'Madera',
          Avatar VARCHAR(100) DEFAULT '/static/media/wK.ae4879833ee0111ba3b20402a2a3fe81.svg',
          Color VARCHAR(100) DEFAULT 'orange',
          PuntosPase INTEGER DEFAULT 0,
          setPiezas VARCHAR(100) DEFAULT 'DEFECTO',
          emoticonos VARCHAR(100) DEFAULT '{\"😁\",\"😁\",\"😁\",\"😁\"}',
          nivelPase INTEGER DEFAULT 0
      )
  `;
// Consulta SQL para crear la tabla Recompensas
const createTableRecompensasQuery = `
CREATE TABLE IF NOT EXISTS Miguel.Recompensas (
Id SERIAL PRIMARY KEY,
Tipo VARCHAR(100) NOT NULL,
Descripcion TEXT
)
`;

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

// Consulta SQL para crear la tabla "posee"
const createTablePoseeQuery = `
CREATE TABLE IF NOT EXISTS Miguel.posee (
UsuarioId INTEGER REFERENCES Miguel.Usuario(Id),
RecompensaId INTEGER REFERENCES Miguel.Recompensas(Id),
PRIMARY KEY (UsuarioId, RecompensaId)
)
`;

const createTablePartidaAsincronaQuery = `
CREATE TABLE IF NOT EXISTS Miguel.PartidaAsincronaTableroDefi (
Id SERIAL PRIMARY KEY,
UsuarioBlancasId INTEGER REFERENCES Miguel.Usuario(Id),
UsuarioNegrasId INTEGER REFERENCES Miguel.Usuario(Id),
Tablero VARCHAR(65000)
)
`;


const createTableUsuarioTienePartidaAsincronaQuery = `
CREATE TABLE IF NOT EXISTS Miguel.UsuarioTienePartidaAsincrona (
UsuarioId INTEGER REFERENCES Miguel.Usuario(Id),
PartidaAsincronaId INTEGER REFERENCES Miguel.PartidaAsincrona(Id),
PRIMARY KEY (UsuarioId, PartidaAsincronaId)
)
`;


async function myDatabaseQuery1() {
  const client = await pool.connect();
    console.log('Connected to the database');
    
    // Log the query being executed
    console.log('Executing query:', createTableUsuarioQuery);
    //await client.query(dropTableUsuarioQuery);
    //console.log('Query 0 executed successfully');
    await client.query(createTableUsuarioQuery);
    console.log('Query 1 executed successfully');
    await client.query(createTableRecompensasQuery);
    console.log('Query 2 executed successfully');

    await client.query(createTablePartidasQuery);
    console.log('Query 3 executed successfully');
    await client.query(createTablePoseeQuery);
    console.log('Query 4 executed successfully');
    await client.query(createTablePartidaAsincronaQuery);
    console.log('Query 5 executed successfully');
    await client.query(createTableUsuarioTienePartidaAsincronaQuery);
    console.log('Query 6 executed successfully');



    client.release();
    console.log('Connection released');
    //await client.end();
    console.log('Connection closed');

}




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


//myDatabaseQuery1();
// myDatabaseQuery2();





var games = []; // Utilizamos un array para almacenar las salas

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on('join_room', function ({ mode, elo, userId }) {
    console.log("buscando sala");
    console.log(userId)
    // Buscar una sala libre con el modo de juego especificado
    const room = games.find(room => room.mode === mode && room.players < 2);

    if (room) {
      // Si se encuentra una sala libre, el jugador se une a ella
      room.players++;
      room.playersIds.push(socket.id);
      room.usersIds.push(userId);
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
          const playerColor = playerId[0] === socket.id ? 'white' : 'black'; // Asignar colores de manera diferente
          io.to(playerId).emit('game_ready', { roomId: room.roomId, color: playerColor, mode, opponent: room.usersIds.find(id => id !== userId)});
          console.log("a jugar", room.roomId)
        });
      }, 5000); // 5000 milisegundos = 5 segundos
    } else {
      // Si no se encuentra una sala libre, se crea una nueva sala
      const roomId = Math.floor(Math.random() * 100000); // Generar un ID de sala aleatorio
      games.push({ roomId, mode, players: 1, playersIds: [socket.id], usersIds:[userId], elo});
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

async function initializeDatabase() {
  try {
      const client = await pool.connect();
      console.log('Database connection pool initialized');
      client.release();
  } catch (error) {
      console.error('Error initializing database connection pool:', error);
      // Handle error appropriately, such as exiting the application
      //process.exit(1);
  }
}

async function startServer() {
  // Initialize the database connection pool
  await initializeDatabase();

  // Define routes and middleware
  // ...

  // Start the server
  const port = process.env.PORT || 3001;
  server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
  });
}

startServer();