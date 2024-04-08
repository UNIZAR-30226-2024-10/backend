const express = require("express")
const { Pool } = require('pg'); // Importar el cliente PostgreSQL
const router = express.Router();

// // Configuración de la conexión a la base de datos
const pool = new Pool({
    user: 'ugfchsan0qbfkvhvyuwl',
    host: 'bm9v4y7glvvz5acg8lj3-postgresql.services.clever-cloud.com',
    database: 'bm9v4y7glvvz5acg8lj3',
    password: 'FL2O9CrTAJ89cBxbHihI',
    port: 50013 // Puerto por defecto de PostgreSQL
});

// Ruta /users, con la lista de todos los usuarios
router.get("/all", (req, res) => {
    // Consulta SQL para seleccionar todos los usuarios de la tabla Usuario
    const selectAllUsersQuery = `
        SELECT * FROM Miguel.Usuario
    `;

    // Ejecutar la consulta para seleccionar todos los usuarios
    pool.query(selectAllUsersQuery, (error, result) => {
        if (error) {
            console.error('Error al obtener todos los usuarios:', error);
            res.status(500).json({ message: "Error al obtener todos los usuarios" });
        } else {
            console.log('Usuarios obtenidos exitosamente');
            res.status(200).json(result.rows); // Enviar la lista de usuarios como respuesta
        }
    });
});

// Ruta /users/login, para iniciar sesión con un nuevo usuario
router.get("/login", (req, res) => {

})

// Ruta /users/register, para registrar un nuevo usuario
router.post("/register", (req, res) => {
    // Obtener los datos del usuario desde el cuerpo de la solicitud
    const { nombre, contraseña, correoElectronico, eloBlitz, eloRapid, eloBullet, victorias, derrotas, empates, arena } = req.body;

    // Consulta SQL para insertar un nuevo usuario en la tabla Usuario
    const insertUserQuery = `
        INSERT INTO Miguel.Usuario (nombre, contraseña, correoElectronico)
        VALUES ($1, $2, $3)
    `;


    // Parámetros para la consulta SQL
    const values = [nombre, contraseña, correoElectronico];

    // Ejecutar la consulta para insertar el nuevo usuario
    pool.query(insertUserQuery, values, (error, result) => {
        if (error) {
            console.error('Error al registrar un nuevo usuario:', error);
            res.status(500).json({ message: "Error al registrar un nuevo usuario" });
        } else {
            console.log('Usuario registrado exitosamente');
            res.status(200).json({ message: "Registro exitoso" });
        }
    });
});
// Ruta /users/register, para iniciar sesión con un nuevo usuario
router.get("/register", (req, res) => {

})

// Ruta /users/registered_successfully, para crear nuevos usuarios
router.get("/registered_successfully", (req, res) => {

})

// Ruta /users/logout, para crear nuevos usuarios
router.get("/logout", (req, res) => {

})

router.route("/:id")
    // Obtener info de un usuario en concreto (perfil)
    .get((req, res) => {

    })
    // Actualizar un usuario en concreto
    .put((req, res) => {

    })
    // Borrar un usuario en concreto
    .delete((req, res) => {

    })






// Ruta /users/reset_password, para crear nuevos usuarios (igual es parte del put)
router.get("/reset_password", (req, res) => {

})

// Ruta /users/notifications, para las notificaciones de los usuarios (modo asíncrono)
router.get("/notifications", (req, res) => {

})

// Ruta /users/leaderboard, para ver la tabla de líderes
router.get("/leaderboard", (req, res) => {

})



module.exports = router;