const Tablero = require('../Tablero.js'); // Asegúrate de importar correctamente Tablero.js
const Pieza = require('./Pieza.js')
class Torre {
    constructor(x, y, color, tablero, lado) {
        this.Posicion = {x, y};
        this.color = color;
        this.tablero = tablero;
        this.puntos = 5;
        this.lado = lado;
    }
    getLado(){
        return this.lado;
    }
    setLado(lado){
        this.lado = lado;
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

    obtenerMovimientosDisponibles() {
        let movimientos_disponibles_torre = [];

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
                    if (casilla.getPieza().getColor() !== this.color) {
                        movimientos.push({ x, y});
                    }
                    break;
                }
            }

            k++;
        }
    }

/*    obtenerMovimientosEnroque(ha_movido_rey_blanco, ha_movido_rey_negro, ha_movido_torre_blanca_izquierda, ha_movido_torre_blanca_derecha,
        ha_movido_torre_negra_izquierda, ha_movido_torre_negra_derecha, color) {

        let movimientos_enroque = [];


        // Enroque largo con blancas
        let casilla1 = this.tablero.getCasillas()[1][0];
        let casilla2 = this.tablero.getCasillas()[2][0];
        let casilla3 = this.tablero.getCasillas()[3][0];
        if (color === "blancasI" && this.color === "blancasI" && !ha_movido_torre_blanca_izquierda && casilla1 !== undefined && casilla1 !== null && casilla2 !== undefined && casilla2 !== null && casilla3 !== undefined && casilla3 !== null) {
            if (casilla1.getPieza() === null && casilla2.getPieza() === null && casilla3.getPieza() === null) {
                movimientos_enroque.push({ x: 3, y: 0 });
            }
        }

        // Enroque largo con negras
        casilla1 = this.tablero.getCasillas()[1][7];
        casilla2 = this.tablero.getCasillas()[2][7];
        casilla3 = this.tablero.getCasillas()[3][7];
        if (color === "negrasI" && this.color === "negrasI" && !ha_movido_torre_negra_izquierda && casilla1 !== undefined && casilla1 !== null && casilla2 !== undefined && casilla2 !== null && casilla3 !== undefined && casilla3 !== null) {
            if (casilla1.getPieza() === null && casilla2.getPieza() === null && casilla3.getPieza() === null) {
                movimientos_enroque.push({ x: 3, y: 7 });
            }
        }

        // Enroque corto con blancas
        casilla1 = this.tablero.getCasillas()[6][0];
        casilla2 = this.tablero.getCasillas()[5][0];
        if (color === "blancasD" && this.color === "blancasD" && !ha_movido_torre_blanca_derecha && casilla1 !== undefined && casilla1 !== null && casilla2 !== undefined && casilla2 !== null) {
            if (casilla1.getPieza() === null && casilla2.getPieza() === null) {
                movimientos_enroque.push({ x: 5, y: 0 });
            }
        }

        // Enroque corto con negras
        casilla1 = this.tablero.getCasillas()[6][7];
        casilla2 = this.tablero.getCasillas()[5][7];
        if (color === "negrasD" && this.color === "negrasD" && !ha_movido_torre_negra_derecha && casilla1 !== undefined && casilla1 !== null && casilla2 !== undefined && casilla2 !== null) {
            if (casilla1.getPieza() === null && casilla2.getPieza() === null) {
                movimientos_enroque.push({ x: 5, y: 7 });
            }
        }
        return movimientos_enroque;
    }
    */
    _esMovimientoValido(x, y) {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
}
module.exports = Torre;