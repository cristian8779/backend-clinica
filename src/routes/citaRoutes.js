const express = require("express");

const router = express.Router();

const validarJWT = require("../middlewares/validarJWT");

const {

    solicitarCita,

    obtenerCitas,

    obtenerCita,

    obtenerCitasPaciente,

    obtenerCitasOdontologo,

    obtenerCitasFecha,

    cambiarEstado,

    eliminarCita

} = require("../controllers/citaController");

// =======================================
// Ruta pública
// =======================================

router.post(
    "/solicitar",
    solicitarCita
);

// =======================================
// Rutas protegidas (Administrador)
// =======================================

router.get(
    "/",
    validarJWT,
    obtenerCitas
);

router.get(
    "/:id",
    validarJWT,
    obtenerCita
);

router.get(
    "/paciente/:id",
    validarJWT,
    obtenerCitasPaciente
);

router.get(
    "/odontologo/:id",
    validarJWT,
    obtenerCitasOdontologo
);

router.get(
    "/fecha/:fecha",
    validarJWT,
    obtenerCitasFecha
);

router.put(
    "/:id/estado",
    validarJWT,
    cambiarEstado
);

router.delete(
    "/:id",
    validarJWT,
    eliminarCita
);

module.exports = router;