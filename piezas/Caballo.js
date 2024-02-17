const Tablero = require('../Tablero.js'); // Asegúrate de importar correctamente Tablero.js
const Pieza = require('./Pieza.js'); // Asegúrate de importar correctamente Pieza.js
//const Posicion = require('./Posicion.js'); // Asegúrate de importar correctamente Posicion.js


class Caballo {
    constructor(x, y) {
        this.Posicion = {x, y};
    }

    obtenerMovimientosDisponibles() {
        const movimientos_disponibles_caballo = [];
        this._agregarMovimiento(this.Posicion.x + 1, this.Posicion.y + 2, movimientos_disponibles_caballo);
        this._agregarMovimiento(this.Posicion.x + 2, this.Posicion.y + 1, movimientos_disponibles_caballo);
        this._agregarMovimiento(this.Posicion.x - 1, this.Posicion.y + 2, movimientos_disponibles_caballo);
        this._agregarMovimiento(this.Posicion.x - 2, this.Posicion.y + 1, movimientos_disponibles_caballo);
        this._agregarMovimiento(this.Posicion.x - 1, this.Posicion.y - 2, movimientos_disponibles_caballo);
        this._agregarMovimiento(this.Posicion.x - 2, this.Posicion.y - 1, movimientos_disponibles_caballo);
        this._agregarMovimiento(this.Posicion.x + 1, this.Posicion.y - 2, movimientos_disponibles_caballo);
        this._agregarMovimiento(this.Posicion.x + 2, this.Posicion.y - 1, movimientos_disponibles_caballo);

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

    _esMovimientoValido(x, y) {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
}

module.exports = Caballo;