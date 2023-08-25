const express = require("express");
const router = express.Router();
const conex = require("../database");
const sql = require("mssql");
const bcrypt = require("bcrypt");
const passport = require("passport");
var SECONDS = 3500;
var MILLISECONDS = 10000;

router.get("/", async (req, res) => {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + SECONDS * MILLISECONDS > Date.now()) {
        req.session.user.lastVisit = Date.now();
        res.redirect("/inicio");
      } else {
        return res.render("../views/login/login.hbs", {
          layout: "partials/empty",
        });
      }
    } else {
      return res.render("../views/login/login.hbs", {
        layout: "partials/empty",
      });
    }
  } catch {
    return res.render("../views/login/login.hbs", { layout: "partials/empty" });
  }
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = username;
  const contrasena = password;

  try {
    const pool = await conex.getConnection();
    const result = await pool
      .request()
      .input("user", sql.VarChar, user)
      .query(
        "SELECT usuario.id_usuarios, usuario.identificacionUsuario, usuario.nombreCompletoUsuario, usuario.correoElectronicoUsuario, usuario.passwordUsuario, usuario.estadoUsuario, usuario.id_roles, rp.codigoRol, rp.codigoRol FROM Usuarios usuario INNER JOIN Roles rp ON usuario.id_roles = rp.id_roles WHERE usuario.identificacionUsuario = @user AND usuario.estadoRegistroUsuario = 'Activo'"
      );
    const usuarioExisteDB = result.recordset;
    const userHashPassword = usuarioExisteDB[0].passwordUsuario;

    const isMatch = await bcrypt.compare(contrasena, userHashPassword);

    if (isMatch) {
      // Contraseña correcta, permitir el inicio de sesión
      req.session.user = {
        username: usuarioExisteDB[0].identificacionUsuario,
        lastVisit: Date.now(),
      };

      let objDatosUsuario = usuarioExisteDB[0];
      datosUsuario = [];
      datosUsuario.push(objDatosUsuario);

      req.session.DatosUsuario = datosUsuario;

      req.session.save();
      return res.redirect("/inicio");
    } else {
      throw new Error("Usuario o contraseña inválidos");
    }
  } catch (error) {
    req.session.destroy();
    let mensajeExcepcion = "Usuario o contraseña inválidos";
    return res.render("../views/login/login.hbs", {
      layout: "partials/empty2",
      mensajeExcepcion,
    });
  }
  // console.log('estoy aca')
});

//----------Mostrar botones por roles  -----------------
router.post("/PermisosSistemaPorRol", async (req, res) => {
  try {
    if (!req.session.user) {
      // Si no hay sesión de usuario, redirigir al inicio de sesión
      return res.render("../views/login/login.hbs", { layout: "partials/empty" });
    }

    const SECONDS = 60;
    const MILLISECONDS = 1000;
    
    // Verificar si la sesión expiró
    if (req.session.user.lastVisit + SECONDS * MILLISECONDS <= Date.now()) {
      return res.render("../views/login/login.hbs", { layout: "partials/empty" });
    }

    const datosUsuario = req.session.DatosUsuario;
    const usuario = datosUsuario[0].identificacionUsuario;

    const pool = await conex.getConnection();
    const result = await pool
      .request()
      .input("usuario", sql.VarChar, usuario)
      .query(
        "SELECT u.id_usuarios, u.identificacionUsuario, u.nombreCompletoUsuario, u.correoElectronicoUsuario, u.estadoUsuario, rp.codigoRol, rp.nombreRol, rp.permisosRol FROM Usuarios u INNER JOIN Roles rp ON u.id_roles = rp.id_roles WHERE u.identificacionUsuario = @usuario AND u.estadoUsuario = 'Activo' AND u.estadoRegistroUsuario = 'Activo' AND u.identificacionUsuario <> 'No registra' ORDER BY u.id_usuarios DESC"
      );

    const resultado = result.recordset;

    if (resultado.length > 0) {
      const PermisosSistemaPorRol = resultado[0].permisosRol;

      // Devolver los permisos como respuesta

      return res.send({ PermisosSistemaPorRol });
    } else {
      // Si no se encontraron resultados, redirigir al inicio de sesión
      return res.render("../views/login/login.hbs", { layout: "partials/empty" });
    }
  } catch (error) {
    console.log(error);
    // En caso de error, redirigir al inicio de sesión
    return res.render("../views/login/login.hbs", { layout: "partials/empty" });
  }
});


//Ruta que se llama cuando el usuario sale
router.post("/salir", async (req, res) => {
  req.session.destroy();
  return res.render("../views/login/login.hbs", { layout: "partials/empty" });
});

//Ruta que trabaja con la strategia para validar el usuario
router.post(
  "/localStrategy",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      console.log(req.user, "------------hiii im using passportttt----------");
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports.datosUsuario = this.datosUsuario;
module.exports = router;
