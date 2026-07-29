const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Configurar variables de entorno
dotenv.config();

// Crear aplicación
const app = express();

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const especialidadRoutes = require("./routes/especialidadRoutes");
const odontologoRoutes = require("./routes/odontologoRoutes");
const servicioRoutes = require("./routes/servicioRoutes");
const pacienteRoutes = require("./routes/pacienteRoutes");
const citaRoutes = require("./routes/citaRoutes");
// =========================
// Middlewares
// =========================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// =========================
// Ruta principal
// =========================
app.get("/", (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: "🚀 API Clínica Odontológica funcionando correctamente"
    });
});

// =========================
// Rutas API
// =========================
app.use("/api/auth", authRoutes);
app.use("/api/especialidades", especialidadRoutes);
app.use("/api/odontologos", odontologoRoutes);
app.use("/api/servicios", servicioRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/citas", citaRoutes);
// =========================
// Ruta no encontrada
// =========================
app.use((req, res) => {
    res.status(404).json({
        ok: false,
        mensaje: "Ruta no encontrada."
    });
});

module.exports = app;