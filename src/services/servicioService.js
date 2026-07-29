const Servicio = require("../models/Servicio");

const obtenerServicios = async () => {

    return await Servicio.find();

};

const obtenerServicio = async (id) => {

    return await Servicio.findById(id);

};

const crearServicio = async (datos) => {

    const servicio = new Servicio(datos);

    await servicio.save();

    return servicio;

};

const actualizarServicio = async (id, datos) => {

    return await Servicio.findByIdAndUpdate(
        id,
        datos,
        {
            new: true,
            runValidators: true
        }
    );

};

const eliminarServicio = async (id) => {

    return await Servicio.findByIdAndDelete(id);

};

module.exports = {

    obtenerServicios,

    obtenerServicio,

    crearServicio,

    actualizarServicio,

    eliminarServicio

};