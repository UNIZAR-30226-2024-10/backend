
// Enroque corto (faltan reglas del enroque)
if(posicionRey.x == 4 && posicionRey.y == 0 && posicionTorre.x == 7 && posicionTorre.y == 0) {
    movimientos_disponibles_rey.push(6, 0);
    movimientos_disponibles_torre.push(5, 0);
}

// Enroque largo (faltan reglas del enroque)
if(posicionRey.x == 4 && posicionRey.y == 0 && posicionTorre.x == 0 && posicionTorre.y == 0) {
    movimientos_disponibles_rey.push(2, 0);
    movimientos_disponibles_torre.push(3, 0);
}


// Jaque
Boolean hay_jaque = false;
// Jaque transversal
// Jaque eje +x con torre
if (posicionTorre.y == posicionRey.y && posicionTorre.x > posicionRey.x
     && !HayPiezasEnFila(posicionTorre.x, posicionTorre.y) && colorRey != colorTorre) {
        hay_jaque = true;
}

// Jaque eje +y con torre
if (posicionTorre.x == posicionRey.x && posicionTorre.y > posicionRey.y
    && !HayPiezasEnFila(posicionTorre.y, posicionRey.y) && colorRey != colorTorre) {
        hay_jaque = true;
}

// Jaque eje -x con torre
if (posicionTorre.y == posicionRey.y && posicionTorre.x < posicionRey.x
    && !HayPiezasEnFila(posicionTorre.x, posicionRey.y) && colorRey != colorTorre) {
       hay_jaque = true;
}

// Jaque eje -y con torre
if (posicionTorre.x == posicionRey.x && posicionTorre.y < posicionRey.y
    && !HayPiezasEnFila(posicionTorre.y, posicionRey.y) && colorRey != colorTorre) {
        hay_jaque = true;
}

// Jaque caballo
if(posicionCaballo.x + 1 == posicionRey.x && posicionCaballo.y + 2 == posicionRey.y && colorCaballo != colorRey) {
    hay_jaque = true;
}
if(posicionCaballo.x + 2 == posicionRey.x && posicionCaballo.y + 1 == posicionRey.y && colorCaballo != colorRey) {
    hay_jaque = true;
}

if(posicionCaballo.x - 1 == posicionRey.x && posicionCaballo.y + 2 == posicionRey.y && colorCaballo != colorRey) {
    hay_jaque = true;
}
if(posicionCaballo.x - 2 == posicionRey.x && posicionCaballo.y + 1 == posicionRey.y && colorCaballo != colorRey) {
    hay_jaque = true;
}


if(posicionCaballo.x - 2 == posicionRey.x && posicionCaballo.y - 1 == posicionRey.y && colorCaballo != colorRey) {
    hay_jaque = true;
}
if(posicionCaballo.x - 1 == posicionRey.x && posicionCaballo.y - 2 == posicionRey.y && colorCaballo != colorRey) {
    hay_jaque = true;
}

if(posicionCaballo.x + 1 == posicionRey.x && posicionCaballo.y - 2 == posicionRey.y && colorCaballo != colorRey) {
    hay_jaque = true;
}
if(posicionCaballo.x + 2 == posicionRey.x && posicionCaballo.y - 1 == posicionRey.y && colorCaballo != colorRey) {
    hay_jaque = true;
}

// Jaque peon
// Jaque peon por la derecha (respecto al rey)
if (posicionPeon.x == posicionRey.x + 1 && posicionPeon.y == posicionRey.y + 1 && colorPeon != colorRey) {
    hay_jaque = true;
}
// Jaque peon por la izquierda (respecto al rey)
if (posicionPeon.x == posicionRey.x - 1 && posicionPeon.y == posicionRey.y + 1 && colorPeon != colorRey) {
    hay_jaque = true;
}

// Jaque alfil
if(abs(posicionAlfil.x - posicionRey.x) === abs(posicionAlfil.x - posicionRey.x) && 
!HayPiezasEnDiagonal(posicionAlfil.x, posicionAlfil.y, posicionRey.x, posicionRey.y)) {
    hay_jaque = true;
}

// Jaque dama
if(abs(posicionDama.x - posicionRey.x) === abs(posicionDama.x - posicionRey.x) && 
!HayPiezasEnDiagonal(posicionDama.x, posicionDama.y, posicionRey.x, posicionRey.y)) {
    hay_jaque = true;
}
// Jaque transversal
// Jaque eje +x con dama
if (posicionDama.y == posicionRey.y && posicionDama.x > posicionRey.x
    && !HayPiezasEnFila(posicionDama.x, posicionRey.y) && colorRey != colorDama) {
       hay_jaque = true;
}

// Jaque eje +y con dama
if (posicionDama.x == posicionRey.x && posicionDama.y > posicionRey.y
   && !HayPiezasEnFila(posicionDama.y, posicionRey.y) && colorRey != colorDama) {
       hay_jaque = true;
}

// Jaque eje -x con dama
if (posicionDama.y == posicionRey.y && posicionDama.x < posicionRey.x
   && !HayPiezasEnFila(posicionDama.x, posicionRey.x) && colorRey != colorDama) {
      hay_jaque = true;
}

// Jaque eje -y con dama
if (posicionDama.x == posicionRey.x && posicionDama.y < posicionRey.y
   && !HayPiezasEnFila(posicionDama.y, posicionRey.y) && colorRey != colorDama) {
       hay_jaque = true;
}

// Coronar
if(peonPosicion.y == 7) {
    // mostrarOpciones caballo, alfil, torre
}










// Jaque mate