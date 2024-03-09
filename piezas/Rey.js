const Tablero = require('../Tablero.js'); // Asegúrate de importar correctamente Tablero.js
const Pieza = require('./Pieza.js'); // Asegúrate de importar correctamente Pieza.js
const Peon = require('../piezas/Peon');
const Caballo = require('../piezas/Caballo');
const Alfil = require('../piezas/Alfil');
const Torre = require('../piezas/Torre');
const Dama = require('../piezas/Dama');

//const Posicion = require('./Posicion.js'); // Asegúrate de importar correctamente Posicion.js

class Rey {
    constructor(x, y, color, tablero) {
        this.Posicion = {x, y};
        this.color = color;
        this.tablero = tablero;
        this.estoy_en_jaque = false;
    }
    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }

    getPosicion() {
        return this.Posicion;
    }

    setPosicion(Posicion) {
        this.Posicion = Posicion;
    }


    getClassName() {
        return this.constructor.name;
    }

    obtenerPiezas(color) {
        const piezas = [];
        const casillas = this.tablero.getCasillas();
        // Recorre todas las casillas del tablero
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                const casilla = casillas[x][y];
                const pieza = casilla.getPieza();
                
                // Si la casilla contiene una pieza y es del color especificado, agrégala a la lista de piezas
                if (pieza !== null && pieza.getColor() === color) {
                    piezas.push(pieza);
                }
            }
        }

        return piezas;
    }

    obtenerPosicionesAtacadasPorOponente(colorRey) {
        let posicionesAtacadasPorOponente = [];
        const colorOponente = colorRey === 'blancas' ? 'negras' : 'blancas';
        const piezasOponente = this.obtenerPiezas(colorOponente);
        piezasOponente.forEach(pieza => {
            if (pieza instanceof Caballo || pieza instanceof Alfil || pieza instanceof Torre || pieza instanceof Dama) {
                
                const movimientosDisponibles = pieza.obtenerMovimientosDisponibles();
                posicionesAtacadasPorOponente.push(...movimientosDisponibles);
            }
            else if (pieza instanceof Peon){
                if (pieza.color == 'blancas'){
                    const x1 = pieza.Posicion.x - 1;
                    const y1 = pieza.Posicion.y + 1;
                    const x2 = pieza.Posicion.x + 1;
                    const y2 = pieza.Posicion.y + 1;
        
                    if (pieza._esMovimientoValido(x1, y1)) {
                        posicionesAtacadasPorOponente.push({ x: x1, y: y1 });
                    }
        
                    if (pieza._esMovimientoValido(x2, y2)) {
                        posicionesAtacadasPorOponente.push({ x: x2, y: y2 });
                    }
                }
                else {
                    const x3 = pieza.Posicion.x - 1;
                    const y3 = pieza.Posicion.y - 1;
                    const x4 = pieza.Posicion.x + 1;
                    const y4 = pieza.Posicion.y - 1;
                    if (pieza._esMovimientoValido(x3, y3)) {
                        posicionesAtacadasPorOponente.push({ x: x3, y: y3 });
                    }
        
                    if (pieza._esMovimientoValido(x4, y4)) {
                        posicionesAtacadasPorOponente.push({ x: x4, y: y4 });
                    }
                }
            }
            else if (pieza instanceof Rey){
                const casillas = pieza.tablero.getCasillas();
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue; // No considerar el movimiento de estar en el mismo lugar
            
                        const x = pieza.Posicion.x + dx;
                        const y = pieza.Posicion.y + dy;
            
                        if (pieza._esMovimientoValido(x, y)) {
                            const casilla = casillas[x][y];
                            if (casilla !== undefined) {
                                posicionesAtacadasPorOponente.push({ x, y });
                            }
                        }
                    }
                }

            }
        });
        return posicionesAtacadasPorOponente;
    }
    
    
    
    movimientoCoincideConCasilla(movimientos, x, y) {
        return movimientos.some(movimiento => movimiento.x === x && movimiento.y === y);
    }
    obtenerMovimientosDisponibles() {
        const movimientos_disponibles_rey = [];
        const casillas = this.tablero.getCasillas();
        
        // Obtener todos los movimientos disponibles del rey
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue; // No considerar el movimiento de estar en el mismo lugar
    
                const x = this.Posicion.x + dx;
                const y = this.Posicion.y + dy;
    
                if (this._esMovimientoValido(x, y)) {
                    const casilla = casillas[x][y];
                    if (casilla !== undefined && casilla !== null) {
                        if (casilla.getPieza() === null) {
                            movimientos_disponibles_rey.push({ x, y });
                        } else {
                            if (casilla.getPieza().getColor() !== this.color) {
                                movimientos_disponibles_rey.push({ x, y});
                            }
                            break;
                        }
                    }
                }
            }
        }
    
    
        // Filtrar los movimientos que resulten en jaque
        console.log("color ", this.color);
        const posicionesAtacadasPorOponente = this.obtenerPosicionesAtacadasPorOponente(this.color);
        const casillasAtacadas = posicionesAtacadasPorOponente.map(movimiento => ({ x: movimiento.x, y: movimiento.y }));
        const movimientosSinJaque = movimientos_disponibles_rey.filter(movimiento => {
            const x = movimiento.x;
            const y = movimiento.y;
            return !this.movimientoCoincideConCasilla(casillasAtacadas, x, y);
        });
        return movimientosSinJaque;
    }
    
    jaque(pieza) {
        const posicionesAtacadasPorOponente = this.obtenerPosicionesAtacadasPorOponente(pieza.color);
        return this.movimientoCoincideConCasilla(posicionesAtacadasPorOponente, pieza.Posicion.x, pieza.Posicion.y);
    }

    puedo_comer_a_la_que_hace_jaque(pieza, movimientos_disponibles_oponente) {

    }

    jaqueMate(pieza, movimientos_disponibles_oponente) {
        console.log("Movimientos disponibles del oponente: ", movimientos_disponibles_oponente);
        let jaque_mate = true; // Si hay jaque, es jaque mate hasta que se demuestre lo contrario
        let coordenadasDesdeJaque;
        console.log("COORDENADAS REY: ", pieza.Posicion.x, pieza.Posicion.y);
        
        // Obtener desde dónde nos hacen jaque
        outerLoop:
        for (const piezaType in movimientos_disponibles_oponente) {
            console.log("piezaType: ", piezaType);
            let movimientosPieza = movimientos_disponibles_oponente[piezaType];
            console.log("tusabe: ", movimientosPieza);
            for (const movimiento of movimientosPieza) {
                console.log("movimiento: ", movimiento);
                if(piezaType !== "reyes") {
                    coordenadasDesdeJaque = this.getFromValues(movimiento, pieza.Posicion.x, pieza.Posicion.y);
                    console.log("coordenadasDesdeJaque: ", coordenadasDesdeJaque);
                    if (coordenadasDesdeJaque !== null) {
                        break outerLoop;
                    }
                }  
            }  
        }
        
        // Una vez tenemos desde dónde nos hacen jaque, comprobamos si podemos comer a la pieza que nos hace jaque
        if (coordenadasDesdeJaque !== null) {
            for (const piezaType in movimientos_disponibles_oponente) {
                console.log("Tipo de pieza: ", piezaType);
                const movimientosPieza = movimientos_disponibles_oponente[piezaType];
                console.log("Tipo de movimiento: ", movimientosPieza);
                for (const movimiento of movimientosPieza) {
                    console.log("Tipo de movimientooooo: ", movimiento);
                    for (const tupla of Object.entries(movimiento)) {
                        const [key, value] = tupla;
                        console.log("Valor de la tupla: ", value);
                        if (value.x === coordenadasDesdeJaque.fromX && value.y === coordenadasDesdeJaque.fromY) {
                            console.log("Encontrado tusaaaa a comel:", value, movimientosPieza);
                            jaque_mate = false;
                        }
                    }
                }
            }
        }
        return jaque_mate;
    }

    getFromValues(list, x, y) {
        for (const tuple of list) {
            console.log("Tupla: ", tuple);
            if (tuple.x === x && tuple.y === y) {
            return { fromX: list[0].fromX, fromY: list[0].fromY };
            }
        }
        return null; // Return null if no match is found
    }

    enroque(ha_movido_rey_blanco, ha_movido_rey_negro, ha_movido_torre_blanca_dcha, ha_movido_torre_blanca_izqda, ha_movido_torre_negra_dcha, ha_movido_torre_negra_izqda
        ,turno, lado) {
        // Verificar que el rey y la torre involucrada no se hayan movido
        const casillas = this.tablero.getCasillas();
        if (turno === 'blancas' && !ha_movido_rey_blanco || turno === 'negras' && !ha_movido_rey_negro) {
            // Determinar las posiciones para el enroque
            if ((lado === "corto" && turno === 'blancas' && !ha_movido_torre_blanca_dcha) || (lado === "corto" && turno === 'negras' && !ha_movido_torre_negra_dcha)) {
                if (casillas[5][this.Posicion.y].getPieza() !== null || casillas[6][this.Posicion.y].getPieza() !== null){
                    console.log("No se puede realizar el enroque: Hay piezas en el camino");
                    return false;
                }
                if (this.jaque(this)) {
                    console.log("No se puede realizar el enroque: El rey está en jaque");
                    return false;
                }
                const movimientosSinJaque = this.obtenerPosicionesAtacadasPorOponente();
                if (this.movimientoCoincideConCasilla(movimientosSinJaque, 5, this.Posicion.y) ||
                    this.movimientoCoincideConCasilla(movimientosSinJaque, 6, this.Posicion.y)) {
                    console.log("No se puede realizar el enroque: El rey pasa por una casilla bajo ataque");
                    return false;
                }

            } else if ((lado === "largo" && turno === 'blancas' && !ha_movido_torre_blanca_izqda) || (lado === "largo" && turno === "negras" && !ha_movido_torre_negra_izqda))  {
                if (casillas[3][this.Posicion.y].getPieza() !== null || casillas[2][this.Posicion.y].getPieza() !== null){
                    console.log("No se puede realizar el enroque: Hay piezas en el camino");
                    return false;
                }
                if (this.jaque(this)) {
                    console.log("No se puede realizar el enroque: El rey está en jaque");
                    return false;
                }
                const movimientosSinJaque = this.obtenerPosicionesAtacadasPorOponente(turno);
                if (this.movimientoCoincideConCasilla(movimientosSinJaque, 3, this.Posicion.y) ||
                    this.movimientoCoincideConCasilla(movimientosSinJaque, 2, this.Posicion.y)) {
                    console.log("No se puede realizar el enroque: El rey pasa por una casilla bajo ataque");
                    return false;
                }
            } else {
                console.log("Lado de enroque no válido");
                return false;
            }

            // Verificar que el rey no pase por casillas bajo ataque durante el enroque
            /*const movimientosSinJaque = this.obtenerMovimientosDisponibles();
            if (this.movimientoCoincideConCasilla(movimientosSinJaque, nuevoReyX, this.Posicion.y) ||
                this.movimientoCoincideConCasilla(movimientosSinJaque, nuevoTorreX, this.Posicion.y)) {
                console.log("No se puede realizar el enroque: El rey pasa por una casilla bajo ataque");
                return;
            }*/
            // Realizar el enroque moviendo el rey y la torre a sus nuevas posiciones
            /*const torre = casillas[torreX][torreY].getPieza();
            casillas[this.Posicion.x][this.Posicion.y].setPieza(null);
            casillas[nuevoReyX][this.Posicion.y].setPieza(this);
            this.Posicion.x = nuevoReyX;
            torre.Posicion.x = nuevoTorreX;
            casillas[torreX][torreY].setPieza(null);
            casillas[nuevoTorreX][torreY].setPieza(torre);
            console.log("Enroque realizado con éxito");*/
            return true;
        } else {
            console.log("No se puede realizar el enroque: El rey o la torre han sido movidos previamente");
        }
    }

    
    // jaqueMate(pieza, movimientos_disponibles_oponente) {
    //     let jaque_mate = false;
    //     let hay_jaque = this.jaque(pieza)[0];
    //     let piezas_del_oponente = this.jaque(pieza)[1];
    
    //     if (hay_jaque) {
    //         for (const piezaType in movimientos_disponibles_oponente) {
    //             const movimientosPieza = movimientos_disponibles_oponente[piezaType];
    
    //             for (const movimiento of movimientosPieza) {
    //                 const x = movimiento.x;
    //                 const y = movimiento.y;
    
    //                 for (const piezaa of piezas_del_oponente) {
    //                     if (piezaa.Posicion.x === x && piezaa.Posicion.y === y && movimiento.fromColor !== piezaa.color) {
    //                         // Match found, handle your logic here
    //                         console.log("Match found:", piezaa, movimiento, movimientosPieza);
    //                         jaque_mate = true; // Update the jaque_mate variable accordingly
    //                         // return jaque_mate;
    //                         // break; // Exit the inner loop once a match is found
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    
    
    

    imprimirMovimientosDisponibles() {
        const movimientos = this.obtenerMovimientosDisponibles();
        console.log("Movimientos disponibles del rey:");
        movimientos.forEach(movimiento => {
            console.log(`(${movimiento.x}, ${movimiento.y})`);
        });
    }
    _agregarMovimiento(x, y, movimientos) {
        if (this._esMovimientoValido(x, y)) {
            movimientos.push({ x, y });
        }
    }

    _esMovimientoValido(x, y) {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
}
module.exports = Rey;