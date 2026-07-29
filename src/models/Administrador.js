const mongoose = require("mongoose");

const administradorSchema = new mongoose.Schema(
    {
        nombre: {
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

        password: {
            type: String,
            required: true
        },

        rol: {
            type: String,
            enum: ["ADMIN"],
            default: "ADMIN"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Administrador", administradorSchema);