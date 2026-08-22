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

    obtenerHorasOcupadas,

    cambiarEstado,

    eliminarCita

} = require("../controllers/citaController");

// =======================================
// Rutas públicas
// =======================================

router.post(
    "/solicitar",
    solicitarCita
);

// Solo devuelve un arreglo de horas ocupadas (ej. ["09:00", "11:30"]),
// nunca datos de pacientes ni el documento completo de la cita.
router.get(
    "/disponibilidad/:odontologoId/:fecha",
    obtenerHorasOcupadas
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
