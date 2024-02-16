const Casilla = require('./Casilla.js');


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
    }
}
module.exports = Tablero;