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
                if (pieza !== null && pieza.getColor() !== color) {
                    piezas.push(pieza);
                }
            }
        }

        return piezas;
    }

    obtenerPosicionesAtacadasPorOponente(colorRey) {
        let posicionesAtacadasPorOponente = [];
        const colorOponente = colorRey === 'blancas' ? 'negras' : 'blancas';
        console.log("Color oponenete", colorOponente);
        const piezasOponente = this.obtenerPiezas(colorRey);
        console.log("Piezas del oponente ", piezasOponente);
        piezasOponente.forEach(pieza => {
            if (pieza instanceof Caballo || pieza instanceof Alfil || pieza instanceof Torre || pieza instanceof Dama) {
                //console.log("Tengo ", pieza.obtenerMovimientosDisponibles());
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
                            if (casilla !== undefined && casilla.getPieza() === null) {
                                posicionesAtacadasPorOponente.push({ x, y });
                            }
                        }
                    }
                }

            }
        });
        //console.log("Movimientos oponente ", posicionesAtacadasPorOponente);
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
                    if (casilla !== undefined && casilla.getPieza() === null) {
                        movimientos_disponibles_rey.push({ x, y });
                    }
                }
            }
        }

        console.log("Movimientos disponibles rey antes de comprobar jaques: ", movimientos_disponibles_rey);

    
        // Filtrar los movimientos que resulten en jaque
        console.log("color ", this.color);
        const posicionesAtacadasPorOponente = this.obtenerPosicionesAtacadasPorOponente(this.color);
        console.log("Movimientos oponente que dan jaque: ", posicionesAtacadasPorOponente);
        const casillasAtacadas = posicionesAtacadasPorOponente.map(movimiento => ({ x: movimiento.x, y: movimiento.y }));
        const movimientosSinJaque = movimientos_disponibles_rey.filter(movimiento => {
            const x = movimiento.x;
            const y = movimiento.y;
            return !this.movimientoCoincideConCasilla(casillasAtacadas, x, y);
        });
    
        return movimientosSinJaque;
    }
    

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