// Peón
// Movimientos disponibles (peon en x, y)
// Movimiento peón
movimientos_dsponibles_peon = [];
movimientos_dsponibles_peon.push(posicionPeon.x, posicion.y + 1)
if(posicionPeon.y == 1) {
    movimientos_dsponibles_peon.push(posicionPeon.x, posicion.y + 2)
}



// Movimiento inicial peón
if(!pieza[x, y + 1] && y == 1) {
    // Opciones: 
    peon.nueva_posicion = (x, y + 1)
    // o 
    peon.nueva_posicion = (x, y + 2)
    // o
    if(pieza[x + 1, y + 1]) { // Captura
        peon.nueva_posicion = (x + 1, y + 1)
    }
    if(pieza[x - 1, y - 1]) { // Captura
        peon.nueva_posicion = (x - 1, y - 1)
    }
}

// Movimiento normal del peón
if(!pieza[x, y + 1]) {
    // Opciones: 
    peon.nueva_posicion = (x, y + 1)
    if(pieza[x + 1, y + 1]) { // Captura
        peon.nueva_posicion = (x + 1, y + 1)
    }
    if(pieza[x - 1, y - 1]) { // Captura
        peon.nueva_posicion = (x - 1, y - 1)
    }
}
// Falta captura al paso

// Movimiento del alfil (sin obstaculos)
const movimientos_disponibles_alfil = [];
// Diagonal primer cuadrante
k = 1
while(posicionAlfil.x + k < 8) {
    movimientos_disponibles_alfil.push((posicionAlfil.x + k, posicionAlfil.y + k));
    k++;
}

// Diagonal segundo cuadrante
k = 1
while(posicionAlfil.x - k >= 0) {
    movimientos_disponibles_alfil.push((posicionAlfil.x - k, posicionAlfil.y + k));
    k++;
}

// Diagonal tercer cuadrante
k = 1
while(posicionAlfil.x - k >= 0) {
    movimientos_disponibles_alfil.push((posicionAlfil.x - k, posicionAlfil.y - k));
    k++;
}
// Diagonal cuarto cuadrante
k = 1
while(posicionAlfil.x + k < 8) {
    movimientos_disponibles_alfil.push((posicionAlfil.x + k, posicionAlfil.y - k));
    k++;
}

// Movimiento del caballo (sin obstaculos)
const movimientos_disponibles_caballo = [];
if(posicionCaballo.x + 1 < 8 && posicionCaballo.y + 2 < 8) {
    movimientos_disponibles_caballo.push(posicionCaballo.x + 1, posicionCaballo.y + 2)
}
if(posicionCaballo.x + 2 < 8 && posicionCaballo.y + 1 < 8) {
    movimientos_disponibles_caballo.push(posicionCaballo.x + 2, posicionCaballo.y + 1)
}

if(posicionCaballo.x - 1 >= 0 && posicionCaballo.y + 2 < 8) {
    movimientos_disponibles_caballo.push(posicionCaballo.x - 1, posicionCaballo.y + 2)
}
if(posicionCaballo.x - 2 >= 0 && posicionCaballo.y + 1 < 8) {
    movimientos_disponibles_caballo.push(posicionCaballo.x - 2, posicionCaballo.y + 1)
}

if(posicionCaballo.x - 2 >= 0 && posicionCaballo.y - 1 >= 0) {
    movimientos_disponibles_caballo.push(posicionCaballo.x - 2, posicionCaballo.y - 1)
}
if(posicionCaballo.x - 1 >= 0 && posicionCaballo.y - 2 >= 0) {
    movimientos_disponibles_caballo.push(posicionCaballo.x - 1, posicionCaballo.y - 2)
}

if(posicionCaballo.x + 1 < 8 && posicionCaballo.y - 2 >= 0) {
    movimientos_disponibles_caballo.push(posicionCaballo.x + 1, posicionCaballo.y - 2)
}
if(posicionCaballo.x + 2 < 8 && posicionCaballo.y - 1 >= 0) {
    movimientos_disponibles_caballo.push(posicionCaballo.x + 2, posicionCaballo.y - 1)
}

// Movimiento de la torre (sin obstaculos)
// Eje +x
k = 1
while(posicionTorre.x + k < 8) {
    movimientos_disponibles_Torre.push((posicionTorre.x + k, posicionTorre.y));
    k++;
}

// Eje +y
k = 1
while(posicionTorre.y + k < 8) {
    movimientos_disponibles_Torre.push((posicionTorre.x, posicionTorre.y + k));
    k++;
}

