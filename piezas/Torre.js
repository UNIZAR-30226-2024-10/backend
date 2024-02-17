const Tablero = require('../Tablero.js'); // Asegúrate de importar correctamente Tablero.js
const Pieza = require('./Pieza.js'); // Asegúrate de importar correctamente Pieza.js
const Posicion = require('./Posicion.js'); // Asegúrate de importar correctamente Posicion.js


class Torre {
    constructor(x, y) {
        this.Posicion = {x, y};
    }

    obtenerMovimientosDisponibles() {
        const movimientos_disponibles_torre = [];

        // Eje +x
        this._agregarMovimientosEnEje(1, 0, movimientos_disponibles_torre);

        // Eje +y
        this._agregarMovimientosEnEje(0, 1, movimientos_disponibles_torre);

        // Eje -x
        this._agregarMovimientosEnEje(-1, 0, movimientos_disponibles_torre);

        // Eje -y
        this._agregarMovimientosEnEje(0, -1, movimientos_disponibles_torre);

        return movimientos_disponibles_torre;
    }

    _agregarMovimientosEnEje(deltaX, deltaY, movimientos) {
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