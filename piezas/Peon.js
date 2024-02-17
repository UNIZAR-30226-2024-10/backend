const Tablero = require('../Tablero.js'); // Asegúrate de importar correctamente Tablero.js
const Pieza = require('./Pieza.js'); // Asegúrate de importar correctamente Pieza.js
const Posicion = require('./Posicion.js'); // Asegúrate de importar correctamente Posicion.js


class Peon {
    constructor() {
        this.Posicion = {x, y};
    }

    obtenerMovimientosDisponibles() {
        const movimientos_disponibles_peon = [];

        if(this.Posicion.y == 1) {
            // Movimiento hacia adelante 2 posiciones
            this._agregarMovimiento(this.Posicion.x, this.Posicion.y + 2, movimientos_disponibles_peon);
        }
        
        // Movimiento hacia adelante
        this._agregarMovimiento(this.Posicion.x, this.Posicion.y + 1, movimientos_disponibles_peon);

        // Movimiento diagonal izquierda
        this._agregarMovimiento(this.Posicion.x - 1, this.Posicion.y + 1, movimientos_disponibles_peon);

        // Movimiento diagonal derecha
        this._agregarMovimiento(this.Posicion.x + 1, this.Posicion.y + 1, movimientos_disponibles_peon);

        return movimientos_disponibles_peon;
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