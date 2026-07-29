const express = require("express");

const router = express.Router();

const {

    obtenerOdontologos,

    obtenerOdontologo,

    crearOdontologo,

    actualizarOdontologo,

    eliminarOdontologo

} = require("../controllers/odontologoController");

router.get("/", obtenerOdontologos);

router.get("/:id", obtenerOdontologo);

router.post("/", crearOdontologo);

router.put("/:id", actualizarOdontologo);

router.delete("/:id", eliminarOdontologo);

module.exports = router;