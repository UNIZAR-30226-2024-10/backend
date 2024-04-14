const express = require("express")
const { Pool } = require('pg'); // Importar el cliente PostgreSQL
const bcrypt = require('bcrypt');
const router = express.Router();

// // Configuración de la conexión a la base de datos
const pool = new Pool({
    user: 'ugfchsan0qbfkvhvyuwl',
    host: 'bm9v4y7glvvz5acg8lj3-postgresql.services.clever-cloud.com',
    database: 'bm9v4y7glvvz5acg8lj3',
    password: 'FL2O9CrTAJ89cBxbHihI',
    port: 50013 // Puerto por defecto de PostgreSQL
});

// Ruta /users/all, con la lista de todos los usuarios
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

// Route /users/login to log in a user
router.post("/login", async (req, res) => {
    // Get user credentials from the request body
    const { nombre, contraseña } = req.body;

    

    try {
        // Query to fetch user data based on email
        const getUserQuery = `
            SELECT id, nombre, contraseña
            FROM Miguel.Usuario
            WHERE nombre = $1
        `;

        // Execute the query to fetch user data
        const { rows } = await pool.query(getUserQuery, [nombre]);

        // If no user found with the provided username
        if (rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const user = rows[0];

        // Check if the provided password matches the hashed password stored in the database
        const isPasswordMatch = await bcrypt.compare(contraseña, user.contraseña);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // If password matches, create a session for the user
        req.session.userId = user.id;

        res.status(200).json({ message: "Inicio de sesión exitoso" });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
});



// Ruta /users/register, para registrar un nuevo usuario
router.post("/register", async (req, res) => {
    // Obtener los datos del usuario desde el cuerpo de la solicitud
    const { nombre, contraseña, correoElectronico} = req.body;

    try {
        // Generar un hash de la contraseña utilizando bcrypt
        const hashedPassword = await bcrypt.hash(contraseña, 8);

        // Consulta SQL para insertar un nuevo usuario en la tabla Usuario
        const insertUserQuery = `
            INSERT INTO Miguel.Usuario (nombre, contraseña, correoElectronico)
            VALUES ($1, $2, $3)
        `;

        // Parámetros para la consulta SQL
        const values = [nombre, hashedPassword, correoElectronico];

        // Ejecutar la consulta para insertar el nuevo usuario
        await pool.query(insertUserQuery, values);
        
        console.log('Usuario registrado exitosamente');
        res.status(200).json({ message: "Registro exitoso" });
    } catch (error) {
        console.error('Error al registrar un nuevo usuario:', error);
        res.status(500).json({ message: "Error al registrar un nuevo usuario" });
    }
});


// Route /users/logout to log out a user
router.post("/logout", (req, res) => {
    try {
        // Destroy the user's session
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                return res.status(500).json({ message: "Error al cerrar sesión" });
            }
            // Session destroyed successfully
            res.status(200).json({ message: "Sesión cerrada exitosamente" });
        });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        res.status(500).json({ message: "Error al cerrar sesión" });
    }
});


router.route("/:id")
    // Obtener info de un usuario en concreto (perfil)
    .get(async (req, res) => {
        const userId = req.params.id;

        try {
            // Query to fetch user data based on ID
            const getUserQuery = `
                SELECT id, nombre, correoElectronico
                FROM Miguel.Usuario
                WHERE id = $1
            `;
            
            // Execute the query to fetch user data
            const { rows } = await pool.query(getUserQuery, [userId]);

            // If no user found with the provided ID
            if (rows.length === 0) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            const user = rows[0];
            res.status(200).json(user);
        } catch (error) {
            console.error('Error al obtener información del usuario:', error);
            res.status(500).json({ message: "Error al obtener información del usuario" });
        }
    })
    // Actualizar un usuario en concreto
    .put(async (req, res) => {
        const userId = req.params.id;
        const { nombre, contraseña, correoElectronico } = req.body;

        try {
            // Query to update user data
            const updateUserQuery = `
                UPDATE Miguel.Usuario
                SET nombre = $1, contraseña = $2, correoElectronico = $3
                WHERE id = $4
            `;
            
            // Execute the query to update user data
            await pool.query(updateUserQuery, [nombre, contraseña, correoElectronico, userId]);

            res.status(200).json({ message: "Usuario actualizado exitosamente" });
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ message: "Error al actualizar el usuario" });
        }
    })
    // Borrar un usuario en concreto
    .delete(async (req, res) => {
        const userId = req.params.id;

        try {
            // Query to delete user data
            const deleteUserQuery = `
                DELETE FROM Miguel.Usuario
                WHERE id = $1
            `;
            
            // Execute the query to delete user data
            await pool.query(deleteUserQuery, [userId]);

            res.status(200).json({ message: "Usuario eliminado exitosamente" });
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            res.status(500).json({ message: "Error al eliminar el usuario" });
        }
    });


// Ruta /users/notifications, para las notificaciones de los usuarios (modo asíncrono)
router.get("/notifications", (req, res) => {

})

router.get("/leaderboard/:mode", async (req, res) => {
    const mode = req.params.mode;

    try {
        let eloColumn;
        switch (mode) {
            case 'blitz':
                eloColumn = 'eloblitz';
                break;
            case 'bullet':
                eloColumn = 'elobullet';
                break;
            case 'rapid':
                eloColumn = 'elorapid';
                break;
            default:
                return res.status(400).json({ message: "Modo de liderazgo no válido" });
        }

        // Query to fetch users sorted by the specified ELO column
        const getUsersQuery = `
            SELECT id, nombre, ${eloColumn} AS elo
            FROM Miguel.Usuario
            ORDER BY ${eloColumn} DESC
        `;
        
        // Execute the query to fetch users
        const { rows } = await pool.query(getUsersQuery);

        // Send the sorted leaderboard as JSON response
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener el leaderboard:', error);
        res.status(500).json({ message: "Error al obtener el leaderboard" });
    }
});


module.exports = router;