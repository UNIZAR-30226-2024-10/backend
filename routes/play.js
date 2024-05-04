const express = require("express")
const Tablero = require('../Tablero.js');
const Rey = require('../piezas/Rey');
const Peon = require('../piezas/Peon');
const Caballo = require('../piezas/Caballo');
const Alfil = require('../piezas/Alfil');
const Torre = require('../piezas/Torre');
const Dama = require('../piezas/Dama');
const pool = require('../db');

const router = express.Router();

function getLastIndex(arrayLike) {
  let highestIndex = -1;
  for (const key in arrayLike) {
      if (arrayLike.hasOwnProperty(key)) {
          const index = parseInt(key);
          if (!isNaN(index) && index > highestIndex) {
              highestIndex = index;
          }
      }
  }
  return highestIndex;
}

function drawOnlyKings(jsonData) {
  // Check if the only pieces on the chessboard are kings
  return jsonData.dama.length === 0 &&
         jsonData.torre.length === 0 &&
         jsonData.alfil.length === 0 &&
         jsonData.caballo.length === 0 &&
         jsonData.peon.length === 0;
}

function drawOnlyKingsAndBishop(jsonData) {
  
  return jsonData.alfil.length === 1 &&
         jsonData.dama.length === 0 &&
         jsonData.torre.length === 0 &&
         jsonData.caballo.length === 0 &&
         jsonData.peon.length === 0;
  
}

function drawOnlyKingsAndKnight(jsonData) {
  
  return jsonData.caballo.length === 1 &&
         jsonData.dama.length === 0 &&
         jsonData.torre.length === 0 &&
         jsonData.alfil.length === 0 &&
         jsonData.peon.length === 0;
  
}

// Hay que retocarla
function convertirJSONaFEN(jsonData) {
  let fen = '';

    // Piece placement
    for (let y = 7; y >= 0; y--) {
        let emptyCount = 0;
        for (let x = 0; x < 8; x++) {
            let piece = '';
            for (let key in jsonData) {
                if (jsonData.hasOwnProperty(key) && Array.isArray(jsonData[key])) {
                    for (let square of jsonData[key]) {
                        if (square.x === x && square.y === y) {
                            if(key === 'peon') {
                                piece = square.color === 'blancas' ? 'P' : 'p';
                            }
                            else if(key === 'alfil') {
                                piece = square.color === 'blancas' ? 'B' : 'b';
                            }
                            else if(key === 'torre') {
                                piece = square.color === 'blancas' ? 'R' : 'r';
                            }
                            else if(key === 'caballo') {
                                piece = square.color === 'blancas' ? 'N' : 'n';
                            }
                            else if(key === 'dama') {
                                piece = square.color === 'blancas' ? 'Q' : 'q';
                            }
                            else if(key === 'rey') {
                                piece = square.color === 'blancas' ? 'K' : 'k';
                            }
                        }
                    }
                }
            }
            if (piece === '') {
                emptyCount++;
            } else {
                if (emptyCount > 0) {
                    fen += emptyCount;
                    emptyCount = 0;
                }
                fen += piece;
            }
        }
        if (emptyCount > 0) {
            fen += emptyCount;
        }
        if (y > 0) {
            fen += '/';
        }
    }

    // Other FEN fields (turn, castling availability, etc.)
    //fen += ' ' + jsonData.turno.charAt(0); // Active color
    let turno = jsonData.turno === 'blancas' ? 'w' : 'b';
    fen += ' ' + turno;

    let puedeEnroqueBlanco = '';
    let puedeEnroqueNegro = '';
    if(!jsonData.ha_movido_rey_blanco && !jsonData.ha_movido_torre_blanca_dcha) {
        puedeEnroqueBlanco += 'K';
    }
    if(!jsonData.ha_movido_rey_blanco && !jsonData.ha_movido_torre_blanca_izqda) {
        puedeEnroqueBlanco += 'Q';
    }

    if(!jsonData.ha_movido_rey_negro && !jsonData.ha_movido_torre_negra_dcha) {
      puedeEnroqueNegro += 'k';
    }

    if(!jsonData.ha_movido_rey_negro && !jsonData.ha_movido_torre_negra_izqda) {
      puedeEnroqueNegro += 'q';
    }

    fen += ' ' + puedeEnroqueBlanco;
    fen += puedeEnroqueNegro;

    fen += ' -'; // Valores por defecto, no los tocamos
    fen += ' 0 1'; // Valores por defecto, no los tocamos

    return fen;
}

