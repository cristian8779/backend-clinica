const express = require("express");
const limitarRecuperacion = require("../middlewares/limitarRecuperacion");

const router = express.Router();

const {

    registrar,

    login,
    solicitarRecuperacion,
    restablecerPassword

} = require("../controllers/authController");

router.post("/register", registrar);

router.post("/login", login);

router.post("/solicitar-recuperacion", limitarRecuperacion, solicitarRecuperacion);

router.post("/restablecer-password", restablecerPassword);

module.exports = router;
