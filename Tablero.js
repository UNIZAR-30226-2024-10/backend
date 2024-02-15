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
}
module.exports = Tablero;