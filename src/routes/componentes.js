const { request } = require("express");
const express = require("express");
const { pool } = require("mssql");
const router = express.Router();
const conex = require("../database");
const Handlebars = require("handlebars");
const sql = require("mssql");
var SECONDS = 350; 
var MILLISECONDS = 10000;

router.get("/componentes", async function (req, res) {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + SECONDS * MILLISECONDS > Date.now()) {
        req.session.user.lastVisit = Date.now();
        var datosUsuario = req.session.DatosUsuario;

        try {
          const pool = await conex.getConnection();
          const result = await pool
            .request()
            .query("select * from componentes");

          const querycomponentes = result.recordset;

          return res.render("../views/componentes/componentes.hbs", {
             querycomponentes, datosUsuario
          });
        } catch (error) {
          console.log(error, "rror======");
          let mensajeExcepcion =
            "Lo siento no se puede cargar esta página, por favor contacta al administrador del sistema";
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

router.get("/crearcomponentes",verificarPermisos, async function (req, res) {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + SECONDS * MILLISECONDS > Date.now()) {
        req.session.user.lastVisit = Date.now();
        var datosUsuario = req.session.DatosUsuario;

        try {
          const pool = await conex.getConnection();
          const result = await pool
            .request()
            .query("select * from componentes");

          const queryCComponentes = result.recordset;

          return res.render("../views/componentes/crearcomponentes.hbs",{queryCComponentes, datosUsuario});
        } catch (error) {
          console.log(error, "=====error======");
          let mensajeExcepcion =
            "Lo siento no se puede cargar esta página, por favor contacta al administrador del sistema";
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

router.post("/crearcomponentes",verificarPermisos, async function (req, res) {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + SECONDS * MILLISECONDS > Date.now()) {
        req.session.user.lastVisit = Date.now();
        var datosUsuario = req.session.DatosUsuario;

        try {
          const { tipo, nombre, fabricante, precio, descripcion, imagen } =
            req.body;

          const pool = await conex.getConnection();
          await pool
            .request()
            .input("tipo", sql.VarChar, tipo)
            .input("nombre", sql.VarChar, nombre)
            .input("fabricante", sql.VarChar, fabricante)
            .input("precio", sql.VarChar, precio)
            .input("descripcion", sql.VarChar, descripcion)
            .input("imagen", sql.VarChar, imagen)
            .query(
              "INSERT INTO componentes VALUES (@tipo,@nombre,@fabricante,@precio,@descripcion,@imagen)"
            );
          return res.redirect("/componentes");
        } catch (error) {
          console.log(error, "=====error======");
          let mensajeExcepcion =
            "Lo siento no se puede cargar esta página, por favor contacta al administrador del sistema";
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

router.get("/editarcomponentes/:id_componenetes",verificarPermisos, async function (req, res) {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + SECONDS * MILLISECONDS > Date.now()) {
        req.session.user.lastVisit = Date.now();
        var datosUsuario = req.session.DatosUsuario;

        try {
 
  const id_componenetes = req.params.id_componenetes;

  const pool = await conex.getConnection();

  const querycomponentesBYId = await pool
    .request()
    .input("id_componenetes", sql.VarChar, id_componenetes)
    .query(
      "SELECT * FROM componentes WHERE id_componenetes = @id_componenetes"
    );

  const editarcomponentesById = querycomponentesBYId.recordset;

  res.render("../views/componentes/editarcomponentes.hbs", {
    editarcomponentesById, datosUsuario
  });

  } catch (error) {
          console.log(error, "=====error======");
          let mensajeExcepcion =
            "Lo siento no se puede cargar esta página, por favor contacta al administrador del sistema";
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

router.post("/editarcomponentes",verificarPermisos, async function (req, res) {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + SECONDS * MILLISECONDS > Date.now()) {
        req.session.user.lastVisit = Date.now();
        var datosUsuario = req.session.DatosUsuario;

        try {
 
  const { id_componenetes, tipo, nombre, fabricante, precio, descripcion } =
    req.body;

  const pool = await conex.getConnection();

  await pool
    .request()
    .input("id_componenetes", sql.VarChar, id_componenetes)
    .input("tipo", sql.VarChar, tipo)
    .input("nombre", sql.VarChar, nombre)
    .input("fabricante", sql.VarChar, fabricante)
    .input("precio", sql.VarChar, precio)
    .input("descripcion", sql.VarChar, descripcion)
    .query(
      "UPDATE componentes SET tipo = @tipo, nombre = @nombre, fabricante = @fabricante, precio = @precio ,descripcion = @descripcion where id_componenetes = @id_componenetes"
    );
  res.redirect("/componentes");
} catch (error) {
  console.log(error, "=====error======");
  let mensajeExcepcion =
    "Lo siento no se puede cargar esta página, por favor contacta al administrador del sistema";
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

router.post("/eliminarcomponentes", async (req, res) => {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + SECONDS * MILLISECONDS > Date.now()) {
        req.session.user.lastVisit = Date.now();
        var datosUsuario = req.session.DatosUsuario;


  try {
    const id_componenetes = req.body.id_componenetes;
    const pool = await conex.getConnection();

    await pool
      .request()
      .input("id_componenetes", sql.VarChar, id_componenetes)
      .query("DELETE componentes WHERE id_componenetes = @id_componenetes");

    let mensaje = "componente eliminado correctamente";

    return res.send({ mensaje });
} catch (error) {
  console.log(error, "=====error======");
  let mensajeExcepcion =
    "Lo siento no se puede cargar esta página, por favor contacta al administrador del sistema";
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

router.get('/verdetallescomponente/:id_componenetes', async (req, res) => {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + (SECONDS * MILLISECONDS) > Date.now()) {
        req.session.user.lastVisit = Date.now();
         var datosUsuario =  req.session.DatosUsuario;;

         try{        
      const id_componenetes = req.params.id_componenetes;
    const pool = await conex.getConnection();
  
    const querycomponentesBYId =  await pool 
    .request()
    .input('id_componenetes', sql.VarChar, id_componenetes)
    .query(
      "SELECT * FROM componentes WHERE id_componenetes = @id_componenetes");
  
      
  const vercomponentesById = querycomponentesBYId.recordset;
  
  res.render('../views/componentes/verdetallescomponentes.hbs', {vercomponentesById, datosUsuario})
}
catch (error) {
  return res.send('Lo sentimos algo falló, contacta a el administrador del sistema')
  
}

}
else {

return res.render('../views/login/login.hbs', {layout: 'partials/empty' }); 
}
}
else {
return res.render('../views/login/login.hbs', {layout: 'partials/empty' }); 
}
}
catch
{       
return res.render('../views/login/login.hbs', {layout: 'partials/empty' }); 
}
})

// fromato moneda
Handlebars.registerHelper("formatCurrency", function (value) {
  // Asumiendo que `value` es un número
  const formattedValue = Number(value).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0, // Establece el número mínimo de dígitos decimales
    maximumFractionDigits: 0, // Establece el número máximo de dígitos decimales
  });

  return formattedValue;
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
