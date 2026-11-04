const authService = require("../services/authService");

const registrar = async (req, res) => {
    try {
        const administrador = await authService.registrar(req.body);

        res.status(201).json({
            ok: true,
            mensaje: "Administrador registrado correctamente. Ya puedes iniciar sesión.",
            administrador
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: error.message || "No fue posible registrar el administrador. Inténtalo nuevamente."
        });
    }
};

const login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const respuesta = await authService.login(correo, password);

        res.status(200).json({
            ok: true,
            mensaje: `¡Bienvenido, ${respuesta.administrador.nombre}!`,
            ...respuesta
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            mensaje: error.message || "Correo o contraseña incorrectos."
        });
    }
};

const solicitarRecuperacion = async (req, res) => {
    try {
        const mensaje = await authService.solicitarRecuperacion(req.body?.correo);
        res.status(200).json({ ok: true, mensaje });
    } catch (error) {
        console.error("Error al procesar la solicitud de recuperación:", error.message);
        res.status(503).json({
            ok: false,
            mensaje: "No pudimos procesar la solicitud en este momento. Inténtalo de nuevo más tarde."
        });
    }
};

const restablecerPassword = async (req, res) => {
    try {
        const mensaje = await authService.restablecerPassword(req.body?.token, req.body?.nuevaPassword);
        res.status(200).json({ ok: true, mensaje });
    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: error.message || "No pudimos cambiar la contraseña. Solicita un enlace nuevo."
        });
    }
};

module.exports = {
    registrar,
    login,
    solicitarRecuperacion,
    restablecerPassword
};
