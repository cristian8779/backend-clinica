const Paciente = require("../models/Paciente");

const obtenerPacientes = async () => {

    return await Paciente.find();

};

const obtenerPaciente = async (id) => {

    return await Paciente.findById(id);

};

const buscarPaciente = async (termino) => {

    return await Paciente.find({
        $or: [
            {
                nombre: {
                    $regex: termino,
                    $options: "i"
                }
            },
            {
                apellido: {
                    $regex: termino,
                    $options: "i"
                }
            },
            {
                documento: {
                    $regex: termino,
                    $options: "i"
                }
            }
        ]
    });

};

const crearPaciente = async (datos) => {

    const existeDocumento = await Paciente.findOne({
        documento: datos.documento
    });

    if (existeDocumento) {
        throw new Error("Ya existe un paciente con ese documento.");
    }

    const existeCorreo = await Paciente.findOne({
        correo: datos.correo
    });

    if (existeCorreo) {
        throw new Error("El correo ya está registrado.");
    }

    const paciente = new Paciente(datos);

    await paciente.save();

    return paciente;

};

const actualizarPaciente = async (id, datos) => {

    return await Paciente.findByIdAndUpdate(
        id,
        datos,
        {
            new: true,
            runValidators: true
        }
    );

};

const eliminarPaciente = async (id) => {

    return await Paciente.findByIdAndDelete(id);

};

module.exports = {

    obtenerPacientes,

    obtenerPaciente,

    buscarPaciente,

    crearPaciente,

    actualizarPaciente,

    eliminarPaciente

};