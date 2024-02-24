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

        // inicializar aqui las piezas
    }

    getCasillas(){
        return this.casillas;
    }

    setCasillas(casillas){
        this.casillas = casillas;
    }

    inicializarPiezas() {

        // SOLO ESTAN INICIALIZADAS LAS BLANCAS PQ HABRA Q VER Q HACEMOS CON LA ORIENTACION D LA MATRIZ PA LAS NEGRAS
        const peon_1 = new Peon(0, 1);
        const peon_2 = new Peon(1, 1);
        const peon_3 = new Peon(2, 1);
        const peon_4 = new Peon(3, 1);
        const peon_5 = new Peon(4, 1);
        const peon_6 = new Peon(5, 1);
        const peon_7 = new Peon(6, 1);
        const peon_8 = new Peon(7, 1);

        const alfil_de_negras = new Alfil(2, 0);
        const alfil_de_blancas = new Alfil(5, 0);

        const caballo_izqda = new Caballo(1, 0);
        const caballo_dcha = new Caballo(6, 0);

        const torre_dcha = new Torre(0, 0);
        const torre_izqda = new Torre(7, 0);

        const dama = new Dama(3, 0);

        const rey = new Rey(4, 0);

        const chessboardState = {
            peones: [
                { x: peon_1.Posicion.x, y: peon_1.Posicion.y },
                { x: peon_2.Posicion.x, y: peon_2.Posicion.y },
                { x: peon_3.Posicion.x, y: peon_3.Posicion.y },
                { x: peon_4.Posicion.x, y: peon_4.Posicion.y },
                { x: peon_5.Posicion.x, y: peon_5.Posicion.y },
                { x: peon_6.Posicion.x, y: peon_6.Posicion.y },
                { x: peon_7.Posicion.x, y: peon_7.Posicion.y },
                { x: peon_8.Posicion.x, y: peon_8.Posicion.y}
            ],
            alfiles: [
                { x: alfil_de_negras.Posicion.x, y: alfil_de_negras.Posicion.y },
                { x: alfil_de_blancas.Posicion.x, y: alfil_de_blancas.Posicion.y }
            ],
            caballos: [
                { x: caballo_izqda.Posicion.x, y: caballo_izqda.Posicion.y },
                { x: caballo_dcha.Posicion.x, y: caballo_dcha.Posicion.y }
            ],
            torres: [
                { x: torre_dcha.Posicion.x, y: torre_dcha.Posicion.y },
                { x: torre_izqda.Posicion.x, y: torre_izqda.Posicion.y }
            ],
            dama: { x: dama.Posicion.x, y: dama.Posicion.y },
            rey: { x: rey.Posicion.x, y: rey.Posicion.y },
        };
        return chessboardState;
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