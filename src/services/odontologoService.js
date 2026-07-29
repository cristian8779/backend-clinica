const Odontologo = require("../models/Odontologo");

const obtenerOdontologos = async () => {

    return await Odontologo.find()
        .populate("especialidad");

};

const obtenerOdontologo = async (id) => {

    return await Odontologo.findById(id)
        .populate("especialidad");

};

const crearOdontologo = async (datos) => {

    const odontologo = new Odontologo(datos);

    await odontologo.save();

    return odontologo.populate("especialidad");

};

const actualizarOdontologo = async (id, datos) => {

    return await Odontologo.findByIdAndUpdate(
        id,
        datos,
        {
            new: true
        }
    ).populate("especialidad");

};

const eliminarOdontologo = async (id) => {

    return await Odontologo.findByIdAndDelete(id);

};

module.exports = {

    obtenerOdontologos,

    obtenerOdontologo,

    crearOdontologo,

    actualizarOdontologo,

    eliminarOdontologo

};