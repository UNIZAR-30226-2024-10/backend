const express = require("express")
const pool = require('../db');
const bcrypt = require('bcrypt');
const router = express.Router();


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

// Ruta /users/all_asignaciones, con la lista de todos los usuarios
router.get("/all_asignaciones", (req, res) => {
    // Consulta SQL para seleccionar todos los usuarios de la tabla Usuario
    const selectAllAsignacionesQuery = `
        SELECT * FROM Miguel.Posee
    `;

    // Ejecutar la consulta para seleccionar todos los usuarios
    pool.query(selectAllAsignacionesQuery, (error, result) => {
        if (error) {
            console.error('Error al obtener todas las asignaciones usuarios-recompensas:', error);
            res.status(500).json({ message: "Error al obtener todas las asignaciones usuarios-recompensas" });
        } else {
            console.log('Asignaciones usuarios-recompensas obtenidos exitosamente');
            res.status(200).json(result.rows); // Enviar la lista de usuarios como respuesta
        }
    });
});

// Ruta /users/all_rewards, con la lista de todos los usuarios
router.get("/all_rewards", (req, res) => {
    // Consulta SQL para seleccionar todos los usuarios de la tabla Usuario
    const selectAllUsersQuery = `
        SELECT * FROM Miguel.Recompensas
    `;

    // Ejecutar la consulta para seleccionar todos los usuarios
    pool.query(selectAllUsersQuery, (error, result) => {
        if (error) {
            console.error('Error al obtener todas las recompensas:', error);
            res.status(500).json({ message: "Error al obtener todas las recompensas" });
        } else {
            console.log('Recompensas obtenidas exitosamente');
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
    const { nombre, contraseña, correoElectronico, victorias, empates, derrotas} = req.body;

    try {
        // Generar un hash de la contraseña utilizando bcrypt
        const hashedPassword = await bcrypt.hash(contraseña, 8);

        // Consulta SQL para insertar un nuevo usuario en la tabla Usuario
        const insertUserQuery = `
            INSERT INTO Miguel.Usuario (nombre, contraseña, correoElectronico, victorias, empates, derrotas)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;

        // Parámetros para la consulta SQL
        const values = [nombre, hashedPassword, correoElectronico, victorias, empates, derrotas];

        // Ejecutar la consulta para insertar el nuevo usuario
        await pool.query(insertUserQuery, values);
        
        console.log('Usuario registrado exitosamente');
        res.status(200).json({ message: "Registro exitoso" });
    } catch (error) {
        console.error('Error al registrar un nuevo usuario:', error);
        res.status(500).json({ message: "Error al registrar un nuevo usuario" });
    }
});

// Ruta /users/register_rewards, para registrar una nueva recompensa
router.post("/register_rewards", async (req, res) => {
    // Obtener los datos de la recompensa desde el cuerpo de la solicitud
    const { tipo, descripcion } = req.body;

    try {
        // Consulta SQL para insertar una nueva recompensa en la tabla Recompensas
        const insertRewardQuery = `
            INSERT INTO Miguel.Recompensas (Tipo, Descripcion)
            VALUES ($1, $2)
        `;

        // Parámetros para la consulta SQL
        const values = [tipo, descripcion];

        // Ejecutar la consulta para insertar la nueva recompensa
        await pool.query(insertRewardQuery, values);
        
        console.log('Recompensa registrada exitosamente');
        res.status(200).json({ message: "Registro exitoso" });
    } catch (error) {
        console.error('Error al registrar una nueva recompensa:', error);
        res.status(500).json({ message: "Error al registrar una nueva recompensa" });
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

// Route /users/actualizar_recompensa/:id_usuario/:id_recompensa
router.put("/actualizar_recompensa/:id_usuario/:id_recompensa", async (req, res) => {
    const userId = req.params.id_usuario; // Corrected parameter name
    const rewardId = req.params.id_recompensa; // Corrected parameter name

        try {
            
            const insertIntoPoseeQuery = `
            INSERT INTO Miguel.posee (UsuarioId, RecompensaId)
            VALUES ($1, $2)
        `;
            
        await pool.query(insertIntoPoseeQuery, [userId, rewardId]);

            res.status(200).json({ message: "Recompensa asignada exitosamente" });
        } catch (error) {
            console.error('Error al asignar la recomepnsa:', error);
            res.status(500).json({ message: "Error al asignar la recompensa" });
        }
});

// Route /users/:id
router.route("/:id")
    // Obtener info de un usuario en concreto (perfil)
    .get(async (req, res) => {
        const userId = req.params.id;

        try {
            // Query to fetch user data based on ID
            const getUserQuery = `
                SELECT u.*,
                    COALESCE(MAX(p.recompensaid), 0) AS recompensaMasAlta,
                    COALESCE(u.Victorias, 0) * 4 + COALESCE(u.Empates, 0) * 2 + COALESCE(u.Derrotas, 0) AS puntosExperiencia
                FROM Miguel.Usuario u
                LEFT JOIN Miguel.posee p ON u.id = p.usuarioid
                WHERE u.id = $1
                GROUP BY u.id;
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
// Ruta /users/actualizar_puntos/:modo/:idGanador/:idPerdedor, para que se actualicen los ELO de los jugadores
router.post("/actualizar_puntos/:modo/:idGanador/:idPerdedor/:esEmpate", async (req, res) => {
    const { idGanador, idPerdedor, esEmpate } = req.params;
    const modo = req.params.modo;
  
      try {

        let eloColumn;
        switch (modo) {
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

        // Actualización de ELO -------------------------------------------------------------------------
          
        const obtenerELOJugadorQuery = `
            SELECT u.${eloColumn} AS elo
            FROM Miguel.Usuario u
            WHERE u.id = $1;
        `;

        const { rows: puntuacionGanador } = await pool.query(obtenerELOJugadorQuery, [idGanador]);
        const { rows: puntuacionPerdedor } = await pool.query(obtenerELOJugadorQuery, [idPerdedor]);

        // Check if ganador is undefined or if it has zero length
        if (!puntuacionGanador || puntuacionGanador.length === 0) {
            return res.status(404).json({ message: "Usuario ganador no encontrado" });
        }
        if (!puntuacionPerdedor || puntuacionPerdedor.length === 0) {
            return res.status(404).json({ message: "Usuario perdedor no encontrado" });
        }

        const usuarioGanador = puntuacionGanador[0];
        const usuarioPerdedor = puntuacionPerdedor[0];

        console.log('ELO Usuario ganador:', usuarioGanador.elo);
        console.log('XP Usuario ganador:', usuarioGanador.puntosexperiencia);

        console.log('ELO Usuario perdedor:', usuarioPerdedor.elo);
        console.log('XP Usuario perdedor:', usuarioPerdedor.puntosexperiencia);
          
          const K = 20;
          const puntuacionEsperadaGanador = 1 / (1 + 10 ** ((usuarioPerdedor.elo - usuarioGanador.elo) / 400));
          const puntuacionEsperadaPerdedor = 1 - puntuacionEsperadaGanador;
  
          const nuevoELOGanador = usuarioGanador.elo + Math.round(K * (1 - puntuacionEsperadaGanador));
          const nuevoELOPerdedor = usuarioPerdedor.elo + Math.round(K * (0 - puntuacionEsperadaPerdedor));
  
  
        
        const updateELOGanador = `UPDATE Miguel.Usuario SET ${eloColumn} = $1 WHERE Id = $2;`;
        await pool.query(updateELOGanador, [nuevoELOGanador, idGanador]);

        const updateELOPerdedor = `UPDATE Miguel.Usuario SET ${eloColumn} = $1 WHERE Id = $2;`;
        await pool.query(updateELOPerdedor, [nuevoELOPerdedor, idPerdedor]);
        
        console.log("Nuevo ELO ganador:", nuevoELOGanador);
        console.log("Nuevo ELO perdedor:", nuevoELOPerdedor);

        // Actualización de victorias y derrotas -------------------------------------------------------------------------

        const obtenerPuntosJugadorQuery = `
            SELECT
                u.Victorias,
                u.Empates,
                u.Derrotas
            FROM Miguel.Usuario u
            WHERE u.id = $1;
        `;

        if(esEmpate === "true"){   // Si es empate
            const { rows: metricasJugador1 } = await pool.query(obtenerPuntosJugadorQuery, [idGanador]);
            const metricasUsuarioJugador1 = metricasJugador1[0];
            const nuevosEmpatesJugador1 = metricasUsuarioJugador1.empates + 1;
            const updateEmpatesJugador1 = `UPDATE Miguel.Usuario SET empates = $1 WHERE Id = $2;`;
            await pool.query(updateEmpatesJugador1, [nuevosEmpatesJugador1, idGanador]);

            const { rows: metricasJugador2 } = await pool.query(obtenerPuntosJugadorQuery, [idPerdedor]);
            const metricasUsuarioJugador2 = metricasJugador2[0];
            const nuevosEmpatesJugador2 = metricasUsuarioJugador2.empates + 1;
            const updateEmpatesJugador2 = `UPDATE Miguel.Usuario SET empates = $1 WHERE Id = $2;`;
            await pool.query(updateEmpatesJugador2, [nuevosEmpatesJugador2, idPerdedor]);
            
        }
        else {  // Si hay un ganador
            const { rows: metricasGanador } = await pool.query(obtenerPuntosJugadorQuery, [idGanador]);
            const metricasUsuarioGanador = metricasGanador[0];
            const nuevasVictorias = metricasUsuarioGanador.victorias + 1;
            const updateVictoriasGanador = `UPDATE Miguel.Usuario SET victorias = $1 WHERE Id = $2;`;
            await pool.query(updateVictoriasGanador, [nuevasVictorias, idGanador]);
            

            const { rows: metricasPerdedor } = await pool.query(obtenerPuntosJugadorQuery, [idPerdedor]);
            const metricasUsuarioPerdedor = metricasPerdedor[0];
            const nuevasDerrotas = metricasUsuarioPerdedor.derrotas + 1;
            const updateDerrotasPerdedor = `UPDATE Miguel.Usuario SET derrotas = $1 WHERE Id = $2;`;
            await pool.query(updateDerrotasPerdedor, [nuevasDerrotas, idPerdedor]);
        }

        

  
        res.status(200).json({ message: 'ELO ratings updated successfully' });
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating ELO ratings' });
        }
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