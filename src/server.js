const app = require("./app");
const conectarDB = require("./config/database");

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {

    try {

        await conectarDB();

        app.listen(PORT, () => {
            console.log("==================================");
            console.log("✅ MongoDB conectado");
            console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
            console.log("==================================");
        });

    } catch (error) {

        console.error("❌ Error al iniciar el servidor");
        console.error(error);

        process.exit(1);

    }

};

iniciarServidor();