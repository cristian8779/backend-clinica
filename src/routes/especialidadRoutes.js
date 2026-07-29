const express = require("express");

const router = express.Router();

const {
    obtenerEspecialidades,
    obtenerEspecialidad,
    crearEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad
} = require("../controllers/especialidadController");

router.get("/", obtenerEspecialidades);

router.get("/:id", obtenerEspecialidad);

router.post("/", crearEspecialidad);

router.put("/:id", actualizarEspecialidad);

router.delete("/:id", eliminarEspecialidad);

module.exports = router;