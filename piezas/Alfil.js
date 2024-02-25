const Tablero = require('../Tablero.js'); // Asegúrate de importar correctamente Tablero.js
const Pieza = require('./Pieza.js'); // Asegúrate de importar correctamente Pieza.js
//const Posicion = require('./Posicion.js'); // Asegúrate de importar correctamente Posicion.js


class Alfil {
    constructor(x, y, color, tablero) {
        this.Posicion = { x, y };
        this.color = color;
        this.tablero = tablero;
    }

    getClassName() {
        return this.constructor.name;
    }

    obtenerMovimientosDisponibles() {
        const movimientos_disponibles_alfil = [];

        this._agregarMovimientosEnDiagonal(1, 1, movimientos_disponibles_alfil); // Diagonal +
        this._agregarMovimientosEnDiagonal(1, -1, movimientos_disponibles_alfil); // Diagonal -
        this._agregarMovimientosEnDiagonal(-1, 1, movimientos_disponibles_alfil); // Diagonal -
        this._agregarMovimientosEnDiagonal(-1, -1, movimientos_disponibles_alfil); // Diagonal +

        return movimientos_disponibles_alfil;
    }

    imprimirMovimientosDisponibles() {
        const movimientos = this.obtenerMovimientosDisponibles();
        console.log("Movimientos disponibles del alfil:");
        movimientos.forEach(movimiento => {
            console.log(`(${movimiento.x}, ${movimiento.y})`);
        });
    }

    _agregarMovimientosEnDiagonal(deltaX, deltaY, movimientos) {
        let k = 1;
        while (this._esMovimientoValido(this.Posicion.x + k * deltaX, this.Posicion.y + k * deltaY)) {
            movimientos.push({ x: this.Posicion.x + k * deltaX, y: this.Posicion.y + k * deltaY });
            k++;
        }
    }

    _esMovimientoValido(x, y) {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
}

module.exports = Alfil;