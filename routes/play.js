const express = require("express")

const router = express.Router()


// Ruta /play, para poder iniciar a jugar (como un lobby)
router.post("/:id", (req, res) => {

})

// Ruta /play/select_mode, para que el usuario pueda elegir si jugar bullet, blitz o rapid
router.post("/select_mode:id", (req, res) => {

})

module.exports = router;