// Peón
// Movimientos disponibles (peon en x, y)

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




if(posicionRey.x + 1 < 8) {
    movimientos_disponibles_rey.push((posicionRey.x + 1, posicionRey.y));
}
if(posicionRey.x + 1 < 8) {
    movimientos_disponibles_rey.push((posicionRey.x + 1, posicionRey.y));
}
