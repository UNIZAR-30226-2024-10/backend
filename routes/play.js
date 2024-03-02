const express = require("express")
const Tablero = require('../Tablero.js');
const Rey = require('../piezas/Rey');
const Peon = require('../piezas/Peon');
const Caballo = require('../piezas/Caballo');
const Alfil = require('../piezas/Alfil');
const Torre = require('../piezas/Torre');
const Dama = require('../piezas/Dama');

const tablero = new Tablero('./ChessHub.db');

const router = express.Router()

let historial_partida = [];


// Ruta /play, para poder iniciar a jugar (como un lobby)
router.post("/:id", (req, res) => {

})

// Ruta /playing, para poder iniciar a jugar (como un lobby)
router.post("/playing/:id", (req, res) => {
    //const tablero = new Tablero('./ChessHub.db');
    
    //res.json(tablero.inicializarPiezas());
})

router.get("/start_game", (req, res) => {
    
    res.json(tablero.inicializarPiezas());
})


router.post("/", (req, res) => {

        // Nuevos campos en el JSON:
        // - turno: string
        // Casilla de la última pieza comida. Si no se ha comido ninguna, x: -1 e y: -1


    const modifiedChessboardState = req.body;

    tablero.actualizarTablero(modifiedChessboardState);
    console.log("Tablero actualizado");
    tablero.mostrarTablero();

    // Comprobar a quién le toca mover
    const turno = modifiedChessboardState.turno;
    console.log("Turno: ", turno);

    // Comprobar movimientos disponibles del rey
    const reyes = modifiedChessboardState.reyes.map(rey => new Rey(rey.x, rey.y, rey.color, tablero));
    const movimientos_disponibles_reyes = [];
    reyes.forEach(rey => {
        movimientos_disponibles_reyes.push(rey.obtenerMovimientosDisponibles());
    });
    console.log("Movimientos reyes: ", movimientos_disponibles_reyes);

    // Comprobar movimientos disponibles de los peones

    const peones = modifiedChessboardState.peones.map(peon => {
        if (peon.x !== modifiedChessboardState.casilla_con_pieza_comida.x || peon.y !== modifiedChessboardState.casilla_con_pieza_comida.y) {
            return new Peon(peon.x, peon.y, peon.color, tablero);
        }
        return null; // Skip creating an object for the specified coordinates
    }).filter(peon => peon !== null);
    
    const movimientos_disponibles_peones = [];
    peones.forEach(peon => {
        movimientos_disponibles_peones.push(peon.obtenerMovimientosDisponibles());
    });
    console.log("Movimientos peones: ", movimientos_disponibles_peones);


    // Comprobar movimientos disponibles de los caballos

    const caballos = modifiedChessboardState.caballos.map(caballo => {
        if (caballo.x !== modifiedChessboardState.casilla_con_pieza_comida.x || caballo.y !== modifiedChessboardState.casilla_con_pieza_comida.y) {
            return new Caballo(caballo.x, caballo.y, caballo.color, tablero);
        }
        return null; // Skip creating an object for the specified coordinates
    }).filter(caballo => caballo !== null);
    
    const movimientos_disponibles_caballos = [];
    caballos.forEach(caballo => {
        movimientos_disponibles_caballos.push(caballo.obtenerMovimientosDisponibles());
    });
    console.log("Movimientos caballos: ", movimientos_disponibles_caballos);

    // Comprobar movimientos disponibles de los alfiles
    const alfiles = modifiedChessboardState.alfiles.map(alfil => {
        if (alfil.x !== modifiedChessboardState.casilla_con_pieza_comida.x || alfil.y !== modifiedChessboardState.casilla_con_pieza_comida.y) {
            return new Alfil(alfil.x, alfil.y, alfil.color, tablero);
        }
        return null; // Skip creating an object for the specified coordinates
    }).filter(alfil => alfil !== null);
    
    const movimientos_disponibles_alfiles = [];
    alfiles.forEach(alfil => {
        movimientos_disponibles_alfiles.push(alfil.obtenerMovimientosDisponibles());
    });
    console.log("Movimientos alfiles: ", movimientos_disponibles_alfiles);

    // Comprobar movimientos disponibles de las torres
    const torres = modifiedChessboardState.torres.map(torre => {
        if (torre.x !== modifiedChessboardState.casilla_con_pieza_comida.x || torre.y !== modifiedChessboardState.casilla_con_pieza_comida.y) {
            return new Torre(torre.x, torre.y, torre.color, tablero);
        }
        return null; // Skip creating an object for the specified coordinates
    }).filter(torre => torre !== null);
    
    const movimientos_disponibles_torres = [];
    torres.forEach(torre => {
        movimientos_disponibles_torres.push(torre.obtenerMovimientosDisponibles());
    });
    console.log("Movimientos torres: ", movimientos_disponibles_torres);

    // Comprobar movimientos disponibles de la dama

    const damas = modifiedChessboardState.damas.map(dama => {
        if (dama.x !== modifiedChessboardState.casilla_con_pieza_comida.x || dama.y !== modifiedChessboardState.casilla_con_pieza_comida.y) {
            return new Dama(dama.x, dama.y, dama.color, tablero);
        }
        return null; // Skip creating an object for the specified coordinates
    }).filter(dama => dama !== null);
    
    const movimientos_disponibles_damas = [];
    damas.forEach(dama => {
        movimientos_disponibles_damas.push(dama.obtenerMovimientosDisponibles());
    });
    console.log("Movimientos damas: ", movimientos_disponibles_damas);

    const allMovements = {
        reyes: movimientos_disponibles_reyes,
        peones: movimientos_disponibles_peones,
        caballos: movimientos_disponibles_caballos,
        alfiles: movimientos_disponibles_alfiles,
        torres: movimientos_disponibles_torres,
        damas: movimientos_disponibles_damas
    };

    res.json({allMovements});
});


// Ruta /play/select_mode, para que el usuario pueda elegir si jugar bullet, blitz o rapid
router.post("/select_mode/:id", (req, res) => {

})

module.exports = router;