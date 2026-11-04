# Backend de la clínica

## Recuperación de contraseña del administrador

La solicitud se hace desde `/admin/recuperar-clave`. El backend entrega por correo un enlace de un solo uso, válido durante 15 minutos. El token se guarda como hash y, al cambiar la contraseña, se invalidan las sesiones anteriores.

Para habilitar el envío, configura estas variables en el entorno del backend (por ejemplo, en **Render → servicio → Environment**):

- `SMTP_HOST`: servidor SMTP del proveedor. Para Gmail: `smtp.gmail.com`.
- `SMTP_PORT`: `587` (STARTTLS) o `465` (TLS).
- `SMTP_USER`: cuenta de correo remitente.
- `SMTP_PASS`: contraseña SMTP o contraseña de aplicación del proveedor; no uses la contraseña personal de Gmail.
- `SMTP_FROM`: remitente verificado; si se deja vacío, se usa `SMTP_USER`.
- `FRONTEND_URL`: URL pública del frontend, por ejemplo `https://tu-clinica.example`.

`MONGODB_URI` y `JWT_SECRET` también deben estar configuradas como hasta ahora. Usa `.env.example` como guía local y conserva las credenciales reales fuera del repositorio.
