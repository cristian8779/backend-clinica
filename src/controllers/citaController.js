const citaService = require("../services/citaService");

const solicitarCita = async (req, res) => {

    try {

        const cita = await citaService.solicitarCita(req.body);

        res.status(201).json({
            ok: true,
            mensaje: "La cita fue registrada correctamente.",
            cita
        });

    } catch (error) {

        res.status(400).json({
            ok: false,
            mensaje: error.message
        });

    }

};

const obtenerCitas = async (req, res) => {

    try {

        const citas = await citaService.obtenerCitas();

        res.json({
            ok: true,
            mensaje: citas.length
                ? "Lista de citas obtenida correctamente."
                : "Aún no hay citas registradas.",
            citas
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            mensaje: error.message
        });

    }

};

const obtenerCita = async (req, res) => {

    try {

        const cita = await citaService.obtenerCita(req.params.id);

        if (!cita) {

            return res.status(404).json({
                ok: false,
                mensaje: "La cita no existe."
            });

        }

        res.json({
            ok: true,
            cita
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            mensaje: error.message
        });

    }

};

const obtenerCitasPaciente = async (req, res) => {

    try {

        const citas = await citaService.obtenerCitasPaciente(
            req.params.id
        );

        res.json({
            ok: true,
            citas
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            mensaje: error.message
        });

    }

};

const obtenerCitasOdontologo = async (req, res) => {

    try {

        const citas = await citaService.obtenerCitasOdontologo(
            req.params.id
        );

        res.json({
            ok: true,
            citas
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            mensaje: error.message
        });

    }

};

const obtenerCitasFecha = async (req, res) => {

    try {

        const citas = await citaService.obtenerCitasFecha(
            req.params.fecha
        );

        res.json({
            ok: true,
            citas
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            mensaje: error.message
        });

    }

};

const cambiarEstado = async (req, res) => {

    try {

        const cita = await citaService.cambiarEstado(
            req.params.id,
            req.body.estado
        );

        if (!cita) {

            return res.status(404).json({
                ok: false,
                mensaje: "La cita no existe."
            });

        }

        res.json({
            ok: true,
            mensaje: "Estado actualizado correctamente.",
            cita
        });

    } catch (error) {

        res.status(400).json({
            ok: false,
            mensaje: error.message
        });

    }

};

const eliminarCita = async (req, res) => {

    try {

        const cita = await citaService.eliminarCita(
            req.params.id
        );

        if (!cita) {

            return res.status(404).json({
                ok: false,
                mensaje: "La cita no existe."
            });

        }

        res.json({
            ok: true,
            mensaje: "Cita eliminada correctamente."
        });

    } catch (error) {

        res.status(400).json({
            ok: false,
            mensaje: error.message
        });

    }

};

module.exports = {

    solicitarCita,

    obtenerCitas,

    obtenerCita,

    obtenerCitasPaciente,

    obtenerCitasOdontologo,

    obtenerCitasFecha,

    cambiarEstado,

    eliminarCita

};