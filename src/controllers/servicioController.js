const servicioService = require("../services/servicioService");

const obtenerServicios = async (req, res) => {
    try {
        const servicios = await servicioService.obtenerServicios();

        res.json({
            ok: true,
            mensaje: servicios.length > 0
                ? "Lista de servicios obtenida correctamente."
                : "No hay servicios registrados por el momento.",
            servicios
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: error.message || "Ocurrió un error al obtener los servicios."
        });
    }
};

const obtenerServicio = async (req, res) => {
    try {
        const servicio = await servicioService.obtenerServicio(req.params.id);

        if (!servicio) {
            return res.status(404).json({
                ok: false,
                mensaje: "Servicio no encontrado."
            });
        }

        res.json({
            ok: true,
            mensaje: "Servicio obtenido correctamente.",
            servicio
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: error.message || "Ocurrió un error al obtener el servicio."
        });
    }
};

const crearServicio = async (req, res) => {
    try {
        const servicio = await servicioService.crearServicio(req.body);

        res.status(201).json({
            ok: true,
            mensaje: "Servicio creado correctamente.",
            servicio
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: error.message || "No fue posible crear el servicio."
        });
    }
};

const actualizarServicio = async (req, res) => {
    try {
        const servicio = await servicioService.actualizarServicio(
            req.params.id,
            req.body
        );

        if (!servicio) {
            return res.status(404).json({
                ok: false,
                mensaje: "Servicio no encontrado."
            });
        }

        res.json({
            ok: true,
            mensaje: "Servicio actualizado correctamente.",
            servicio
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: error.message || "No fue posible actualizar el servicio."
        });
    }
};

const eliminarServicio = async (req, res) => {
    try {
        const servicio = await servicioService.eliminarServicio(req.params.id);

        if (!servicio) {
            return res.status(404).json({
                ok: false,
                mensaje: "Servicio no encontrado."
            });
        }

        res.json({
            ok: true,
            mensaje: "Servicio eliminado correctamente."
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: error.message || "No fue posible eliminar el servicio."
        });
    }
};

module.exports = {
    obtenerServicios,
    obtenerServicio,
    crearServicio,
    actualizarServicio,
    eliminarServicio
};