const bcrypt = require('bcrypt');
const conex = require('../../../database');
const sql = require('mssql');
const { Strategy } = require('passport-local');

const localStrategy = new Strategy(async (username, password, done) => {
    try {
        const pool = await conex.getConnection();
        const result = await pool.request()
        .input('user', sql.VarChar, username)
        .query("SELECT usuario.id_usuarios, usuario.identificacionUsuario, usuario.nombreCompletoUsuario, usuario.correoElectronicoUsuario, usuario.passwordUsuario, usuario.id_roles, rp.codigoRol, rp.nombreUsuario FROM Usuarios usuario INNER JOIN Roles rp ON usuario.id_roles = rp.id_roles WHERE usuario.identificacionUsuario = @user AND usuario.estadoRegistroUsuario = 'Activo'");
        
        const user = result.recordset[0];

        if (!user) {
            throw new Error('Usuario no existe o no es válido');
        }

        const userHashPassword = user.passwordUsuario;
        const isMatch = await bcrypt.compare(password, userHashPassword);
        
        if (!isMatch) {
            throw new Error('Usuario o contraseña no válidos');
        }

        done(null, user);
    } catch (error) {
        console.error(error);
        done(error, false);
    }
});

module.exports = localStrategy;
