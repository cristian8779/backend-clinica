const mongoose = require("mongoose");

const citaSchema = new mongoose.Schema(
    {
        paciente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Paciente",
            required: true
        },

        odontologo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Odontologo",
            required: true
        },

        servicio: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Servicio",
            required: true
        },

        fecha: {
            type: Date,
            required: true
        },

        hora: {
            type: String,
            required: true,
            trim: true
        },

        estado: {
            type: String,
            enum: [
                "Pendiente",
                "Confirmada",
                "Cancelada",
                "Finalizada"
            ],
            default: "Pendiente"
        },

        observaciones: {
            type: String,
            trim: true,
            default: ""
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Evita que un odontólogo tenga dos citas
// en la misma fecha y hora.
citaSchema.index(
    {
        odontologo: 1,
        fecha: 1,
        hora: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model("Cita", citaSchema);