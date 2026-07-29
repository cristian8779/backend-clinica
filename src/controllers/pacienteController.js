const pacienteService = require("../services/pacienteService");

const obtenerPacientes = async (req, res) => {
    try {
        const pacientes = await pacienteService.obtenerPacientes();

        res.json({
            ok: true,
            mensaje: pacientes.length > 0
                ? "Lista de pacientes obtenida correctamente."
                : "Aún no hay pacientes registrados.",
            pacientes
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: error.message || "Ocurrió un error al obtener la lista de pacientes."
        });
    }
};

const obtenerPaciente = async (req, res) => {
    try {
        const paciente = await pacienteService.obtenerPaciente(req.params.id);

        if (!paciente) {
            return res.status(404).json({
                ok: false,
                mensaje: "No se encontró el paciente solicitado."
            });
        }

        res.json({
            ok: true,
            mensaje: "Información del paciente obtenida correctamente.",
            paciente
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: error.message || "Ocurrió un error al obtener la información del paciente."
        });
    }
};

const buscarPaciente = async (req, res) => {
    try {
        const pacientes = await pacienteService.buscarPaciente(req.params.termino);

        res.json({
            ok: true,
            mensaje: pacientes.length > 0
                ? "Se encontraron pacientes que coinciden con la búsqueda."
                : "No se encontraron pacientes con los datos ingresados.",
            pacientes
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: error.message || "Ocurrió un error al realizar la búsqueda."
        });
    }
};

const crearPaciente = async (req, res) => {
    try {
        const paciente = await pacienteService.crearPaciente(req.body);

        res.status(201).json({
            ok: true,
            mensaje: "Paciente registrado correctamente.",
            paciente
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: error.message || "No fue posible registrar al paciente."
        });
    }
};

const actualizarPaciente = async (req, res) => {
    try {
        const paciente = await pacienteService.actualizarPaciente(
            req.params.id,
            req.body
        );

        if (!paciente) {
            return res.status(404).json({
                ok: false,
                mensaje: "No se encontró el paciente que deseas actualizar."
            });
        }

        res.json({
            ok: true,
            mensaje: "La información del paciente se actualizó correctamente.",
            paciente
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: error.message || "No fue posible actualizar la información del paciente."
        });
    }
};

const eliminarPaciente = async (req, res) => {
    try {
        const paciente = await pacienteService.eliminarPaciente(req.params.id);

        if (!paciente) {
            return res.status(404).json({
                ok: false,
                mensaje: "No se encontró el paciente que deseas eliminar."
            });
        }

        res.json({
            ok: true,
            mensaje: "Paciente eliminado correctamente."
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: error.message || "No fue posible eliminar el paciente."
        });
    }
};

module.exports = {
    obtenerPacientes,
    obtenerPaciente,
    buscarPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente
};