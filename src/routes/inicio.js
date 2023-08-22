const { request } = require('express');
const express = require('express');
const { pool } = require('mssql');
const router = express.Router();
const conex = require('../database');
const sql = require('mssql');
var SECONDS = 350;
var MILLISECONDS = 10000;

router.get('/inicio',async function (req, res){
    try {
        if (req.session.user) {
          if (req.session.user.lastVisit + (SECONDS * MILLISECONDS) > Date.now()) {
            req.session.user.lastVisit = Date.now();
            var datosUsuario =  req.session.DatosUsuario;
    
            try {
    const pool = await conex.getConnection();
    const result = await pool.request().query(
        'select top 1 * from componentes'
    )

    const queryinicioCO = result.recordset;
    
    const results = await pool.request().query(
        'select top 1 * from cursos'
    )

    const queryinicioCU = results.recordset;

    const resultss = await pool.request().query(
        'SELECT TOP 1 *, CONVERT(nvarchar, fecha, 105) AS fecha_convertida FROM noticias ORDER BY fecha DESC; '
    )

    const queryinicioNO = resultss.recordset;

    return res.render('../views/inicio/inicio.hbs',{queryinicioCO, queryinicioCU, queryinicioNO})
} catch (error) {
    console.log(error, '=====error======');
      let mensajeExcepcion = 'Lo siento no se puede cargar esta página, por favor contacta al administrador del sistema';
      return res.render('../views/inicio/inicio', { datosUsuario, mensajeExcepcion });
  }

}
else {

  return res.render('../views/login/login.hbs', { layout: 'partials/empty' });
}
}
else {
return res.render('../views/login/login.hbs', { layout: 'partials/empty' });
}
}
catch
{
return res.render('../views/login/login.hbs', { layout: 'partials/empty' });
}
})
module.exports = router;