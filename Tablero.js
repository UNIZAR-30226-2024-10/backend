const Casilla = require('./Casilla.js');
const Dama = require('./piezas/Dama.js');
const Peon = require('./piezas/Peon.js');
const Alfil = require('./piezas/Alfil.js');
const Caballo = require('./piezas/Caballo.js');
const Rey = require('./piezas/Rey.js');
const Torre = require('./piezas/Torre.js');


class Tablero {
    constructor() {
        this.N = 8;
        this.M = 8;
        this.casillas = [];

        for (let i = 0; i < this.N; i++){
            this.casillas[i] = [];
            for (let j = 0; j < this.M; j++){
                this.casillas[i][j] = new Casilla();
            }
        }

    }

    getCasillas(){
        return this.casillas;
    }

    setCasillas(casillas){
        this.casillas = casillas;
    }

    inicializarPiezas() {

        // SOLO ESTAN INICIALIZADAS LAS BLANCAS PQ HABRA Q VER Q HACEMOS CON LA ORIENTACION D LA MATRIZ PA LAS NEGRAS
        const peon_1_b = new Peon(0, 1, "blanca");
        const peon_2_b = new Peon(1, 1, "blanca");
        const peon_3_b = new Peon(2, 1, "blanca");
        const peon_4_b = new Peon(3, 1, "blanca");
        const peon_5_b = new Peon(4, 1, "blanca");
        const peon_6_b = new Peon(5, 1, "blanca");
        const peon_7_b = new Peon(6, 1, "blanca");
        const peon_8_b = new Peon(7, 1, "blanca");

        const alfil_de_negras_b = new Alfil(2, 0, "blanca");
        const alfil_de_blancas_b = new Alfil(5, 0, "blanca");

        const caballo_izqda_b = new Caballo(1, 0, "blanca");
        const caballo_dcha_b = new Caballo(6, 0, "blanca");

        const torre_dcha_b = new Torre(0, 0, "blanca");
        const torre_izqda_b = new Torre(7, 0, "blanca");

        const dama_b = new Dama(3, 0, "blanca");

        const rey_b = new Rey(4, 0, "blanca");

        // Inicialización de negras
        const peon_1_n = new Peon(0, 6, "negra");
        const peon_2_n = new Peon(1, 6, "negra");
        const peon_3_n = new Peon(2, 6, "negra");
        const peon_4_n = new Peon(3, 6, "negra");
        const peon_5_n = new Peon(4, 6, "negra");
        const peon_6_n = new Peon(5, 6, "negra");
        const peon_7_n = new Peon(6, 6, "negra");
        const peon_8_n = new Peon(7, 6, "negra");

        const alfil_de_negras_n = new Alfil(2, 7, "negra");
        const alfil_de_blancas_n = new Alfil(5, 7, "negra");

        const caballo_izqda_n = new Caballo(1, 7, "negra");
        const caballo_dcha_n = new Caballo(6, 7, "negra");

        const torre_dcha_n = new Torre(0, 7, "negra");
        const torre_izqda_n = new Torre(7, 7, "negra");

        const dama_n = new Dama(3, 7, "negra");

        const rey_n = new Rey(4, 7, "negra");

        const chessboardState = {
            peones: [
                { x: peon_1_b.Posicion.x, y: peon_1_b.Posicion.y, color: peon_1_b.color },
                { x: peon_2_b.Posicion.x, y: peon_2_b.Posicion.y, color: peon_2_b.color },
                { x: peon_3_b.Posicion.x, y: peon_3_b.Posicion.y, color: peon_3_b.color },
                { x: peon_4_b.Posicion.x, y: peon_4_b.Posicion.y, color: peon_4_b.color },
                { x: peon_5_b.Posicion.x, y: peon_5_b.Posicion.y, color: peon_5_b.color },
                { x: peon_6_b.Posicion.x, y: peon_6_b.Posicion.y, color: peon_6_b.color },
                { x: peon_7_b.Posicion.x, y: peon_7_b.Posicion.y, color: peon_7_b.color },
                { x: peon_8_b.Posicion.x, y: peon_8_b.Posicion.y, color:peon_8_b.color },

                { x: peon_1_n.Posicion.x, y: peon_1_n.Posicion.y, color: peon_1_n.color },
                { x: peon_2_n.Posicion.x, y: peon_2_n.Posicion.y, color: peon_2_n.color },
                { x: peon_3_n.Posicion.x, y: peon_3_n.Posicion.y, color: peon_3_n.color },
                { x: peon_4_n.Posicion.x, y: peon_4_n.Posicion.y, color: peon_4_n.color },
                { x: peon_5_n.Posicion.x, y: peon_5_n.Posicion.y, color: peon_5_n.color },
                { x: peon_6_n.Posicion.x, y: peon_6_n.Posicion.y, color: peon_6_n.color },
                { x: peon_7_n.Posicion.x, y: peon_7_n.Posicion.y, color: peon_7_n.color },
                { x: peon_8_n.Posicion.x, y: peon_8_n.Posicion.y, color:peon_8_n.color }
            ],
            alfiles: [
                { x: alfil_de_negras_b.Posicion.x, y: alfil_de_negras_b.Posicion.y, color: alfil_de_negras_b.color },
                { x: alfil_de_blancas_b.Posicion.x, y: alfil_de_blancas_b.Posicion.y, color: alfil_de_blancas_b.color },

                { x: alfil_de_negras_n.Posicion.x, y: alfil_de_negras_n.Posicion.y, color: alfil_de_negras_n.color },
                { x: alfil_de_blancas_n.Posicion.x, y: alfil_de_blancas_n.Posicion.y, color: alfil_de_blancas_n.color }
            ],
            caballos: [
                { x: caballo_izqda_b.Posicion.x, y: caballo_izqda_b.Posicion.y, color: caballo_izqda_b.color },
                { x: caballo_dcha_b.Posicion.x, y: caballo_dcha_b.Posicion.y, color: caballo_dcha_b.color },

                { x: caballo_izqda_n.Posicion.x, y: caballo_izqda_n.Posicion.y, color: caballo_izqda_n.color },
                { x: caballo_dcha_n.Posicion.x, y: caballo_dcha_n.Posicion.y, color: caballo_dcha_n.color }
            ],
            torres: [
                { x: torre_dcha_b.Posicion.x, y: torre_dcha_b.Posicion.y, color: torre_dcha_b.color },
                { x: torre_izqda_b.Posicion.x, y: torre_izqda_b.Posicion.y, color: torre_izqda_b.color },

                { x: torre_dcha_n.Posicion.x, y: torre_dcha_n.Posicion.y, color: torre_dcha_n.color },
                { x: torre_izqda_n.Posicion.x, y: torre_izqda_n.Posicion.y, color: torre_izqda_n.color }
            ],
            damas: [
                { x: dama_b.Posicion.x, y: dama_b.Posicion.y, color: dama_b.color },
                { x: dama_n.Posicion.x, y: dama_n.Posicion.y, color: dama_n.color }
            ],
            reyes: [
                { x: rey_b.Posicion.x, y: rey_b.Posicion.y, color: rey_b.color },
                { x: rey_n.Posicion.x, y: rey_n.Posicion.y, color: rey_n.color }
            ]
        };
        return chessboardState;
    }

