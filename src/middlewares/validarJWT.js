const jwt = require("jsonwebtoken");
const Administrador = require("../models/Administrador");

const validarJWT = async (req, res, next) => {

    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            mensaje: "No se proporcionó un token."
        });
    }

    try {

        const { id, version = 0 } = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const administrador = await Administrador.findById(id).select("tokenVersion");
        if (!administrador || (administrador.tokenVersion || 0) !== version) {
            return res.status(401).json({
                ok: false,
                mensaje: "La sesión venció. Inicia sesión nuevamente."
            });
        }

        req.id = id;

        next();

    } catch (error) {

        return res.status(401).json({
            ok: false,
            mensaje: "Token inválido."
        });

    }

};

module.exports = validarJWT;
