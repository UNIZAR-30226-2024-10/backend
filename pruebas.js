//const Torre = require('./piezas/Torre.js');
//const Dama = require('./piezas/Dama.js');
// const Peon = require('./piezas/Peon.js');
// const Alfil = require('./piezas/Alfil.js');
// const Caballo = require('./piezas/Caballo.js');
// const Rey = require('./piezas/Rey.js');
// const torre = new Torre(0, 0);
// const dama = new Dama(3, 3);
// const peon = new Peon(4, 1);
// const alfil = new Alfil(2, 0);
// const caballo = new Caballo(5, 2);
// const rey = new Rey(6, 1);
// // Imprimir los movimientos disponibles
// torre.imprimirMovimientosDisponibles();
// dama.imprimirMovimientosDisponibles();
// peon.imprimirMovimientosDisponibles();
// alfil.imprimirMovimientosDisponibles();
// caballo.imprimirMovimientosDisponibles();
// rey.imprimirMovimientosDisponibles();

const Jugador = require('./Jugador');
const Tablero = require('./Tablero');

// Ruta del archivo de la base de datos SQLite
const dbFilePath = '/ChessHub.db';

// Crear una instancia de Jugador
const jugador = new Jugador('./ChessHub.db');

// Agregar un jugador
jugador.agregarJugador('NombreDelJugador', 1500, 1500, 1500);

// Mostrar jugadores para verificar que se haya agregado correctamente
jugador.mostrarJugadores();

// Cerrar la conexión con la base de datos
jugador.cerrarConexion();

// Crear una instancia del tablero
const tablero = new Tablero('./ChessHub.db');
tablero.inicializarPiezas();

