const mongoose = require("mongoose");

const pacienteSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },

        apellido: {
            type: String,
            required: true,
            trim: true
        },

        documento: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        telefono: {
            type: String,
            required: true
        },

        correo: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        fechaNacimiento: {
            type: Date
        },

        direccion: {
            type: String
        },

        activo: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Paciente", pacienteSchema);