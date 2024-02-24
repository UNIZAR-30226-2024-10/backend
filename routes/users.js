const express = require("express")

const router = express.Router()

// Ruta /users, con la lista de todos los usuarios
router.get("/", (req, res) => {
    // res.status(500).json({message: "No implementado" });
})

// Ruta /users/login, para iniciar sesión con un nuevo usuario
router.get("/login", (req, res) => {

})

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