    actualizarTablero(chessboardState) {
        for (const tipo_pieza in chessboardState) {
            if (chessboardState.hasOwnProperty(tipo_pieza)) {
                const piezas = chessboardState[tipo_pieza];
                
                if (Array.isArray(piezas)) {
                    for (let i = 0; i < piezas.length; i++) {
                        const pieza = piezas[i];
                        const { x, y, color } = pieza;
                        let objeto_pieza = this.createPiece(tipo_pieza, x, y, color);
                        this.casillas[x][y].setPieza(objeto_pieza);
                    }
                } else {
                    const { x, y, color } = piezas;
                    let objeto_pieza = this.createPiece(tipo_pieza, x, y, color);
                    this.casillas[x][y].setPieza(objeto_pieza);
                }
            }
        }
    }
    
    createPiece(tipo_pieza, x, y, color) {
        switch (tipo_pieza) {
            case 'peones':
                return new Peon(x, y, color, this);
            case 'alfiles':
                return new Alfil(x, y, color, this);
            case 'caballos':
                return new Caballo(x, y, color, this);
            case 'torres':
                return new Torre(x, y, color, this);
            case 'dama':
                return new Dama(x, y, color, this);
            case 'rey':
                return new Rey(x, y, color, this);
            default:
                // Handle unknown piece type
                return null;
        }
    }
    
    

