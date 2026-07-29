const mongoose = require("mongoose");

const especialidadSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        descripcion: {
            type: String,
            required: true,
            trim: true
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

module.exports = mongoose.model("Especialidad", especialidadSchema);