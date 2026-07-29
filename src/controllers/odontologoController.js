const odontologoService = require("../services/odontologoService");

const obtenerOdontologos = async (req, res) => {
    try {
       const odontologos = await odontologoService.obtenerOdontologos();

   res.json({
    ok: true,
    mensaje: odontologos.length > 0
        ? "Lista de odontólogos obtenida correctamente."
        : "No hay odontólogos registrados por el momento.",
    odontologos
});
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: error.message || "Ocurrió un error al obtener los odontólogos."
        });
    }
};

const obtenerOdontologo = async (req, res) => {
    try {
        const odontologo = await odontologoService.obtenerOdontologo(req.params.id);

        res.json({
            ok: true,
            mensaje: "Odontólogo encontrado correctamente.",
            odontologo
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: error.message || "No se pudo obtener la información del odontólogo."
        });
    }
};

const crearOdontologo = async (req, res) => {
    try {
        const odontologo = await odontologoService.crearOdontologo(req.body);

        res.status(201).json({
            ok: true,
            mensaje: "Odontólogo registrado correctamente.",
            odontologo
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: error.message || "No fue posible registrar el odontólogo."
        });
    }
};

const actualizarOdontologo = async (req, res) => {
    try {
        const odontologo = await odontologoService.actualizarOdontologo(
            req.params.id,
            req.body
        );

        res.json({
            ok: true,
            mensaje: "Información del odontólogo actualizada correctamente.",
            odontologo
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: error.message || "No fue posible actualizar el odontólogo."
        });
    }
};

const eliminarOdontologo = async (req, res) => {
    try {
        await odontologoService.eliminarOdontologo(req.params.id);

        res.json({
            ok: true,
            mensaje: "Odontólogo eliminado correctamente."
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: error.message || "No fue posible eliminar el odontólogo."
        });
    }
};

module.exports = {
    obtenerOdontologos,
    obtenerOdontologo,
    crearOdontologo,
    actualizarOdontologo,
    eliminarOdontologo
};