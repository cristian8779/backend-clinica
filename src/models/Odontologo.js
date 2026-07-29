const mongoose = require("mongoose");

const horarioSchema = new mongoose.Schema(
    {
        dia: {
            type: String,
            enum: [
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sabado",
                "Domingo"
            ],
            required: true
        },

        horaInicio: {
            type: String,
            required: true,
            trim: true
        },

        horaFin: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        _id: false
    }
);

const odontologoSchema = new mongoose.Schema(
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

        especialidad: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Especialidad",
            required: true
        },

        telefono: {
            type: String,
            required: true,
            trim: true
        },

        correo: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        registroProfesional: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        horario: {
            type: [horarioSchema],
            default: [
                {
                    dia: "Lunes",
                    horaInicio: "08:00",
                    horaFin: "17:00"
                },
                {
                    dia: "Martes",
                    horaInicio: "08:00",
                    horaFin: "17:00"
                },
                {
                    dia: "Miércoles",
                    horaInicio: "08:00",
                    horaFin: "17:00"
                },
                {
                    dia: "Jueves",
                    horaInicio: "08:00",
                    horaFin: "17:00"
                },
                {
                    dia: "Viernes",
                    horaInicio: "08:00",
                    horaFin: "17:00"
                },
                {
                    dia: "Sabado",
                    horaInicio: "08:00",
                    horaFin: "12:00"
                }
            ]
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

module.exports = mongoose.model("Odontologo", odontologoSchema);