    mostrarTablero() {
        for (let i = 0; i < this.N; i++) {
            for (let j = 0; j < this.M; j++) {
                const casilla = this.casillas[i][j];
                if(casilla.getPieza() != null) {
                    console.log(`[${i}, ${j}]: ${casilla.getPieza().getClassName()} ${casilla.getPieza().color}`);
                }
            }
        }
    }

    hayPiezasEnFilaHaciaDerecha(coord_x_pieza_1, coord_y_pieza_1, coord_x_pieza_2) {
        let hay_pieza = false;
        let i = coord_x_pieza_1 + 1;
        while(!hay_pieza && i < coord_x_pieza_2) {
            // Comprobar si hay algo en esa casilla, están en la misma fila
            if(!this.casillas[i][coord_y_pieza_1].isFilled()) {
                hay_pieza = true;
            }
            i++;
        }
        return hay_pieza;
    }

    hayPiezasEnFilaHaciaIzquierda(coord_x_pieza_1, coord_y_pieza_1, coord_x_pieza_2) {
        let hay_pieza = false;
        let i = coord_x_pieza_1 - 1;
        while(!hay_pieza && i > coord_x_pieza_2) {
            // Comprobar si hay algo en esa casilla, están en la misma fila
            if(!this.casillas[i][coord_y_pieza_1].isFilled()) {
                hay_pieza = true;
            }
            i--;
        }
        return hay_pieza;
    }



    hayPiezasEnColumnaHaciaArriba(coord_x_pieza_1, coord_y_pieza_1, coord_y_pieza_2) {
        let hay_pieza = false;
        let i = coord_y_pieza_1 + 1;
        while(!hay_pieza && i < coord_y_pieza_2) {
            // Comprobar si hay algo en esa casilla, están en la misma fila
            if(!this.casillas[coord_x_pieza_1][i].isFilled()) {
                hay_pieza = true;
            }
            i++;
        }
        return hay_pieza;
    }

    hayPiezasEnColumnaHaciaAbajo(coord_x_pieza_1, coord_y_pieza_1, coord_y_pieza_2) {
        let hay_pieza = false;
        let i = coord_y_pieza_1 - 1;
        while(!hay_pieza && i > coord_y_pieza_2) {
            // Comprobar si hay algo en esa casilla, están en la misma fila
            if(!this.casillas[coord_x_pieza_1][i].isFilled()) {
                hay_pieza = true;
            }
            i--;
        }
        return hay_pieza;
    }

    // Esta hecha por ChatGPT
    hayPiezasEnDiagonal(coord_x_pieza_1, coord_y_pieza_1, coord_x_pieza_2, coord_y_pieza_2) {
        let hay_pieza = false;
        
        // Determine the direction of the diagonal (upward or downward)
        const rowDirection = coord_x_pieza_2 - coord_x_pieza_1;
        const colDirection = coord_y_pieza_2 - coord_y_pieza_1;
    
        let i = coord_x_pieza_1 + (rowDirection > 0 ? 1 : -1);
        let j = coord_y_pieza_1 + (colDirection > 0 ? 1 : -1);
    
        while (!hay_pieza && i !== coord_x_pieza_2 && j !== coord_y_pieza_2) {
            // Comprobar si hay algo en esa casilla, están en la misma diagonal
            if (!this.casillas[i][j].isFilled()) {
                hay_pieza = true;
            }
            i += rowDirection > 0 ? 1 : -1;
            j += colDirection > 0 ? 1 : -1;
        }
    
        return hay_pieza;
    }