// Eje -x
k = 1
while(posicionTorre.x - k >= 0) {
    movimientos_disponibles_Torre.push((posicionTorre.x - k, posicionTorre.y));
    k++;
}

// Eje -y
k = 1
while(posicionTorre.y - k >= 0) {
    movimientos_disponibles_Torre.push((posicionTorre.x, posicionTorre.y - k));
    k++;
}

// Movimientos dama (sin obstaculos)
movimientos_disponibles_dama = [];
// Movimiento transversal
k = 1
while(posicionDama.x + k < 8) {
    movimientos_disponibles_dama.push((posicionDama.x + k, posicionDama.y));
    k++;
}

// Eje +y
k = 1
while(posicionDama.y + k < 8) {
    movimientos_disponibles_dama.push((posicionDama.x, posicionDama.y + k));
    k++;
}

// Eje -x
k = 1
while(posicionDama.x - k >= 0) {
    movimientos_disponibles_dama.push((posicionDama.x - k, posicionDama.y));
    k++;
}

// Eje -y
k = 1
while(posicionDama.y - k >= 0) {
    movimientos_disponibles_dama.push((posicionDama.x, posicionDama.y - k));
    k++;
}

// Movimiento diagonal
// Diagonal primer cuadrante
k = 1
while(posicionDama.x + k < 8) {
    movimientos_disponibles_dama.push((posicionDama.x + k, posicionDama.y + k));
    k++;
}

// Diagonal segundo cuadrante
k = 1
while(posicionDama.x - k >= 0) {
    movimientos_disponibles_dama.push((posicionDama.x - k, posicionDama.y + k));
    k++;
}

// Diagonal tercer cuadrante
k = 1
while(posicionDama.x - k >= 0) {
    movimientos_disponibles_dama.push((posicionDama.x - k, posicionDama.y - k));
    k++;
}
// Diagonal cuarto cuadrante
k = 1
while(posicionDama.x + k < 8) {
    movimientos_disponibles_dama.push((posicionDama.x + k, posicionDama.y - k));
    k++;
}


// Movimiento rey
movimientos_disponibles_rey = [];
if(posicionRey.x + 1 < 8) {
    movimientos_disponibles_rey.push((posicionRey.x + 1, posicionRey.y));
}
if(posicionRey.x + 1 < 8 && posicionRey.y + 1 < 8) {
    movimientos_disponibles_rey.push((posicionRey.x + 1, posicionRey.y + 1));
}

if(posicionRey.y + 1 < 8) {
    movimientos_disponibles_rey.push((posicionRey.x, posicionRey.y + 1));
}
if(posicionRey.x - 1 >= 0 && posicionRey.y + 1) {
    movimientos_disponibles_rey.push((posicionRey.x - 1, posicionRey.y + 1));
}

if(posicionRey.x - 1 >= 0) {
    movimientos_disponibles_rey.push((posicionRey.x - 1, posicionRey.y));
}
if(posicionRey.x - 1 >= 0 && posicionRey.y - 1 >= 0) {
    movimientos_disponibles_rey.push((posicionRey.x - 1, posicionRey.y - 1));
}

if(posicionRey.y - 1 >= 0) {
    movimientos_disponibles_rey.push((posicionRey.x, posicionRey.y - 1));
}
if(posicionRey.x + 1 < 8 && posicionRey.y - 1 >= 0) {
    movimientos_disponibles_rey.push((posicionRey.x - 1, posicionRey.y - 1));
}




if(posicionRey.x + 1 < 8) {
    movimientos_disponibles_rey.push((posicionRey.x + 1, posicionRey.y));
}
if(posicionRey.x + 1 < 8) {
    movimientos_disponibles_rey.push((posicionRey.x + 1, posicionRey.y));
}

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
     && !HayPiezasEnFila(posicionTorre.x, posicionRey.y) && colorRey != colorTorre) {
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
if(abs(posicionAlfil.x - posicionRey.x) == abs(posicionAlfil.x - posicionRey.x) && 
!HayPiezasEnDiagonal(posicionAlfil.x, posicionAlfil.y, posicionRey.x, posicionRey.y)) {
    hay_jaque = true;
}

// Jaque dama
if(abs(posicionDama.x - posicionRey.x) == abs(posicionDama.x - posicionRey.x) && 
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
   && !HayPiezasEnFila(posicionDama.x, posicionRey.y) && colorRey != colorDama) {
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