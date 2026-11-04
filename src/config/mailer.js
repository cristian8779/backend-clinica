const nodemailer = require('nodemailer');

const escaparHTML = (valor = '') => String(valor).replace(/[&<>"']/g, (caracter) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
}[caracter]));

const correoConfigurado = () => Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.FRONTEND_URL
);

const enviarEnlaceRecuperacion = async ({ correo, nombre, token }) => {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, FRONTEND_URL } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !FRONTEND_URL) {
        throw new Error('Falta configurar SMTP_HOST, SMTP_USER, SMTP_PASS o FRONTEND_URL.');
    }

    const puerto = Number(SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: puerto,
        secure: puerto === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS }
    });

    const enlace = new URL('/admin/restablecer-clave', FRONTEND_URL);
    enlace.hash = new URLSearchParams({ token }).toString();
    const nombreSeguro = escaparHTML(nombre || 'administrador');

    await transporter.sendMail({
        from: SMTP_FROM || SMTP_USER,
        to: correo,
        subject: 'Recupera el acceso al panel administrativo',
        text: `Hola ${nombre || 'administrador'}. Recibimos una solicitud para cambiar la contraseña de tu cuenta. Abre este enlace en los próximos 15 minutos: ${enlace.toString()} Si no solicitaste el cambio, puedes ignorar este mensaje.`,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#334155;max-width:560px;margin:auto"><h2 style="color:#0f766e">Recuperar acceso</h2><p>Hola ${nombreSeguro},</p><p>Recibimos una solicitud para cambiar la contraseña de tu cuenta administrativa.</p><p style="margin:28px 0"><a href="${enlace.toString()}" style="background:#0f766e;color:white;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold">Crear nueva contraseña</a></p><p>Este enlace vence en 15 minutos y solo puede usarse una vez.</p><p>Si no solicitaste este cambio, ignora este correo; tu contraseña actual seguirá funcionando.</p></div>`
    });
};

module.exports = { enviarEnlaceRecuperacion, correoConfigurado };
