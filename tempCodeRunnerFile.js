//   // Consulta SQL para crear la tabla Recompensas
//   const createTableRecompensasQuery = `
//       CREATE TABLE IF NOT EXISTS Miguel.Recompensas (
//           Id SERIAL PRIMARY KEY,
//           Tipo VARCHAR(100) NOT NULL,
//           Descripcion TEXT
//       )
//   `;

//   // Consulta SQL para crear la tabla Partidas
//   const createTablePartidasQuery = `
//       CREATE TABLE IF NOT EXISTS Miguel.Partidas (
//           Id SERIAL PRIMARY KEY,
//           JugadorBlanco INTEGER,
//           JugadorNegro INTEGER,
//           FOREIGN KEY (JugadorBlanco) REFERENCES Miguel.Usuario(Id),
//           FOREIGN KEY (JugadorNegro) REFERENCES Miguel.Usuario(Id),
//           RitmoDeJuego VARCHAR(100),
//           Estado VARCHAR(100),
//           ModoJuego VARCHAR(100),
//           FechaHoraInicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           FechaHoraFin TIMESTAMP
//       )
//   `;

//   // Consulta SQL para crear la tabla "posee"
//   const createTablePoseeQuery = `
//       CREATE TABLE IF NOT EXISTS Miguel.posee (
//           UsuarioId INTEGER REFERENCES Miguel.Usuario(Id),
//           RecompensaId INTEGER REFERENCES Miguel.Recompensas(Id),
//           PRIMARY KEY (UsuarioId, RecompensaId)
//       )
//   `;

//   const createTablePartidaAsincronaQuery = `
//       CREATE TABLE IF NOT EXISTS Miguel.PartidaAsincrona (
//           Id SERIAL PRIMARY KEY,
//           UsuarioBlancasId INTEGER REFERENCES Miguel.Usuario(Id),
//           UsuarioNegrasId INTEGER REFERENCES Miguel.Usuario(Id)
//       )
//   `;


//   const createTableUsuarioTienePartidaAsincronaQuery = `
//       CREATE TABLE IF NOT EXISTS Miguel.UsuarioTienePartidaAsincrona (
//           UsuarioId INTEGER REFERENCES Miguel.Usuario(Id),
//           PartidaAsincronaId INTEGER REFERENCES Miguel.PartidaAsincrona(Id),
//           PRIMARY KEY (UsuarioId, PartidaAsincronaId)
//       )
//   `;