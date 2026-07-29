const Especialidad = require("../models/Especialidad");

const obtenerEspecialidades = async () => {
    return await Especialidad.find();
};

const obtenerEspecialidad = async (id) => {
    return await Especialidad.findById(id);
};

const crearEspecialidad = async (datos) => {
    return await Especialidad.create(datos);
};

const actualizarEspecialidad = async (id, datos) => {
    return await Especialidad.findByIdAndUpdate(
        id,
        datos,
        {
            new: true
        }
    );
};

const eliminarEspecialidad = async (id) => {
    return await Especialidad.findByIdAndDelete(id);
};

module.exports = {
    obtenerEspecialidades,
    obtenerEspecialidad,
    crearEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad
};