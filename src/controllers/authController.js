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

module.exports = {
    registrar,
    login
};
