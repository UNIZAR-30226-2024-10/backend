class Posicion {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    getX() {
        return this.x;
    }

    setX(x) {
        this.x = x;
    }

    getY() {
        return this.y;
    }

    setY(y) {
        this.y = y;
    }

    setPosicion(x, y) {
        this.x = x;
        this.y = y;
    }
}

module.exports = Posicion;

