const especialidadService = require("../services/especialidadService");

const obtenerEspecialidades = async (req, res) => {
    try {

        const especialidades = await especialidadService.obtenerEspecialidades();

        res.json({
            ok: true,
            especialidades
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            mensaje: error.message
        });

    }
};

const obtenerEspecialidad = async (req, res) => {

    try {

        const especialidad = await especialidadService.obtenerEspecialidad(req.params.id);

        res.json({
            ok: true,
            especialidad
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            mensaje: error.message
        });

    }

};

const crearEspecialidad = async (req, res) => {

    try {

        const especialidad = await especialidadService.crearEspecialidad(req.body);

        res.status(201).json({
            ok: true,
            especialidad
        });

    } catch (error) {

        res.status(400).json({
            ok: false,
            mensaje: error.message
        });

    }

};

const actualizarEspecialidad = async (req, res) => {

    try {

        const especialidad = await especialidadService.actualizarEspecialidad(
            req.params.id,
            req.body
        );

        res.json({
            ok: true,
            especialidad
        });

    } catch (error) {

        res.status(400).json({
            ok: false,
            mensaje: error.message
        });

    }

};

const eliminarEspecialidad = async (req, res) => {

    try {

        await especialidadService.eliminarEspecialidad(req.params.id);

        res.json({
            ok: true,
            mensaje: "Especialidad eliminada correctamente."
        });

    } catch (error) {

        res.status(400).json({
            ok: false,
            mensaje: error.message
        });

    }

};

module.exports = {
    obtenerEspecialidades,
    obtenerEspecialidad,
    crearEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad
};