const Cita = require("../models/Cita");
const Paciente = require("../models/Paciente");
const Odontologo = require("../models/Odontologo");
const Servicio = require("../models/Servicio");

/**
 * Solicitar una cita
 */
const solicitarCita = async (datos) => {

    const {
        nombre,
        apellido,
        documento,
        telefono,
        correo,
        odontologo,
        servicio,
        fecha,
        hora,
        observaciones
    } = datos;

    // Buscar paciente
    let paciente = await Paciente.findOne({ documento });

    // Si no existe lo crea automáticamente
    if (!paciente) {

        paciente = new Paciente({
            nombre,
            apellido,
            documento,
            telefono,
            correo
        });

        await paciente.save();

    }

    // Verificar odontólogo

    const existeOdontologo = await Odontologo.findById(
        odontologo
    );

    if (!existeOdontologo) {

        throw new Error("El odontólogo seleccionado no existe.");

    }

    if (!existeOdontologo.activo) {

        throw new Error("El odontólogo no se encuentra disponible.");

    }

    // Verificar servicio

    const existeServicio = await Servicio.findById(
        servicio
    );

    if (!existeServicio) {

        throw new Error("El servicio seleccionado no existe.");

    }

    if (!existeServicio.activo) {

        throw new Error("El servicio no se encuentra disponible.");

    }

    // Verificar horario ocupado

    const citaExistente = await Cita.findOne({

        odontologo,

        fecha: new Date(fecha),

        hora

    });

    if (citaExistente) {

        throw new Error(
            "El odontólogo ya tiene una cita en ese horario."
        );

    }

    const nuevaCita = new Cita({

        paciente: paciente._id,

        odontologo,

        servicio,

        fecha,

        hora,

        observaciones

    });

    await nuevaCita.save();

    return await nuevaCita.populate([
        {
            path: "paciente"
        },
        {
            path: "odontologo",
            populate: {
                path: "especialidad"
            }
        },
        {
            path: "servicio"
        }
    ]);

};

/**
 * Obtener todas las citas
 */

const obtenerCitas = async () => {

    return await Cita.find()

        .populate("paciente")

        .populate({
            path: "odontologo",
            populate: {
                path: "especialidad"
            }
        })

        .populate("servicio")

        .sort({

            fecha: 1,

            hora: 1

        });

};

/**
 * Obtener una cita
 */

const obtenerCita = async (id) => {

    return await Cita.findById(id)

        .populate("paciente")

        .populate({
            path: "odontologo",
            populate: {
                path: "especialidad"
            }
        })

        .populate("servicio");

};

/**
 * Buscar por paciente
 */

const obtenerCitasPaciente = async (pacienteId) => {

    return await Cita.find({

        paciente: pacienteId

    })

        .populate("paciente")

        .populate({
            path: "odontologo",
            populate: {
                path: "especialidad"
            }
        })

        .populate("servicio")

        .sort({

            fecha: -1

        });

};

/**
 * Buscar por odontólogo
 */

const obtenerCitasOdontologo = async (odontologoId) => {

    return await Cita.find({

        odontologo: odontologoId

    })

        .populate("paciente")

        .populate({
            path: "odontologo",
            populate: {
                path: "especialidad"
            }
        })

        .populate("servicio")

        .sort({

            fecha: -1

        });

};

/**
 * Buscar por fecha
 */

const obtenerCitasFecha = async (fecha) => {

    return await Cita.find({

        fecha: new Date(fecha)

    })

        .populate("paciente")

        .populate({
            path: "odontologo",
            populate: {
                path: "especialidad"
            }
        })

        .populate("servicio");

};

/**
 * Obtener horas ocupadas para la disponibilidad
 */
const obtenerHorasOcupadas = async (odontologoId, fecha) => {
    // Buscamos las citas del odontólogo en esa fecha exacta
    const citas = await Cita.find({
        odontologo: odontologoId,
        fecha: new Date(fecha)
    });

    // Extraemos únicamente el campo de la hora de cada cita (ej: ["09:00", "11:30"])
    const horasOcupadas = citas.map(cita => cita.hora);
    return horasOcupadas;
};

/**
 * Cambiar estado
 */

const cambiarEstado = async (id, estado) => {

    return await Cita.findByIdAndUpdate(

        id,

        {
            estado
        },

        {
            new: true,
            runValidators: true
        }

    )

        .populate("paciente")

        .populate({
            path: "odontologo",
            populate: {
                path: "especialidad"
            }
        })

        .populate("servicio");

};

/**
 * Eliminar cita
 */

const eliminarCita = async (id) => {

    return await Cita.findByIdAndDelete(id);

};

module.exports = {

    solicitarCita,

    obtenerCitas,

    obtenerCita,

    obtenerCitasPaciente,

    obtenerCitasOdontologo,

    obtenerCitasFecha,

    obtenerHorasOcupadas, // <--- Agregada aquí para exportarla

    cambiarEstado,

    eliminarCita

};