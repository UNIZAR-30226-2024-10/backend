const Tablero = require('../Tablero.js'); // Asegúrate de importar correctamente Tablero.js
const Pieza = require('./Pieza.js'); // Asegúrate de importar correctamente Pieza.js
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
                if (pieza !== null && pieza.getColor() === color) {
                    piezas.push(pieza);
                }
            }
        }

        return piezas;
    }

    obtenerMovimientosOponente(colorRey) {
        let movimientosOponente = [];
        const colorOponente = colorRey === 'blancas' ? 'negras' : 'blancas';
        const piezasOponente = this.obtenerPiezas(colorOponente);
    
        piezasOponente.forEach(pieza => {
            const movimientos = pieza.obtenerMovimientosDisponibles();
            movimientosOponente.push(...movimientos);
        });
    
        return movimientosOponente;
    }
    
    imprimirMovimientosOponente(colorRey) {
        const movimientos = this.obtenerMovimientosOponente(colorRey);
        console.log("Movimientos disponibles del oponente:");
        movimientos.forEach(movimiento => {
            console.log(`(${movimiento.x}, ${movimiento.y})`);
        });
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
    
        // Filtrar los movimientos que resulten en jaque
        const movimientos_oponente = this.obtenerMovimientosOponente(this.color); // Aquí se está usando this.color en lugar de this.colorRey
        const casillasAtacadas = movimientos_oponente.map(movimiento => ({ x: movimiento.x, y: movimiento.y }));
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