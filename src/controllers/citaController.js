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

const buscarCitas = async (req, res) => {
    try {
        const termino = String(req.query.q || "").trim();
        if (!termino) {
            return res.status(400).json({
                ok: false,
                mensaje: "Escribe un dato para buscar citas."
            });
        }

        const citas = await citaService.buscarCitas(termino);
        res.json({
            ok: true,
            mensaje: citas.length
                ? "Resultados de búsqueda obtenidos correctamente."
                : "No encontramos citas con esos datos.",
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

// =======================================
// Nueva función para la disponibilidad
// =======================================
const obtenerHorasOcupadas = async (req, res) => {
    try {
        const { odontologoId, fecha } = req.params;
        const horasOcupadas = await citaService.obtenerHorasOcupadas(odontologoId, fecha);

        res.json({
            ok: true,
            mensaje: "Horas ocupadas obtenidas correctamente.",
            horasOcupadas
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
    buscarCitas,
    obtenerCita,
    obtenerCitasPaciente,
    obtenerCitasOdontologo,
    obtenerCitasFecha,
    obtenerHorasOcupadas, // <--- Exportada aquí
    cambiarEstado,
    eliminarCita
};
