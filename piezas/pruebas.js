const Torre = require('./Torre.js');
const Dama = require('./Dama.js');
const Peon = require('./Peon.js');
const Alfil = require('./Alfil.js');
const Caballo = require('./Caballo.js');
const Rey = require('./Rey.js');
const torre = new Torre(0, 0);
const dama = new Dama(3, 3);
const peon = new Peon(4, 1);
const alfil = new Alfil(2, 0);
const caballo = new Caballo(5, 2);
const rey = new Rey(6, 1);
// Imprimir los movimientos disponibles
torre.imprimirMovimientosDisponibles();
dama.imprimirMovimientosDisponibles();
peon.imprimirMovimientosDisponibles();
alfil.imprimirMovimientosDisponibles();
caballo.imprimirMovimientosDisponibles();
rey.imprimirMovimientosDisponibles();
