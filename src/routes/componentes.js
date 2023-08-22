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
            querycomponentes,
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

router.get("/crearcomponentes", async function (req, res) {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + SECONDS * MILLISECONDS > Date.now()) {
        req.session.user.lastVisit = Date.now();
        var datosUsuario = req.session.DatosUsuario;

        try {
          return res.render("../views/componentes/crearcomponentes.hbs");
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

router.post("/crearcomponentes", async function (req, res) {
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

router.get("/editarcomponentes/:id_componenetes", async function (req, res) {
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
    editarcomponentesById,
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

router.post("/editarcomponentes", async function (req, res) {
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

module.exports = router;
