const Tablero = require('../Tablero.js'); // Asegúrate de importar correctamente Tablero.js
const Pieza = require('./Pieza.js'); // Asegúrate de importar correctamente Pieza.js

class Torre {
    constructor(x, y, color, tablero) {
        this.Posicion = {x, y};
        this.color = color;
        this.tablero = tablero;
    }

    getClassName() {
        return this.constructor.name;
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

    imprimirMovimientosDisponibles() {
        const movimientos = this.obtenerMovimientosDisponibles();
        console.log("Movimientos disponibles de la torre:");
        movimientos.forEach(movimiento => {
            console.log(`(${movimiento.x}, ${movimiento.y})`);
        });
    }

    _agregarMovimientosEnEje(deltaX, deltaY, movimientos) {
        let k = 1;
        while (this._esMovimientoValido(this.Posicion.x + k * deltaX, this.Posicion.y + k * deltaY)) {
            const x = this.Posicion.x + k * deltaX;
            const y = this.Posicion.y + k * deltaY;

            const casilla = this.tablero.getCasillas()[x][y];

            if (casilla !== undefined && casilla !== null) {
                if (casilla.getPieza() === null) {
                    movimientos.push({ x, y });
                } else {
                    // There is a piece in the way, stop checking in this direction
                    // Mirar aqui si es de distinto color y comerla MIGUEL
                    break;
                }
            }

            k++;
        }
    }

    _esMovimientoValido(x, y) {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
}

module.exports = Torre;