function convertirFENaJSON(fen) {
  const fenObject = {
      "turno": "",
      "ha_movido_rey_blanco": true,
      "ha_movido_rey_negro": true,
      "ha_movido_torre_blanca_dcha": true,
      "ha_movido_torre_blanca_izqda": true,
      "ha_movido_torre_negra_dcha": true,
      "ha_movido_torre_negra_izqda": true,
      "peon": [],
      "alfil": [],
      "caballo": [],
      "torre": [],
      "dama": [],
      "rey": []
  };

  const [piecesPlacement, activeColor, castlingAvailability] = fen.split(' ');

  // Parse piece placement
  let rank = 7;
  let file = 0;
  for (const char of piecesPlacement) {
      if (char === '/') {
          rank--;
          file = 0;
      } else if (isNaN(parseInt(char))) {
          let color = char === char.toUpperCase() ? 'blancas' : 'negras';


          let pieceType = char.toLowerCase();
          if(pieceType === 'p') {
            pieceType = 'peon';
          }
          else if(pieceType === 'b') {
            pieceType = 'alfil';
          }
          else if(pieceType === 'r') {
            pieceType = 'torre';
          }
          else if(pieceType === 'n') {
            pieceType = 'caballo';
          }
          else if(pieceType === 'q') {
            pieceType = 'dama';
          }
          else if(pieceType === 'k') {
            pieceType = 'rey';
          }


          if (!fenObject[pieceType]) fenObject[pieceType] = []; // Initialize array if not exists
          fenObject[pieceType].push({"x": file, "y": rank, "color": color});
          file++;
      } else {
          file += parseInt(char);
      }
  }

  // Parse active color
  fenObject.turno = activeColor === 'w' ? 'blancas' : 'negras';

  // Parse castling availability
  if (castlingAvailability.includes('K')) {
      fenObject.ha_movido_rey_blanco = false;
      fenObject.ha_movido_torre_blanca_dcha = false;
  }
  if (castlingAvailability.includes('Q')) {
    fenObject.ha_movido_rey_blanco = false;
    fenObject.ha_movido_torre_blanca_izqda = false;
  }
  if (castlingAvailability.includes('k')) {
    fenObject.ha_movido_rey_negro = false;
    fenObject.ha_movido_torre_negra_dcha = false;
  }
  if (castlingAvailability.includes('q')) {
    fenObject.ha_movido_rey_negro = false;
    fenObject.ha_movido_torre_negra_izqda = false;
  }
  return fenObject;
}





