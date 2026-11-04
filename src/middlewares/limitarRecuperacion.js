const VENTANA_MS = 15 * 60 * 1000;
const MAX_SOLICITUDES = 5;
const solicitudes = new Map();

const limpieza = setInterval(() => {
    const ahora = Date.now();
    for (const [ip, solicitud] of solicitudes) {
        if (solicitud.vence <= ahora) solicitudes.delete(ip);
    }
}, VENTANA_MS);
limpieza.unref?.();

const limitarRecuperacion = (req, res, next) => {
    const ahora = Date.now();
    const clave = req.ip || req.socket.remoteAddress || "desconocido";
    let registro = solicitudes.get(clave);

    if (!registro || registro.vence <= ahora) {
        registro = { cantidad: 0, vence: ahora + VENTANA_MS };
    }

    if (registro.cantidad >= MAX_SOLICITUDES) {
        return res.status(429).json({
            ok: false,
            mensaje: "Has solicitado varios enlaces. Espera unos minutos e inténtalo de nuevo."
        });
    }

    registro.cantidad += 1;
    solicitudes.set(clave, registro);

    return next();
};

module.exports = limitarRecuperacion;
