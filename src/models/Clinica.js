const mongoose = require("mongoose");

const clinicaSchema = new mongoose.Schema(
    {
        nombre: String,

        mision: String,

        vision: String,

        direccion: String,

        telefono: String,

        correo: String,

        horario: String,

        ubicacion: String
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Clinica", clinicaSchema);