router.post("/", (req, res) => {

    const tablero = new Tablero('./ChessHub.db');

    // LEER INFORMACIÓN DEL MENSAJE JSON
    let modifiedChessboardState = req.body;

    let tableroFen = convertirJSONaFEN(modifiedChessboardState);

    console.log("Estado del tablero 1: ", tableroFen);

    let tableroJSOn = convertirFENaJSON(tableroFen);

    console.log("Estado del tablero 2: ", tableroJSOn);

    tablero.actualizarTablero(modifiedChessboardState);
    
    let turno = modifiedChessboardState.turno;
    

    let ha_movido_rey_blanco = modifiedChessboardState.ha_movido_rey_blanco;
    let ha_movido_rey_negro = modifiedChessboardState.ha_movido_rey_negro;
    let ha_movido_torre_blanca_dcha = modifiedChessboardState.ha_movido_torre_blanca_dcha;
    let ha_movido_torre_blanca_izqda = modifiedChessboardState.ha_movido_torre_blanca_izqda;
    let ha_movido_torre_negra_dcha = modifiedChessboardState.ha_movido_torre_negra_dcha;
    let ha_movido_torre_negra_izqda = modifiedChessboardState.ha_movido_torre_negra_izqda; 

    const pieceArrays = [
        modifiedChessboardState.peon,
        modifiedChessboardState.alfil,
        modifiedChessboardState.torre,
        modifiedChessboardState.caballo,
        modifiedChessboardState.dama,
        modifiedChessboardState.rey
    ];

    // El estado del tablero proviene de una jugada legal hasta que se demuestre lo contrario
    let jugadaLegal = true;
    
    // Si existen dos piezas en la misma casilla, significa que una ha comido a la otra
    let conflictingPieces = [];
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


    // Comprobar movimientos disponibles del rey
    const reyes = modifiedChessboardState.rey.map(rey => new Rey(rey.x, rey.y, rey.color, tablero));
    const movimientos_disponibles_reyes = [];
    const movimientos_disponibles_comer_pieza_jaque = [];
    const movimientos_disponibles_bloquear_jaque = [];
    let responseSent = false;

  
    reyes.forEach(rey => {
      if (rey.color === turno){
          
          const reyMovimientos = [{ fromX: rey.Posicion.x, fromY: rey.Posicion.y, fromColor: rey.color }];
          
          
          console.log("Movimientos del rey:", rey.obtenerMovimientosDisponibles());
          reyMovimientos.push(...rey.obtenerMovimientosDisponibles());
      
        
        
        if (rey.enroque(ha_movido_rey_blanco, ha_movido_rey_negro, ha_movido_torre_blanca_dcha, ha_movido_torre_blanca_izqda, ha_movido_torre_negra_dcha,
          ha_movido_torre_negra_izqda, turno, 'corto')){
            const x = 6;
            const y = rey.Posicion.y;
            reyMovimientos.push({x, y});
        }
        if (rey.enroque(ha_movido_rey_blanco, ha_movido_rey_negro, ha_movido_torre_blanca_dcha, ha_movido_torre_blanca_izqda, ha_movido_torre_negra_dcha,
          ha_movido_torre_negra_izqda, turno, 'largo')){
            console.log("Me enroco en largo");
            const x = 2;
            const y = rey.Posicion.y;
            reyMovimientos.push({x, y});
          }
        movimientos_disponibles_reyes.push(reyMovimientos);
        console.log(movimientos_disponibles_reyes);


        estaEnJaque = rey.jaque(rey);
        console.log("Estoy en jaque: ", estaEnJaque, rey.color);
        let jaque_mate = false;
        if(estaEnJaque) {
          console.log("Color de rey en jaque: ", rey.color);
          rey.estoy_en_jaque = true;
          if(turno !== rey.color) {
            jugadaLegal = false;
          }
          //Si el rey esta en jaque solo devolvemos los movimientos del rey, ponerse en medio o comerse la pieza
          else {
            
            const posicionesAtacadas = rey.obtenerPosicionesAtacadasPorOponenteFormato(rey.color);
            
            const coordenadasDesdeJaque = rey.getCasillaDesdeJaque(rey, posicionesAtacadas);
            const {fromX, fromY} = coordenadasDesdeJaque;
            const piezaQueDaJaque = rey.getPiezaEnCasilla(fromX, fromY);
            const namePiezaQueDaJaque= piezaQueDaJaque.getClassName();
            // Obtener las piezas que pueden comerse la pieza que está dando jaque
            let colorOponente;
            if (rey.color == 'blancas'){
              colorOponente = 'negras';
            }
            else {
              colorOponente = 'blancas';
            }
            const movimientosDisponibles = rey.obtenerPosicionesAtacadasPorOponenteFormato(colorOponente);
            //console.log("Movimiento disponibles ", movimientosDisponibles);
            piezasComedoras = rey.puedeComerPieza(coordenadasDesdeJaque, movimientosDisponibles);
            console.log("Pieza que puede comer ", piezasComedoras);
            let comerMovimientos = {
              peon: [],
              alfil: [],
              caballo: [],
              torre: [],
              dama: []
            };
            if (piezasComedoras !== null){
              piezasComedoras.forEach(pieza => {
                const { tipo, ...resto } = pieza;
                comerMovimientos[tipo].push(resto);
              });
            }
            // Obtener las piezas que pueden ponerse en medio
            piezasBloqueantes = rey.sePuedePonerEnMedio(coordenadasDesdeJaque, rey, movimientosDisponibles);
            console.log("Piezas bloqueantes", piezasBloqueantes);
            //movimientos_disponibles_reyes.push(...rey.obtenerMovimientosDisponibles());
            movimientos_disponibles_comer_pieza_jaque.push(comerMovimientos);
            movimientos_disponibles_bloquear_jaque.push(piezasBloqueantes);
          }
          console.log("Movimientos rey: ", movimientos_disponibles_reyes);
          console.log("Longitud movs: ", movimientos_disponibles_reyes[0].length);
          console.log("Longitud movs bloquear:", Object.keys(movimientos_disponibles_bloquear_jaque[0]).length);
          console.log("Longitud movs comer: ", movimientos_disponibles_comer_pieza_jaque + " " + movimientos_disponibles_comer_pieza_jaque[0].caballo.length);
          if (movimientos_disponibles_reyes[0].length === 1 && movimientos_disponibles_comer_pieza_jaque[0].caballo.length === 0 &&
            movimientos_disponibles_comer_pieza_jaque[0].peon.length === 0 && movimientos_disponibles_comer_pieza_jaque[0].alfil.length === 0
           && movimientos_disponibles_comer_pieza_jaque[0].torre.length === 0 && movimientos_disponibles_comer_pieza_jaque[0].dama.length === 0
          && Object.keys(movimientos_disponibles_bloquear_jaque[0]).length === 0){
            res.json({"Jaque mate": true});
            responseSent = true;
          }
          else {
          let jaque = true;
          let allMovements = {
            rey: movimientos_disponibles_reyes,
            comer: movimientos_disponibles_comer_pieza_jaque,
            bloquear: movimientos_disponibles_bloquear_jaque
          }
          console.log("Movimientos disponibles: ", allMovements);
          
          if (!responseSent){
            res.json({jugadaLegal, jaque, allMovements});
            responseSent = true;
          }
        }
        }
      }
    });

  // Si el rey no está en jaque, devolvemos los movimientos de todas las piezas
  if (!estaEnJaque){

    // -------------------------- MOVIMIENTOS DISPONIBLES DE LOS PEONES --------------------------
    const peones = modifiedChessboardState.peon.map(peon => {
        
        // Comprobar si ha habido peón involucrado en una captura
        const isConflicting = conflictingPieces.some(conflictingPiece => 
          peon.x === conflictingPiece.piece1.x && peon.y === conflictingPiece.piece1.y
        );
        if (!isConflicting) {
          return new Peon(peon.x, peon.y, peon.color, tablero);
        }
        // Ha habido captura con peón involucrado
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
      

      peones.forEach(peon => {
        //if (peon.color === "turno"){
          const peonMovimientos = [{ fromX: peon.Posicion.x, fromY: peon.Posicion.y, fromColor: peon.color }];
          
          
          peonMovimientos.push(...peon.obtenerMovimientosDisponibles());
      
          
          movimientos_disponibles_peones.push(peonMovimientos);
        //}
      });


    // -------------------------- MOVIMIENTOS DISPONIBLES DE LOS CABALLOS --------------------------
    const caballos = modifiedChessboardState.caballo.map(caballo => {

        // Comprobar si ha habido caballo involucrado en una captura
        const isConflicting = conflictingPieces.some(conflictingPiece => 
            caballo.x === conflictingPiece.piece1.x && caballo.y === conflictingPiece.piece1.y
        );
      
        
        if (!isConflicting) {
          return new Caballo(caballo.x, caballo.y, caballo.color, tablero);
        }
        // Ha habido captura con caballo involucrado
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
        if (caballo.color === turno){
          const caballoMovimientos = [{ fromX: caballo.Posicion.x, fromY: caballo.Posicion.y, fromColor: caballo.color }];
          
          
          caballoMovimientos.push(...caballo.obtenerMovimientosDisponibles(false));
          console.log("Movimientos caballooooooo", caballoMovimientos);
      
          
          movimientos_disponibles_caballos.push(caballoMovimientos);
        }
    });
    

    // -------------------------- MOVIMIENTOS DISPONIBLES DE LOS ALFILES --------------------------
    const alfiles = modifiedChessboardState.alfil.map(alfil => {
        
        // Comprobar si ha habido alfil involucrado en una captura
        const isConflicting = conflictingPieces.some(conflictingPiece => 
            alfil.x === conflictingPiece.piece1.x && alfil.y === conflictingPiece.piece1.y
        );
      
        if (!isConflicting) {
          return new Alfil(alfil.x, alfil.y, alfil.color, tablero);
        }
        // Ha habido captura con alfil involucrado
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
      
      alfiles.forEach(alfil => {
      if (alfil.color === turno){
      const alfilMovimientos = [{ fromX: alfil.Posicion.x, fromY: alfil.Posicion.y, fromColor: alfil.color }];
      
      
      alfilMovimientos.push(...alfil.obtenerMovimientosDisponibles(false));
  
      movimientos_disponibles_alfiles.push(alfilMovimientos);
      }
    });

    // -------------------------- MOVIMIENTOS DISPONIBLES DE LAS TORRES --------------------------
    const torres = modifiedChessboardState.torre.map(torre => {
        
        // Comprobar si ha habido torre involucrada en una captura
        const isConflicting = conflictingPieces.some(conflictingPiece =>
            torre.x === conflictingPiece.piece1.x && torre.y === conflictingPiece.piece1.y
        );
      
        if (!isConflicting) {
          return new Torre(torre.x, torre.y, torre.color, tablero);
        }
        // Ha habido captura con torre involucrada
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

      
      torres.forEach(torre => {
        if (torre.color === turno){
          let torreMovimientos = [{ fromX: torre.Posicion.x, fromY: torre.Posicion.y, fromColor: torre.color }];
          
          //console.log("Movimientos de la torre", torre.obtenerMovimientosDisponibles());
          torreMovimientos.push(...torre.obtenerMovimientosDisponibles(false));
          
          movimientos_disponibles_torres.push(torreMovimientos);
        }
    });

    
    // -------------------------- MOVIMIENTOS DISPONIBLES DE LAS DAMAS --------------------------
    const damas = modifiedChessboardState.dama.map(dama => {
        
        // Comprobar si ha habido dama involucrada en una captura
        const isConflicting = conflictingPieces.some(conflictingPiece => 
            dama.x === conflictingPiece.piece1.x && dama.y === conflictingPiece.piece1.y
        );
        
        if (!isConflicting) {
          return new Dama(dama.x, dama.y, dama.color, tablero);
        }
        else {
          // Ha habido captura con dama involucrada
          if(dama.color !== turno) {
            // DAMA ES EL QUE COME
            return new Dama(dama.x, dama.y, dama.color, tablero);
          }
          else {
            // DAMA ES EL COMIDO
            return null;
          }
        }
      }).filter(dama => dama !== null);

      let movimientos_disponibles_damas = [];
        
    damas.forEach(dama => {
        if (dama.color === turno){
          let damaMovimientos = [{ fromX: dama.Posicion.x, fromY: dama.Posicion.y, fromColor: dama.color }];
          
          damaMovimientos.push(...dama.obtenerMovimientosDisponibles(false));
          
          
          movimientos_disponibles_damas.push(damaMovimientos);
        }
    });

    // Comprobar si el tablero pertenece a una configuración de tablas
    if(drawOnlyKings(modifiedChessboardState) || drawOnlyKingsAndBishop(modifiedChessboardState) || drawOnlyKingsAndKnight(modifiedChessboardState)){
      res.json({"tablas": true});
    }
    else if (movimientos_disponibles_reyes.length === 1 && movimientos_disponibles_peones.length < 2 && movimientos_disponibles_caballos.length < 2
      && movimientos_disponibles_alfiles.length < 2 && movimientos_disponibles_torres.length < 2 && movimientos_disponibles_damas.length < 2){
      res.json({"Rey ahogado": true});
    }
    else {
      let allMovements = {

        rey: movimientos_disponibles_reyes,
        peon: movimientos_disponibles_peones,
        caballo: movimientos_disponibles_caballos,
        alfil: movimientos_disponibles_alfiles,
        torre: movimientos_disponibles_torres,
        dama: movimientos_disponibles_damas
      };

      let jaque = false;
      
      if (!responseSent){
        res.json({jugadaLegal, jaque, allMovements});
        responseSent = true;
      }
    }
  }

    /*reyes.forEach(rey => {
      if(rey.estoy_en_jaque) {
          jaque_mate = rey.jaqueMate(rey, allMovements);
          console.log("Es mate: ", jaque_mate);
          res.json({"jaqueMate": true});

      }

      // COMPROBACION AWS 24
  });*/
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


module.exports = router;