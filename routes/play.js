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
    const modifiedChessboardState = req.body;

    tablero.actualizarTablero(modifiedChessboardState);
    console.log("Tablero actualizado");
    tablero.mostrarTablero();

    // Comprobar movimientos disponibles del rey
    let { x: reyX, y: reyY, color: reyColor } = modifiedChessboardState.rey;
    const rey = new Rey(reyX, reyY, reyColor, tablero);
    
    const movimientos_disponibles_rey = rey.obtenerMovimientosDisponibles();
    console.log("Movimientos rey: ", movimientos_disponibles_rey);

    // Comprobar movimientos disponibles de los peones
    // const peones = modifiedChessboardState.peones.map(peon => new Peon(peon.x, peon.y, peon.color, tablero));
    // const movimientos_disponibles_peones = [];
    // peones.forEach(peon => {
    //     movimientos_disponibles_peones.push(peon.obtenerMovimientosDisponibles());
    //     });
    // console.log("Movimientos peones: ", movimientos_disponibles_peones);


    // Comprobar movimientos disponibles de los caballos
    const caballos = modifiedChessboardState.caballos.map(caballo => new Caballo(caballo.x, caballo.y, caballo.color, tablero));
    const movimientos_disponibles_caballos = [];
    caballos.forEach(caballo => {
        movimientos_disponibles_caballos.push(caballo.obtenerMovimientosDisponibles());
    });
    console.log("Movimientos caballos: ", movimientos_disponibles_caballos);

    // Comprobar movimientos disponibles de los alfiles
    const alfiles = modifiedChessboardState.alfiles.map(alfil => new Alfil(alfil.x, alfil.y, alfil.color, tablero));
    const movimientos_disponibles_alfiles = [];
    alfiles.forEach(alfil => {
        movimientos_disponibles_alfiles.push(alfil.obtenerMovimientosDisponibles());
    });
    console.log("Movimientos alfiles: ", movimientos_disponibles_alfiles);

    // Comprobar movimientos disponibles de las torres
    const movimientos_disponibles_torres = [];

    const torres = modifiedChessboardState.torres.map(torre => {
        const torreObj = new Torre(torre.x, torre.y, torre.color, tablero);
        const movimientos = torreObj.obtenerMovimientosDisponibles();
        movimientos_disponibles_torres.push({posicion: { x: torre.x, y: torre.y },
            movimientos});
    });
console.log("Movimientos torres: ", movimientos_disponibles_torres);

    // Comprobar movimientos disponibles de la dama
    let { x: damaX, y: damaY, color: damaColor} = modifiedChessboardState.dama;
    const dama = new Dama(damaX, damaY, damaColor, tablero);
    const movimientos_disponibles_dama = dama.obtenerMovimientosDisponibles();

    console.log("Movimientos dama: ", movimientos_disponibles_dama);

    const allMovements = {
        rey: movimientos_disponibles_rey,
        //peones: movimientos_disponibles_peones,
        caballos: movimientos_disponibles_caballos,
        alfiles: movimientos_disponibles_alfiles,
        torres: movimientos_disponibles_torres,
        dama: movimientos_disponibles_dama
    };

    res.json({allMovements});
});


// Ruta /play/select_mode, para que el usuario pueda elegir si jugar bullet, blitz o rapid
router.post("/select_mode/:id", (req, res) => {

})

module.exports = router;