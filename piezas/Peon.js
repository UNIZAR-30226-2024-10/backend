const Tablero = require('../Tablero.js'); // Asegúrate de importar correctamente Tablero.js
const Pieza = require('./Pieza.js'); // Asegúrate de importar correctamente Pieza.js


class Peon {
    constructor(x, y, color, tablero) {
        this.Posicion = {x, y};
        this.color = color;
        this.tablero = tablero;
    }

    getClassName() {
        return this.constructor.name;
    }

    obtenerMovimientosDisponibles() {
        const movimientos_disponibles_peon = [];
        const casillas = this.tablero.getCasillas();
        let casilla;
        if(this.Posicion.y == 1) {
            // Movimiento hacia adelante
            casilla = casillas[this.Posicion.x][this.Posicion.y + 1];
            if(casilla !== undefined && casilla !== null && casilla.getPieza() === null) {
                this._agregarMovimiento(this.Posicion.x, this.Posicion.y + 1, movimientos_disponibles_peon);
                casilla = casillas[this.Posicion.x][this.Posicion.y + 2];
                if(casilla !== undefined && casilla !== null && casilla.getPieza() === null) {
                    this._agregarMovimiento(this.Posicion.x, this.Posicion.y + 2, movimientos_disponibles_peon);
                }
            }
            
        }
        else {
            casilla = casillas[this.Posicion.x][this.Posicion.y + 1];
            if(casilla !== undefined && casilla !== null && casilla.getPieza() === null) {
                this._agregarMovimiento(this.Posicion.x, this.Posicion.y + 1, movimientos_disponibles_peon);
            }
        }
        
        
        
        

        // ESTO SOLO CUANDO COME (todavia no implementado)
        // Movimiento diagonal izquierda
        this._agregarMovimiento(this.Posicion.x - 1, this.Posicion.y + 1, movimientos_disponibles_peon);

        // Movimiento diagonal derecha
        this._agregarMovimiento(this.Posicion.x + 1, this.Posicion.y + 1, movimientos_disponibles_peon);

        return movimientos_disponibles_peon;
    }

    imprimirMovimientosDisponibles() {
        const movimientos = this.obtenerMovimientosDisponibles();
        console.log("Movimientos disponibles del peon:");
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
module.exports = Peon;