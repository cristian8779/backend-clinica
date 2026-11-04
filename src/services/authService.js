const bcrypt = require("bcryptjs");
const Administrador = require("../models/Administrador");
const generarJWT = require("../utils/generarJWT");

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

    const token = await generarJWT(administrador._id);

    const administradorPublico = administrador.toObject();
    delete administradorPublico.password;

    return {
        administrador: administradorPublico,
        token
    };

};

module.exports = {

    registrar,

    login

};
