const express = require("express")
const Tablero = require('../Tablero.js');
const Rey = require('../piezas/Rey');
const Peon = require('../piezas/Peon');
const Caballo = require('../piezas/Caballo');
const Alfil = require('../piezas/Alfil');
const Torre = require('../piezas/Torre');
const Dama = require('../piezas/Dama');

const router = express.Router()

let ha_movido_rey_blanco = false;
let ha_movido_rey_negro = false;
let ha_movido_torre_blanca_dcha = false;
let ha_movido_torre_blanca_izqda = false;
let ha_movido_torre_negra_dcha = false;
let ha_movido_torre_negra_izqda = false;


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

  const tablero = new Tablero('./ChessHub.db');

    let modifiedChessboardState = req.body;

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
    

    // Mirar piezas en la misma casilla (comer)
    for (const pieces of pieceArrays) {
      
      for (let i = 0; i < pieces.length - 1; i++) {
          for (let j = i + 1; j < pieces.length; j++) {
              const piece1 = pieces[i];
              const piece2 = pieces[j];

              if (piece1.x === piece2.x && piece1.y === piece2.y) {
                  conflictingPieces.push({ piece1, piece2 });
              }
          }
      }
    }

    
    for (let i = 0; i < pieceArrays.length - 1; i++) {
      for (let j = i + 1; j < pieceArrays.length; j++) {
          const pieces1 = pieceArrays[i];
          const pieces2 = pieceArrays[j];

          
          for (const piece1 of pieces1) {
              for (const piece2 of pieces2) {
                  if (piece1.x === piece2.x && piece1.y === piece2.y) {
                      conflictingPieces.push({ piece1, piece2 });
                  }
              }
          }
      }
    }
    

    //if (!estaEnJaque){

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
        else {
          if(peon.color !== turno) {
            // PEON ES EL QUE COME
            return new Peon(peon.x, peon.y, peon.color, tablero);
          }
          else {
            // PEON ES EL COMIDO
            return null;
          }
        }
      }).filter(peon => peon !== null);
      
      let movimientos_disponibles_peones = [];
      // Add the king's position to the array
      peones.forEach(peon => {
      // Create a new list for each caballo
      const peonMovimientos = [{ fromX: peon.Posicion.x, fromY: peon.Posicion.y, fromColor: peon.color }];
      
      // Append movements to the new list
      peonMovimientos.push(...peon.obtenerMovimientosDisponibles());
  
      // Append the new list to the main list
      movimientos_disponibles_peones.push(peonMovimientos);

    });


    // Comprobar movimientos disponibles de los caballos

    const caballos = modifiedChessboardState.caballos.map(caballo => {
        // Check if the current peon is conflicting with any piece
        const isConflicting = conflictingPieces.some(conflictingPiece => 
            caballo.x === conflictingPiece.piece1.x && caballo.y === conflictingPiece.piece1.y
        );
      
        
        if (!isConflicting) {
          
          return new Caballo(caballo.x, caballo.y, caballo.color, tablero);
        }
        else {
          if(caballo.color !== turno) {
            // CABALLO ES EL QUE COME
            return new Caballo(caballo.x, caballo.y, caballo.color, tablero);
          }
          else {
            // CABALLO ES EL COMIDO
            return null;
          }
        }
      }).filter(caballo => caballo !== null);
      
      let movimientos_disponibles_caballos = [];

      caballos.forEach(caballo => {
        // Create a new list for each caballo
        const caballoMovimientos = [{ fromX: caballo.Posicion.x, fromY: caballo.Posicion.y, fromColor: caballo.color }];
        
        // Append movements to the new list
        caballoMovimientos.push(...caballo.obtenerMovimientosDisponibles());
        console.log("Movimientos caballooooooo", caballoMovimientos);
    
        // Append the new list to the main list
        movimientos_disponibles_caballos.push(caballoMovimientos);
    });
    

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
        else {
          if(alfil.color !== turno) {
            // ALFIL ES EL QUE COME
            return new Alfil(alfil.x, alfil.y, alfil.color, tablero);
          }
          else {
            // ALFIL ES EL COMIDO
            return null;
          }
        }
      }).filter(alfil => alfil !== null);
      
      let movimientos_disponibles_alfiles = [];
      // Add the king's position to the array
      alfiles.forEach(alfil => {
      // Create a new list for each caballo
      const alfilMovimientos = [{ fromX: alfil.Posicion.x, fromY: alfil.Posicion.y, fromColor: alfil.color }];
      
      // Append movements to the new list
      alfilMovimientos.push(...alfil.obtenerMovimientosDisponibles());
  
      // Append the new list to the main list
      movimientos_disponibles_alfiles.push(alfilMovimientos);

    });

    // Comprobar movimientos disponibles de las torres
    const torres = modifiedChessboardState.torres.map(torre => {
        // Check if the current peon is conflicting with any piece
        const isConflicting = conflictingPieces.some(conflictingPiece =>
            torre.x === conflictingPiece.piece1.x && torre.y === conflictingPiece.piece1.y
        );
      
        if (!isConflicting) {
          return new Torre(torre.x, torre.y, torre.color, tablero);
        }
        else {
          if(torre.color !== turno) {
            // TORRE ES EL QUE COME
            return new Torre(torre.x, torre.y, torre.color, tablero);
          }
          else {
            // TORRE ES EL COMIDO
            return null;
          }
        }
      }).filter(torre => torre !== null);
      
      let movimientos_disponibles_torres = [];
      // Add the king's position to the array
      torres.forEach(torre => {
          // COMPROBAR SI LAS TORRES SE HAN MOVIDO DE SU POSICION INICIAL
          if(torre.color === "blancas" && torre.lado === "izquierda") {
            
            if(torre.Posicion.x !== 0 || torre.Posicion.y !== 0) {
              ha_movido_torre_blanca_izqda = true;
            }
          }
          else if(torre.color === "blancas" && torre.lado === "derecha") {
            if(torre.Posicion.x !== 7 || torre.Posicion.y !== 0) {
              ha_movido_torre_blanca_dcha = true;
            }
          }
          else if(torre.color === "negras" && torre.lado === "izquierda") {
            if(torre.Posicion.x !== 0 || torre.Posicion.y !== 7) {
              ha_movido_torre_negra_izqda = true;
            }
          }
          else if(torre.color === "negras" && torre.lado === "derecha") {
            if(torre.Posicion.x !== 7 || torre.Posicion.y !== 7) {
              ha_movido_torre_negra_dcha = true;
            }
          }


      
      let torreMovimientos = [{ fromX: torre.Posicion.x, fromY: torre.Posicion.y, fromColor: torre.color }];
      
      
      torreMovimientos.push(...torre.obtenerMovimientosDisponibles());
      // Llamar a la funcion de enroque
      //let movimientos_enroque = torre.obtenerMovimientosEnroque(ha_movido_rey_blanco, ha_movido_rey_negro, ha_movido_torre_blanca_izqda, ha_movido_torre_blanca_dcha,
      //  ha_movido_torre_negra_izqda, ha_movido_torre_negra_dcha, torre.color);
  
      //torreMovimientos.push(movimientos_enroque);
      
      //movimientos_disponibles_torres.push(torreMovimientos);

      console.log("TORRE BLANCA IZQDA: ", ha_movido_torre_blanca_izqda);
      console.log("TORRE BLANCA DCHA: ", ha_movido_torre_blanca_dcha);
      
      console.log("TORRE NEGRA IZQDA: ", ha_movido_torre_negra_izqda);
      console.log("TORRE NEGRA DCHA: ", ha_movido_torre_negra_dcha);
    });


    // Comprobar movimientos disponibles del rey
    const reyes = modifiedChessboardState.reyes.map(rey => new Rey(rey.x, rey.y, rey.color, tablero));
    const movimientos_disponibles_reyes = [];
    reyes.forEach(rey => {
      if(rey.color === "blancas") {
        if(rey.Posicion.x !== 4 || rey.Posicion.y !== 0) {
          if(!ha_movido_rey_blanco) {
            ha_movido_rey_blanco = true;
          }
        }
      }
      else {
        if(rey.Posicion.x !== 4 || rey.Posicion.y !== 7) {
          if(!ha_movido_rey_negro) {
            ha_movido_rey_negro = true;
          }
        }
      }
      if (turno === rey.color) {
        
        // Add the king's position to the array
        movimientos_disponibles_reyes.push({ fromX: rey.Posicion.x, fromY: rey.Posicion.y, fromColor: rey.color});

        // Add the king's available movements to the array
        movimientos_disponibles_reyes.push(...rey.obtenerMovimientosDisponibles());
        if (rey.enroque(ha_movido_rey_blanco, ha_movido_rey_negro, ha_movido_torre_blanca_dcha, ha_movido_torre_blanca_izqda, ha_movido_torre_negra_dcha,
          ha_movido_torre_blanca_izqda, turno, 'corto')){
            const x = 6;
            const y = rey.Posicion.y;
            movimientos_disponibles_reyes.push({x, y});
        }
        if (rey.enroque(ha_movido_rey_blanco, ha_movido_rey_negro, ha_movido_torre_blanca_dcha, ha_movido_torre_blanca_izqda, ha_movido_torre_negra_dcha,
          ha_movido_torre_blanca_izqda, turno, 'largo')){
            const x = 2;
            const y = rey.Posicion.y;
            movimientos_disponibles_reyes.push({x, y});
          }
        // Check if the king is in check
        estaEnJaque = rey.jaque(rey)[0];
        console.log("Estoy en jaque: ", estaEnJaque);
        console.log("REY BLANCO: ", ha_movido_rey_blanco);
        console.log("REY NEGRO: ", ha_movido_rey_negro);

    }
    });
    console.log("Movimientos rey: ", movimientos_disponibles_reyes);
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
        else {
          if(dama.color !== turno) {
            // DAMA ES EL QUE COME
            return new Torre(dama.x, dama.y, dama.color, tablero);
          }
          else {
            // DAMA ES EL COMIDO
            return null;
          }
        }
      }).filter(dama => dama !== null);
      
      let movimientos_disponibles_damas = [];
      // Add the king's position to the array
      damas.forEach(dama => {
      // Create a new list for each caballo
      let damaMovimientos = [{ fromX: dama.Posicion.x, fromY: dama.Posicion.y, fromColor: dama.color }];
      
      // Append movements to the new list
      damaMovimientos.push(...dama.obtenerMovimientosDisponibles());
  
      // Append the new list to the main list
      movimientos_disponibles_damas.push(damaMovimientos);

    });
    
    let allMovements = {
        reyes: movimientos_disponibles_reyes,
        peones: movimientos_disponibles_peones,
        caballos: movimientos_disponibles_caballos,
        alfiles: movimientos_disponibles_alfiles,
        torres: movimientos_disponibles_torres,
        damas: movimientos_disponibles_damas
    };
    res.json({allMovements});
    reyes.forEach(rey => {
      rey.jaqueMate(rey, allMovements);
  });
  //}
  // else {
  //   //LOGICA COMER PIEZA QUE DA JAQUE O PONER PIEZA EN MEDIO
  //   const allMovements = {
  //     reyes: movimientos_disponibles_reyes
  //   };
  //   console.log("Estoy en jaque");
  //   reyes.forEach(rey => {
  //     rey.jaqueMate(rey, allMovements);
  // });
  //   res.json({allMovements});
  // }
  
});


// Ruta /play/select_mode, para que el usuario pueda elegir si jugar bullet, blitz o rapid
router.post("/select_mode/:id", (req, res) => {

})

module.exports = router;