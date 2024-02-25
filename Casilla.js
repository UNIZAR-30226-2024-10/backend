class Casilla {
    constructor() {
        //this.color = false; // El valor por defecto es false, asegúrate de establecerlo según corresponda
        this.pieza = null; // La pieza es inicialmente nula, puedes establecerla después
    }
    
    getColor() {
        return this.color;
    }
    
    setColor(color) {
        this.color = color;
    }
    
    getPieza() {
        return this.pieza;
    }
    
    setPieza(pieza) {
        this.pieza = pieza;
    }

    isFilled() {
        
    }
}

module.exports = Casilla;