    jaqueDiagonal() {
        let hay_jaque = false;
        let lista_transversales = [torre_dcha, torre_izqda, dama];
        for (let pieza of lista_transversales) {
            
            if(abs(pieza.posicion.x - rey.posicion.x) === abs(pieza.posicion.x - rey.posicion.x) && 
            !this.hayPiezasEnDiagonal(rey.posicion.x, rey.posicion.y, pieza.posicion.x, pieza.posicion.y)) {
                    hay_jaque = true;
            }
        }
        return hay_jaque;
    }
    jaqueTransversal() {
        let lista_diagonales = [alfil_de_blancas, alfil_de_negras, dama];
        for (let pieza of lista_diagonales) {
            // Jaque en eje x
            // +x
            if(pieza.posicion.y === rey.posicion.y && pieza.posicion.x > rey.posicion.x 
                && !this.hayPiezasEnFilaHaciaDerecha(rey.posicion.x, rey.posicion.y, pieza.posicion.x)) {
                    hay_jaque = true;
            }
            // -x
            if(pieza.posicion.y === rey.posicion.y && pieza.posicion.x < rey.posicion.x 
                && !this.hayPiezasEnFilaHaciaIzquierda(rey.posicion.x, rey.posicion.y, pieza.posicion.x)) {
                    hay_jaque = true;
            }
            // Jaque en eje y
            // + y
            if(pieza.posicion.x === rey.posicion.x && pieza.posicion.y > rey.posicion.y 
                && !this.hayPiezasEnColumnaHaciaArriba(rey.posicion.x, rey.posicion.y, pieza.posicion.y)) {
                    hay_jaque = true;
            }
            // -y
            if(pieza.posicion.x === rey.posicion.x && pieza.posicion.y < rey.posicion.y 
                && !this.hayPiezasEnColumnaHaciaAbajo(rey.posicion.x, rey.posicion.y, pieza.posicion.y)) {
                    hay_jaque = true;
            }
        }
        return hay_jaque;

    }
    jaqueCaballo() {
        let lista_caballos = [caballo_izqda, caballo_dcha];
        for(let pieza of lista_caballos) {
            if(pieza.posicion.x + 1 == rey.posicion.x && pieza.posicion.y + 2 == rey.posicion.y && colorCaballo != colorRey) {
                hay_jaque = true;
            }
            if(pieza.posicion.x + 2 == rey.posicion.x && pieza.posicion.y + 1 == rey.posicion.y && colorCaballo != colorRey) {
                hay_jaque = true;
            }
            
            if(pieza.posicion.x - 1 == rey.posicion.x && pieza.posicion.y + 2 == rey.posicion.y && colorCaballo != colorRey) {
                hay_jaque = true;
            }
            if(pieza.posicion.x - 2 == rey.posicion.x && pieza.posicion.y + 1 == rey.posicion.y && colorCaballo != colorRey) {
                hay_jaque = true;
            }
            
            
            if(pieza.posicion.x - 2 == rey.posicion.x && pieza.posicion.y - 1 == rey.posicion.y && colorCaballo != colorRey) {
                hay_jaque = true;
            }
            if(pieza.posicion.x - 1 == rey.posicion.x && pieza.posicion.y - 2 == rey.posicion.y && colorCaballo != colorRey) {
                hay_jaque = true;
            }
            
            if(pieza.posicion.x + 1 == rey.posicion.x && pieza.posicion.y - 2 == rey.posicion.y && colorCaballo != colorRey) {
                hay_jaque = true;
            }
            if(pieza.posicion.x + 2 == rey.posicion.x && pieza.posicion.y - 1 == rey.posicion.y && colorCaballo != colorRey) {
                hay_jaque = true;
            }
        }
    }

    jaquePeon() {
        let lista_peones = [peon_1, peon_2, peon_3, peon_4, peon_5, peon_6, peon_7, peon_8];
        for(let pieza of lista_peones) {
            // Jaque peon por la derecha (respecto al rey)
            if (pieza.posicion.x == rey.posicion.x + 1 && pieza.posicion.y == rey.posicion.y + 1 && colorPeon != colorRey) {
                hay_jaque = true;
            }
            // Jaque peon por la izquierda (respecto al rey)
            if (pieza.posicion.x == rey.posicion.x - 1 && pieza.posicion.y == rey.posicion.y + 1 && colorPeon != colorRey) {
                hay_jaque = true;
            }
        }
    }

    existeJaque() {
        this.jaqueTransversal();
        this.jaqueDiagonal();
        this.jaqueCaballo();
        this.jaquePeon();
    }

    existe_jaque_mate_en_casilla() {

    }

    jaqueMate() {
        let jaque_mate = true;
        if(this.existeJaque()) {
            // Solo implementado que no se pueda mover a ningún lado (falta lo d q pueda poner 
            // algo en medio o lo de que la pueda comer)
            let movimientos_disponibles_rey = rey.obtenerMovimientosDisponibles();
            for (let movimiento of movimientos_disponibles_rey) {
                if(!existe_jaque_en_casilla(movimiento.x, movimiento.y)) {
                    jaque_mate = false;
                }
            }
        }
        return jaque_mate;
    }

}
module.exports = Tablero;