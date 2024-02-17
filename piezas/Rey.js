const Tablero = require('../Tablero.js'); // Asegúrate de importar correctamente Tablero.js
const Pieza = require('./Pieza.js'); // Asegúrate de importar correctamente Pieza.js
const Posicion = require('./Posicion.js'); // Asegúrate de importar correctamente Posicion.js


class Rey {
    constructor(x, y) {
        this.Posicion = {x, y};
    }

    obtenerMovimientosDisponibles() {
        const movimientos_disponibles_rey = [];
        this._agregarMovimiento(this.Posicion.x + 1, this.Posicion.y, movimientos_disponibles_rey);
        this._agregarMovimiento(this.Posicion.x + 1, this.Posicion.y + 1, movimientos_disponibles_rey);
        this._agregarMovimiento(this.Posicion.x, this.Posicion.y + 1, movimientos_disponibles_rey);
        this._agregarMovimiento(this.Posicion.x - 1, this.Posicion.y + 1, movimientos_disponibles_rey);
        this._agregarMovimiento(this.Posicion.x - 1, this.Posicion.y, movimientos_disponibles_rey);
        this._agregarMovimiento(this.Posicion.x - 1, this.Posicion.y - 1, movimientos_disponibles_rey);
        this._agregarMovimiento(this.Posicion.x, this.Posicion.y - 1, movimientos_disponibles_rey);
        this._agregarMovimiento(this.Posicion.x + 1, this.Posicion.y - 1, movimientos_disponibles_rey);

        return movimientos_disponibles_rey;
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