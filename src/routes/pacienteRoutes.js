const express = require("express");

const router = express.Router();

const validarJWT = require("../middlewares/validarJWT");

const {

    obtenerPacientes,

    obtenerPaciente,

    buscarPaciente,

    crearPaciente,

    actualizarPaciente,

    eliminarPaciente

} = require("../controllers/pacienteController");

// ==========================
// Consultar pacientes
// ==========================
router.get(
    "/",
    validarJWT,
    obtenerPacientes
);

router.get(
    "/buscar/:termino",
    validarJWT,
    buscarPaciente
);

router.get(
    "/:id",
    validarJWT,
    obtenerPaciente
);

// ==========================
// Gestionar pacientes
// ==========================
router.post(
    "/",
    validarJWT,
    crearPaciente
);

router.put(
    "/:id",
    validarJWT,
    actualizarPaciente
);

router.delete(
    "/:id",
    validarJWT,
    eliminarPaciente
);

module.exports = router;