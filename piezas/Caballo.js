const Tablero = require('../Tablero.js'); // Asegúrate de importar correctamente Tablero.js
const Pieza = require('./Pieza.js'); // Asegúrate de importar correctamente Pieza.js

class Caballo {
    constructor(x, y, color, tablero) {
        this.Posicion = {x, y};
        this.color = color;
        this.tablero = tablero;
    }

    getClassName() {
        return this.constructor.name;
    }

    obtenerMovimientosDisponibles() {
        const movimientos_disponibles_caballo = [];

        const casillas = this.tablero.getCasillas();
        let casilla;
        if (this.isValidIndex(this.Posicion.x + 1, this.Posicion.y + 2, 8, 8)) {
            casilla = casillas[this.Posicion.x + 1][this.Posicion.y + 2];
            if (casilla !== undefined && casilla !== null && casilla.getPieza() === null) {
                this._agregarMovimiento(this.Posicion.x + 1, this.Posicion.y + 2, movimientos_disponibles_caballo);
            }
        }
        
        if (this.isValidIndex(this.Posicion.x + 2, this.Posicion.y + 1, 8, 8)) {
            casilla = casillas[this.Posicion.x + 2][this.Posicion.y + 1];
            if (casilla !== undefined && casilla !== null && casilla.getPieza() === null) {
                this._agregarMovimiento(this.Posicion.x + 2, this.Posicion.y + 1, movimientos_disponibles_caballo);
            }
        }

        if (this.isValidIndex(this.Posicion.x - 1, this.Posicion.y + 2, 8, 8)) {
            casilla = casillas[this.Posicion.x - 1][this.Posicion.y + 2];
            if (casilla !== undefined && casilla !== null && casilla.getPieza() === null) {
                this._agregarMovimiento(this.Posicion.x - 1, this.Posicion.y + 2, movimientos_disponibles_caballo);
            }
        }

        if (this.isValidIndex(this.Posicion.x - 2, this.Posicion.y + 1, 8, 8)) {
            casilla = casillas[this.Posicion.x - 2][this.Posicion.y + 1];
            if (casilla !== undefined && casilla !== null && casilla.getPieza() === null) {
                this._agregarMovimiento(this.Posicion.x - 2, this.Posicion.y + 1, movimientos_disponibles_caballo);
            }
        }
  
        if (this.isValidIndex(this.Posicion.x - 1, this.Posicion.y - 2, 8, 8)) {
            casilla = casillas[this.Posicion.x - 1][this.Posicion.y - 2];
            if (casilla !== undefined && casilla !== null && casilla.getPieza() === null) {
                this._agregarMovimiento(this.Posicion.x + 1, this.Posicion.y + 2, movimientos_disponibles_caballo);
            }
        }

        if (this.isValidIndex(this.Posicion.x - 2, this.Posicion.y - 1, 8, 8)) {
            casilla = casillas[this.Posicion.x - 2][this.Posicion.y - 1];
            if (casilla !== undefined && casilla !== null && casilla.getPieza() === null) {
                this._agregarMovimiento(this.Posicion.x - 2, this.Posicion.y - 1, movimientos_disponibles_caballo);
            }
        }

        if (this.isValidIndex(this.Posicion.x + 1, this.Posicion.y - 2, 8, 8)) {
            casilla = casillas[this.Posicion.x + 1][this.Posicion.y - 2];
            if (casilla !== undefined && casilla !== null && casilla.getPieza() === null) {
                this._agregarMovimiento(this.Posicion.x + 1, this.Posicion.y - 2, movimientos_disponibles_caballo);
            }
        }
        if (this.isValidIndex(this.Posicion.x + 2, this.Posicion.y - 1, 8, 8)) {
            casilla = casillas[this.Posicion.x + 2][this.Posicion.y - 1];
            if (casilla !== undefined && casilla !== null && casilla.getPieza() === null) {
                this._agregarMovimiento(this.Posicion.x + 2, this.Posicion.y - 1, movimientos_disponibles_caballo);
            }
        }

        return movimientos_disponibles_caballo;
    }

    imprimirMovimientosDisponibles() {
        const movimientos = this.obtenerMovimientosDisponibles();
        console.log("Movimientos disponibles del caballo:");
        movimientos.forEach(movimiento => {
            console.log(`(${movimiento.x}, ${movimiento.y})`);
        });
    }

    _agregarMovimiento(x, y, movimientos) {
        if (this._esMovimientoValido(x, y)) {
            movimientos.push({ x, y });
        }
    }

    isValidIndex (x, y, numRows, numCols){
        let isValid = x >= 0 && x < numRows && y >= 0 && y < numCols;
        return isValid;
    };

    _esMovimientoValido(x, y) {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
}

module.exports = Caballo;