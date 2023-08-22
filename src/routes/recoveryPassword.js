const express = require('express');
const router = express.Router();
const conex = require('../database');
const sql = require('mssql');
const randomstring = require('./ramdomString');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

router.get('/recoveryPassword', async (req, res) => {
    return res.render("../views/login/login.hbs", { layout: 'partials/recoveryPasswordSendEmail' });
});

router.post('/recoveryPassword', async (req, res) => {
    const { emailUsuario } = req.body;

    try {
        const pool = await conex.getConnection();
        const result = await pool.request()
            .input('emailUsuario', sql.VarChar, emailUsuario)
            .query("SELECT correoElectronicoUsuario FROM Usuarios WHERE correoElectronicoUsuario = @emailUsuario")
        const usuarioExiste = result.recordset;

        if (usuarioExiste.length > 0) {
            let newRandomPassword = 'SkyLinkX_' + randomstring .generateString(12);
            const hashPassword = await bcrypt.hash(newRandomPassword, 10);
            await pool.request()
                .input('hashPassword', sql.VarChar, hashPassword)
                .input('emailUsuario', sql.VarChar, emailUsuario)
                .query(
                    'UPDATE Usuarios SET passwordUsuario = @hashPassword WHERE correoElectronicoUsuario = @emailUsuario'
                );

            main(emailUsuario, newRandomPassword);
            let mensajeExcepcion = 'Email enviado';
            return res.render("../views/login/login.hbs", { layout: 'partials/emailSent', mensajeExcepcion });

        } else {
            throw new Error('Error en la solicitud');
        }

    } catch (error) {
        console.log(error, '-error----');
        let mensajeExcepcion = 'Correo inválido';
        return res.render("../views/login/login.hbs", { layout: 'partials/empty2', mensajeExcepcion });
    }
});

async function main(emailUsuario, newRandomPassword) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'emailsprosalco@gmail.com',
            pass: 'qruqymuxmrdkxhlz'
        }
    });

    let info = await transporter.sendMail({
        from: 'emailsprosalco@gmail.com',
        to: emailUsuario,
        subject: "Recuperacion de Contraseña SkylinkX",
        html: `<h1>Hola!</h1>
            <strong>Esta es tu nueva contraseña: ${newRandomPassword}</strong><p>Ingresa nuevamente al sitio web con esta clave</p>`,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = router;
