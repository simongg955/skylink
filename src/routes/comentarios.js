const { request } = require("express");
const express = require("express");
const { pool } = require("mssql");
const router = express.Router();
const conex = require("../database");
const Handlebars = require("handlebars");
const sql = require("mssql");

var SECONDS = 350;
var MILLISECONDS = 10000;

router.get("/comentariosCOM/:id_componenetes", async function (req, res) {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + SECONDS * MILLISECONDS > Date.now()) {
        req.session.user.lastVisit = Date.now();
        var datosUsuario = req.session.DatosUsuario; // Accede al primer elemento del arreglo
        var Datosusuario = req.session.DatosUsuario[0];
        try {
          const id_componenetes = req.params.id_componenetes; // Obtén id_componenetes de la ruta
          const id_usuarios = Datosusuario.id_usuarios; // Obtén id_usuarios de los datos del usuario en la sesión

          //console.log("ID de usuarios:", id_usuarios);
          //console.log("ID de componentes:", id_componenetes);
          const pool = await conex.getConnection();
          const querycomentariosCOM = await pool
            .request()
            .input("id_componenetes", sql.Int, id_componenetes)
            .input("id_usuarios", sql.Int, id_usuarios)

            .query(
              "SELECT * FROM comentariosCOM cc INNER JOIN componentes cp ON cc.id_componenetes = cp.id_componenetes WHERE cp.id_componenetes = @id_componenetes"
            ); 
          //console.log("Comentarios obtenidos:", querycomentariosCOM.recordset);

          const mostrarComentariosCOM = querycomentariosCOM.recordset;

          if (mostrarComentariosCOM.length === 0) {
            // return res.send(404);

            // return res.redirect('/componentes');

            return res.render(
              "../views/nohaycomentarios/nohaycomentariosCOM.hbs",
              {
                id_componenetes: req.params.id_componenetes,
              }
            );
          }

          res.render("../views/comentariosCOM/comentariosCOM.hbs", {
            mostrarComentariosCOM,
            id_componenetes: req.params.id_componenetes,
            datosUsuario
          });
        } catch (error) {
          console.log(error, "rror======");
          let mensajeExcepcion =
            "Lo siento, no se puede cargar esta página. Por favor, contacta al administrador del sistema.";
          return res.render("../views/inicio/inicio", {
            datosUsuario,
            mensajeExcepcion,
          });
        }
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

router.get("/comentariosCUR/:id_cursos", async function (req, res) {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + SECONDS * MILLISECONDS > Date.now()) {
        req.session.user.lastVisit = Date.now();
        var datosUsuario = req.session.DatosUsuario; 
        var Datosusuario = req.session.DatosUsuario[0]; // Accede al primer elemento del arreglo

        try {
          const id_cursos = req.params.id_cursos; // Obtén id_cursos de la ruta
          const id_usuarios = Datosusuario.id_usuarios; // Obtén id_usuarios de los datos del usuario en la sesión

          const pool = await conex.getConnection();
          const result = await pool 
          .request()
          .input("id_usuarios", sql.Int, id_usuarios)
          .input("id_cursos", sql.Int, id_cursos)
          .query(
            'SELECT * FROM comentariosCUR CCU inner join cursos CU on CCU.id_cursos = CU.id_cursos where CU.id_cursos = @id_cursos '
            )

            const mostrarComentariosCUR = result.recordset

            if (mostrarComentariosCUR.length === 0) {
              // return res.send(404);
  
              // return res.redirect('/componentes');
  
              return res.render(
                "../views/nohaycomentarios/nohaycomentariosCUR.hbs",
                {
                  id_cursos,
                  datosUsuario
                }
              );
            }
            res.render("../views/comentariosCUR/comentariosCUR.hbs",{
            mostrarComentariosCUR,
            id_cursos: req.params.id_cursos /*Pasa el id_cursos a la vista*/,
            datosUsuario
            })
  

        } catch (error) {
          console.log(error, "rror======");
          let mensajeExcepcion =
            "Lo siento, no se puede cargar esta página. Por favor, contacta al administrador del sistema.";
          return res.render("../views/inicio/inicio", {
            datosUsuario,
            mensajeExcepcion,
          });
        }
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
})

router.get("/comentariosNOT/:id_noticias", async function (req, res) {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + SECONDS * MILLISECONDS > Date.now()) {
        req.session.user.lastVisit = Date.now();
        var datosUsuario = req.session.DatosUsuario; 
        var Datosusuario = req.session.DatosUsuario[0]; // Accede al primer elemento del arreglo

        try {
          const id_noticias = req.params.id_noticias; // Obtén id_noticias de la ruta
          const id_usuarios = Datosusuario.id_usuarios; // Obtén id_usuarios de los datos del usuario en la sesión

          // console.log("ID de usuarios:", id_usuarios);
          // console.log("ID de noticias:", id_noticias);
          const pool = await conex.getConnection();
          const querycomentariosNOT = await pool
            .request()
            .input("id_usuarios", sql.Int, id_usuarios)
            .input("id_noticias", sql.Int, id_noticias)
            .query(
              "SELECT * FROM comentariosNOT cn inner join noticias nt on nt.id_noticias = cn.id_noticias where nt.id_noticias = @id_noticias"
            );

          const mostrarComentariosNOT = querycomentariosNOT.recordset;

          if (mostrarComentariosNOT.length === 0) {
            // return res.send(404);

            // return res.redirect('/componentes');

            return res.render(
              "../views/nohaycomentarios/nohaycomentariosNOT.hbs",
              {
                id_noticias,
                datosUsuario
              }
            );
          }

          res.render("../views/comentariosNOT/comentariosNOT.hbs", {
            mostrarComentariosNOT,
            id_noticias: req.params.id_noticias /*Pasa el id_noticias a la vista*/,
            datosUsuario
          });
        } catch (error) {
          console.log(error, "rror======");
          let mensajeExcepcion =
            "Lo siento, no se puede cargar esta página. Por favor, contacta al administrador del sistema.";
          return res.render("../views/inicio/inicio", {
            datosUsuario,
            mensajeExcepcion,
          });
        }
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

router.get('/crearcomentariosNOT/:id_noticias', verificarPermisos, async function (req, res) {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + SECONDS * MILLISECONDS > Date.now()) {
        req.session.user.lastVisit = Date.now();
        var datosUsuario = req.session.DatosUsuario; // Accede al primer elemento del arreglo
        var Datosusuario = req.session.DatosUsuario[0]; // Accede al primer elemento del arreglo

        try {


          const id_noticias = req.params.id_noticias; 
          
          // console.log("ID de noticias:", id_noticias);

          const pool = await conex.getConnection();
          const results = await pool.request()
          .input("id_noticias", sql.VarChar, id_noticias)
          .query(
            'SELECT * FROM comentariosNOT cn inner join noticias nt on nt.id_noticias = cn.id_noticias where cn.id_noticias = @id_noticias ;'
        )
    
        const querycrearcomentariosNOT = results.recordset;

          return res.render("../views/comentariosNOT/crearcomentariosNOT.hbs", {id_noticias, querycrearcomentariosNOT, datosUsuario});
        } catch (error) {
          console.log(error, "rror======");
          let mensajeExcepcion =
            "Lo siento, no se puede cargar esta página. Por favor, contacta al administrador del sistema.";
          return res.render("../views/inicio/inicio", {
            datosUsuario,
            mensajeExcepcion,
          });
        }
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

router.post('/crearcomentariosNOT/:id_noticias',verificarPermisos, async function (req, res) {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + SECONDS * MILLISECONDS > Date.now()) {
        req.session.user.lastVisit = Date.now();
        var datosUsuario = req.session.DatosUsuario[0]; // Accede al primer elemento del arreglo

        try {

          
          const id_noticias = req.params.id_noticias; // Obtén id_componenetes de la ruta
          const id_usuarios = datosUsuario.id_usuarios; // Obtén id_usuarios de los datos del usuario en la sesión
          const {comentario, puntuacion} = req.body;
          // console.log("ID de usuarios:", id_usuarios);
          // console.log("ID de noticias:", id_noticias);
          const pool = await conex.getConnection();
          await pool
          .request()
          .input('comentario', sql.VarChar, comentario) 
          .input('puntuacion', sql.Decimal(3, 0), puntuacion)
          .input("id_usuarios", sql.Int, id_usuarios)
          .input("id_noticias", sql.Int, id_noticias)
          .query('INSERT INTO comentariosNOT (comentario, puntuacion, id_noticias, id_usuarios) VALUES (@comentario,@puntuacion, @id_noticias, @id_usuarios)');


          return res.redirect('/noticias');

        } catch (error) {
          console.log(error, "rror======");
          let mensajeExcepcion =
            "Lo siento, no se puede cargar esta página. Por favor, contacta al administrador del sistema.";
          return res.render("../views/inicio/inicio", {
            datosUsuario,
            mensajeExcepcion,
          });
        }
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

async function verificarPermisos(req, res, next) {
  if (req.session.user) {
    const usuario = req.session.DatosUsuario[0].identificacionUsuario;

    const pool = await conex.getConnection();
    const result = await pool
      .request()
      .input("usuario", sql.VarChar, usuario)
      .query("SELECT u.id_usuarios, u.identificacionUsuario, u.nombreCompletoUsuario, u.correoElectronicoUsuario, u.estadoUsuario, rp.codigoRol, rp.nombreRol, rp.permisosRol FROM Usuarios u INNER JOIN Roles rp ON u.id_roles = rp.id_roles WHERE u.identificacionUsuario = @usuario AND u.estadoUsuario = 'Activo' AND u.estadoRegistroUsuario = 'Activo' AND u.identificacionUsuario <> 'No registra' ORDER BY u.id_usuarios DESC");

    const resultado = result.recordset;

    if (resultado.length > 0) {
      const codigoRol = resultado[0].codigoRol;
      const permisosRol = resultado[0].permisosRol;

      // Verificar los permisos necesarios
      if (codigoRol === 'ADMIN' && permisosRol.includes('1') && permisosRol.includes('2') && permisosRol.includes('3')) {
        // El usuario tiene los permisos necesarios, continuar
        next();
      } else {
        // El usuario no tiene los permisos adecuados, redirigir o mostrar un mensaje de error
        return res.render('../views/acceso_denegado.hbs'); // Cambiar a la vista de error o redirección correspondiente
      }
    } else {
      // No se encontró el usuario, redirigir al inicio de sesión
      return res.redirect('/'); // Cambiar a la ruta de inicio de sesión correspondiente
    }
  } else {
    // No hay sesión de usuario, redirigir al inicio de sesión
    return res.redirect('/'); // Cambiar a la ruta de inicio de sesión correspondiente
  }
}

module.exports = router;
