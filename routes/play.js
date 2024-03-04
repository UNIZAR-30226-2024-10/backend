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


    const pieceArrays = [
        modifiedChessboardState.peones,
        modifiedChessboardState.alfiles,
        modifiedChessboardState.torres,
        modifiedChessboardState.caballos,
        modifiedChessboardState.damas,
        modifiedChessboardState.reyes
    ];
    
    let conflictingPieces = [];
    
    // Iterate through each pair of pieces from different arrays
    for (let i = 0; i < pieceArrays.length - 1; i++) {
        for (let j = i + 1; j < pieceArrays.length; j++) {
            const pieces1 = pieceArrays[i];
            const pieces2 = pieceArrays[j];
    
            // Check for conflicting coordinates between pieces from different arrays
            for (const piece1 of pieces1) {
                for (const piece2 of pieces2) {
                    if (piece1.x === piece2.x && piece1.y === piece2.y) {
                        conflictingPieces.push({ piece1, piece2 });
                    }
                }
            }
        }
    }
    
    console.log("Piezas en conflicto: ", conflictingPieces);

    














    // Comprobar movimientos disponibles del rey
    const reyes = modifiedChessboardState.reyes.map(rey => new Rey(rey.x, rey.y, rey.color, tablero));
    const movimientos_disponibles_reyes = [];
    reyes.forEach(rey => {
      if (turno === rey.color){
        movimientos_disponibles_reyes.push(rey.obtenerMovimientosDisponibles());
        estaEnJaque = rey.jaque(rey);
      }
    });
    console.log("Movimientos rey: ", movimientos_disponibles_reyes);

    if (!estaEnJaque){

    // Comprobar movimientos disponibles de los peones


    const peones = modifiedChessboardState.peones.map(peon => {
        // Check if the current peon is conflicting with any piece
        const isConflicting = conflictingPieces.some(conflictingPiece => 
          peon.x === conflictingPiece.piece1.x && peon.y === conflictingPiece.piece1.y
        );
      
        // If it's not conflicting, create the peon
        if (!isConflicting) {
          return new Peon(peon.x, peon.y, peon.color, tablero);
        }
      
        return null; // Skip creating an object for conflicting coordinates
      }).filter(peon => peon !== null);
      
      const movimientos_disponibles_peones = peones.map(peon => peon.obtenerMovimientosDisponibles());
      console.log("Movimientos peones: ", movimientos_disponibles_peones);


    // Comprobar movimientos disponibles de los caballos

    const caballos = modifiedChessboardState.caballos.map(caballo => {
        // Check if the current peon is conflicting with any piece
        const isConflicting = conflictingPieces.some(conflictingPiece => 
            caballo.x === conflictingPiece.piece1.x && caballo.y === conflictingPiece.piece1.y
        );
      
        // If it's not conflicting, create the peon
        if (!isConflicting) {
          return new Caballo(caballo.x, caballo.y, caballo.color, tablero);
        }
      
        return null; // Skip creating an object for conflicting coordinates
      }).filter(caballo => caballo !== null);
      
      const movimientos_disponibles_caballos = caballos.map(caballo => caballo.obtenerMovimientosDisponibles());
      console.log("Movimientos caballos: ", movimientos_disponibles_caballos);
    

    // Comprobar movimientos disponibles de los alfiles
    const alfiles = modifiedChessboardState.alfiles.map(alfil => {
        // Check if the current peon is conflicting with any piece
        const isConflicting = conflictingPieces.some(conflictingPiece => 
            alfil.x === conflictingPiece.piece1.x && alfil.y === conflictingPiece.piece1.y
        );
      
        // If it's not conflicting, create the peon
        if (!isConflicting) {
          return new Alfil(alfil.x, alfil.y, alfil.color, tablero);
        }
      
        return null; // Skip creating an object for conflicting coordinates
      }).filter(alfil => alfil !== null);
      
      const movimientos_disponibles_alfiles = alfiles.map(alfil => alfil.obtenerMovimientosDisponibles());
      console.log("Movimientos alfiles: ", movimientos_disponibles_alfiles);

    // Comprobar movimientos disponibles de las torres
    const torres = modifiedChessboardState.torres.map(torre => {
        // Check if the current peon is conflicting with any piece
        const isConflicting = conflictingPieces.some(conflictingPiece => 
            torre.x === conflictingPiece.piece1.x && torre.y === conflictingPiece.piece1.y
        );
      
        if (!isConflicting) {
          return new Torre(torre.x, torre.y, torre.color, tablero);
        }
      
        return null; // Skip creating an object for conflicting coordinates
      }).filter(torre => torre !== null);
      
      const movimientos_disponibles_torres = torres.map(torre => torre.obtenerMovimientosDisponibles());
      console.log("Movimientos torres: ", movimientos_disponibles_torres);

    // Comprobar movimientos disponibles de la dama

    const damas = modifiedChessboardState.damas.map(dama => {
        // Check if the current peon is conflicting with any piece
        const isConflicting = conflictingPieces.some(conflictingPiece => 
            dama.x === conflictingPiece.piece1.x && dama.y === conflictingPiece.piece1.y
        );
      
        // If it's not conflicting, create the peon
        if (!isConflicting) {
          return new Dama(dama.x, dama.y, dama.color, tablero);
        }
      
        return null; // Skip creating an object for conflicting coordinates
      }).filter(dama => dama !== null);
      
      const movimientos_disponibles_damas = damas.map(dama => dama.obtenerMovimientosDisponibles());
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
  }
  else {
    const allMovements = {
      reyes:movimientos_disponibles_reyes
    };
    console.log("Estoy en jaque");
    res.json({allMovements});
  }
});


// Ruta /play/select_mode, para que el usuario pueda elegir si jugar bullet, blitz o rapid
router.post("/select_mode/:id", (req, res) => {

})

module.exports = router;