const sqlite3 = require('sqlite3').verbose();

class Jugador {
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath);
        this.createTable();
    }

    createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS jugadores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre_usuario TEXT NOT NULL UNIQUE,
                puntuacion_bullet INTEGER DEFAULT 1500,
                puntuacion_blitz INTEGER DEFAULT 1500,
                puntuacion_rapid INTEGER DEFAULT 1500
            )
        `;
        this.db.run(query, err => {
            if (err) {
                console.error('Error al crear la tabla de jugadores:', err.message);
            } else {
                console.log('Tabla de jugadores creada exitosamente.');
            }
        });
    }

    agregarJugador(nombre_usuario, puntuacion_bullet = 1500, puntuacion_blitz = 1500, puntuacion_rapid = 1500) {
        const query = 'INSERT INTO jugadores (nombre_usuario, puntuacion_bullet, puntuacion_blitz, puntuacion_rapid) VALUES (?, ?, ?, ?)';
        this.db.run(query, [nombre_usuario, puntuacion_bullet, puntuacion_blitz, puntuacion_rapid], err => {
            if (err) {
                console.error('Error al agregar jugador:', err.message);
            } else {
                console.log('Jugador agregado exitosamente.');
            }
        });
    }

    mostrarJugadores() {
        const query = 'SELECT * FROM jugadores';
        this.db.all(query, (err, rows) => {
            if (err) {
                console.error('Error al obtener jugadores:', err.message);
            } else {
                console.log('Lista de jugadores:');
                rows.forEach(row => {
                    console.log(row);
                });
            }
        });
    }

    cerrarConexion() {
        this.db.close(err => {
            if (err) {
                console.error('Error al cerrar la conexión con la base de datos:', err.message);
            } else {
                console.log('Conexión cerrada exitosamente.');
            }
        });
    }
}

module.exports = Jugador;