const express = require("express")
const Tablero = require('../Tablero.js');
const Rey = require('../piezas/Rey');
const Peon = require('../piezas/Peon');
const Caballo = require('../piezas/Caballo');
const Alfil = require('../piezas/Alfil');
const Torre = require('../piezas/Torre');
const Dama = require('../piezas/Dama');



const router = express.Router()

//router.use(express.json())

// Ruta /play, para poder iniciar a jugar (como un lobby)
router.post("/:id", (req, res) => {

})

// Ruta /playing, para poder iniciar a jugar (como un lobby)
router.post("/playing/:id", (req, res) => {
    //const tablero = new Tablero('./ChessHub.db');
    
    //res.json(tablero.inicializarPiezas());
})

router.get("/playing", (req, res) => {
    const tablero = new Tablero('./ChessHub.db');
    // res.json({message: "holaaa" });
    res.json(tablero.inicializarPiezas());
})

router.post("/", (req, res) => {
    const modifiedChessboardState = req.body;


    // Comprobar movimientos disponibles del rey
    let { x: reyX, y: reyY } = modifiedChessboardState.rey;
    const rey = new Rey(reyX, reyY);
    const movimientos_disponibles_rey = rey.obtenerMovimientosDisponibles();

    console.log("Movimientos rey: ", movimientos_disponibles_rey);

    // Comprobar movimientos disponibles de los peones
    const peones = modifiedChessboardState.peones.map(peon => new Peon(peon.x, peon.y));
    const movimientos_disponibles_peones = [];
    peones.forEach(peon => {
        movimientos_disponibles_peones.push(peon.obtenerMovimientosDisponibles());
    });
    console.log("Movimientos peones: ", movimientos_disponibles_peones);

    // Comprobar movimientos disponibles de los caballos
    const caballos = modifiedChessboardState.caballos.map(caballo => new Caballo(caballo.x, caballo.y));
    const movimientos_disponibles_caballos = [];
    caballos.forEach(caballo => {
        movimientos_disponibles_caballos.push(caballo.obtenerMovimientosDisponibles());
    });
    console.log("Movimientos caballos: ", movimientos_disponibles_caballos);

    // Comprobar movimientos disponibles de los alfiles
    const alfiles = modifiedChessboardState.alfiles.map(alfil => new Alfil(alfil.x, alfil.y));
    const movimientos_disponibles_alfiles = [];
    alfiles.forEach(alfil => {
        movimientos_disponibles_alfiles.push(alfil.obtenerMovimientosDisponibles());
    });
    console.log("Movimientos alfiles: ", movimientos_disponibles_alfiles);

    // Comprobar movimientos disponibles de las torres
    const torres = modifiedChessboardState.torres.map(torre => new Torre(torre.x, torre.y));
    const movimientos_disponibles_torres = [];
    torres.forEach(torre => {
        movimientos_disponibles_torres.push(torre.obtenerMovimientosDisponibles());
    });
    console.log("Movimientos torres: ", movimientos_disponibles_torres);

    // Comprobar movimientos disponibles de la reina
    let { x: damaX, y: damaY } = modifiedChessboardState.dama;
    const dama = new Dama(damaX, damaY);
    const movimientos_disponibles_dama = dama.obtenerMovimientosDisponibles();

    console.log("Movimientos dama: ", movimientos_disponibles_dama);






    res.json({ message: "Modified JSON received successfully" });
});

// Ruta /play/select_mode, para que el usuario pueda elegir si jugar bullet, blitz o rapid
router.post("/select_mode/:id", (req, res) => {

})

module.exports = router;