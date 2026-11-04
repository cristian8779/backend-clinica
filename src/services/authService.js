const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Administrador = require("../models/Administrador");
const generarJWT = require("../utils/generarJWT");
const { enviarEnlaceRecuperacion, correoConfigurado } = require("../config/mailer");

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");
const MENSAJE_RECUPERACION = "Si el correo está registrado, recibirás un enlace para recuperar el acceso.";

const registrar = async (datos) => {

    const existe = await Administrador.findOne({
        correo: datos.correo
    });

    if (existe) {
        throw new Error("El correo ya está registrado.");
    }

    const administrador = new Administrador(datos);

    const salt = bcrypt.genSaltSync();

    administrador.password = bcrypt.hashSync(
        datos.password,
        salt
    );

    await administrador.save();

    const administradorPublico = administrador.toObject();
    delete administradorPublico.password;
    return administradorPublico;

};

const login = async (correo, password) => {

    const administrador = await Administrador.findOne({ correo }).select("+password");

    if (!administrador) {
        throw new Error("Credenciales incorrectas.");
    }

    const valido = bcrypt.compareSync(
        password,
        administrador.password
    );

    if (!valido) {
        throw new Error("Credenciales incorrectas.");
    }

    const token = await generarJWT(administrador._id, administrador.tokenVersion || 0);

    const administradorPublico = administrador.toObject();
    delete administradorPublico.password;

    return {
        administrador: administradorPublico,
        token
    };

};

const solicitarRecuperacion = async (correoIngresado) => {
    if (!correoConfigurado()) {
        throw new Error("El servicio de correo no está configurado.");
    }

    const correo = String(correoIngresado || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return MENSAJE_RECUPERACION;

    const administrador = await Administrador.findOne({ correo });
    if (!administrador) return MENSAJE_RECUPERACION;

    const token = crypto.randomBytes(32).toString("hex");
    administrador.resetPasswordToken = hashToken(token);
    administrador.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    await administrador.save();

    enviarEnlaceRecuperacion({ correo, nombre: administrador.nombre, token })
        .catch(async (error) => {
            console.error("No se pudo enviar el correo de recuperación:", error.message);
            await Administrador.updateOne(
                { _id: administrador._id, resetPasswordToken: hashToken(token) },
                { $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 } }
            ).catch((errorAlLimpiar) => {
                console.error("No se pudo invalidar el token de recuperación:", errorAlLimpiar.message);
            });
        });

    return MENSAJE_RECUPERACION;
};

const restablecerPassword = async (token, nuevaPassword) => {
    if (typeof token !== "string" || !token || typeof nuevaPassword !== "string" || nuevaPassword.length < 10 || Buffer.byteLength(nuevaPassword, "utf8") > 72) {
        throw new Error("El enlace no es válido o la contraseña no cumple los requisitos.");
    }

    const tokenHash = hashToken(token);
    const ahora = new Date();
    const administrador = await Administrador.findOne({
        resetPasswordToken: tokenHash,
        resetPasswordExpires: { $gt: ahora }
    }).select("+resetPasswordToken +resetPasswordExpires");

    if (!administrador) {
        throw new Error("El enlace venció o ya fue utilizado. Solicita uno nuevo.");
    }

    const cambio = await Administrador.updateOne(
        {
            _id: administrador._id,
            resetPasswordToken: tokenHash,
            resetPasswordExpires: { $gt: ahora }
        },
        {
            $set: { password: await bcrypt.hash(nuevaPassword, 10) },
            $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 },
            $inc: { tokenVersion: 1 }
        }
    );
    if (cambio.modifiedCount !== 1) {
        throw new Error("El enlace venció o ya fue utilizado. Solicita uno nuevo.");
    }

    return "La contraseña se actualizó. Ya puedes iniciar sesión con tu nueva clave.";
};

module.exports = {

    registrar,

    login,

    solicitarRecuperacion,

    restablecerPassword

};
