const mongoose = require("mongoose");

const servicioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },

        descripcion: {
            type: String,
            required: true
        },

        precio: {
            type: Number,
            required: true,
            min: 0
        },

        duracion: {
            type: Number,
            required: true
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

module.exports = mongoose.model("Servicio", servicioSchema);