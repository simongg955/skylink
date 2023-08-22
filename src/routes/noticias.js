const { request } = require('express');
const express = require('express');
const { pool } = require('mssql');
const router = express.Router();
const conex = require('../database');
const sql = require('mssql');
var SECONDS = 350;
var MILLISECONDS = 10000;

router.get('/noticias', async function (req, res) {
    try {
        if (req.session.user) {
          if (req.session.user.lastVisit + (SECONDS * MILLISECONDS) > Date.now()) {
            req.session.user.lastVisit = Date.now();
            var datosUsuario =  req.session.DatosUsuario;
    
            try {

    const pool = await conex.getConnection();
    const result = await pool.request().query(
        'SELECT *, CONVERT(nvarchar, fecha, 105) AS fecha_convertida FROM noticias ORDER BY fecha DESC; '
    )

    const querynoticias = result.recordset

    return res.render('../views/noticias/noticias.hbs', {querynoticias})
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
router.get('/crearnoticias', async function (req, res) {
    
    try {
        if (req.session.user) {
          if (req.session.user.lastVisit + (SECONDS * MILLISECONDS) > Date.now()) {
            req.session.user.lastVisit = Date.now();
            var datosUsuario =  req.session.DatosUsuario;
    
            try {


    return res.render('../views/noticias/crearnoticias.hbs' )
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

router.post('/crearnoticias', async function (req, res) {
    try {
        if (req.session.user) {
          if (req.session.user.lastVisit + (SECONDS * MILLISECONDS) > Date.now()) {
            req.session.user.lastVisit = Date.now();
            var datosUsuario =  req.session.DatosUsuario;
    
            try {


    const { titulo, descripcion, fecha, imagen} = req.body;

    const pool = await conex.getConnection();
              await pool 
              .request()
              .input('titulo', sql.VarChar, titulo)
              .input('descripcion', sql.VarChar, descripcion)
              .input('fecha', sql.VarChar, fecha)
              .input('imagen', sql.VarChar, imagen)
              .query(
                  'INSERT INTO noticias VALUES (@titulo,@descripcion,@fecha,@imagen)' 
                  );

              return res.redirect('/noticias');
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




router.get('/editarnoticias/:id_noticias', async function (req, res){
    try {
        if (req.session.user) {
          if (req.session.user.lastVisit + (SECONDS * MILLISECONDS) > Date.now()) {
            req.session.user.lastVisit = Date.now();
            var datosUsuario =  req.session.DatosUsuario;
    
            try {


    const id_noticias = req.params.id_noticias;
            
    const pool = await conex.getConnection();
  
    const querynoticiasBYId =  await pool 
    .request() 
    .input('id_noticias', sql.VarChar, id_noticias)
    .query(
      "SELECT * FROM noticias WHERE id_noticias = @id_noticias");
  
  
  const editarnoticiasById = querynoticiasBYId.recordset;
  
  res.render('../views/noticias/editarnoticias.hbs', {editarnoticiasById})
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

router.post('/editarnoticias', async function (req, res) {

    try {
        if (req.session.user) {
          if (req.session.user.lastVisit + (SECONDS * MILLISECONDS) > Date.now()) {
            req.session.user.lastVisit = Date.now();
            var datosUsuario =  req.session.DatosUsuario;
    
            try {



    const {id_noticias, titulo, descripcion, fecha} = req.body;

    const pool = await conex.getConnection();

    await pool 
    .request()  
    .input('id_noticias', sql.VarChar, id_noticias)  
    .input('titulo', sql.VarChar, titulo)  
    .input('descripcion', sql.VarChar, descripcion)  
    .input('fecha', sql.VarChar, fecha)    
    .query(
        'UPDATE noticias SET titulo = @titulo, descripcion = @descripcion, fecha = @fecha where id_noticias = @id_noticias'
        )
        res.redirect('/noticias')
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

router.post('/eliminarnoticias', async (req, res) => {
    try {
        if (req.session.user) {
          if (req.session.user.lastVisit + (SECONDS * MILLISECONDS) > Date.now()) {
            req.session.user.lastVisit = Date.now();
            var datosUsuario =  req.session.DatosUsuario;
    
    try {
      
      const id_noticias = req.body.id_noticias;
      const pool = await conex.getConnection();
          
          await pool  
          .request()
          .input('id_noticias', sql.VarChar, id_noticias)
          .query(
            'DELETE noticias WHERE id_noticias = @id_noticias')
  
    
            let mensaje = 'noticia eliminada correctamente'
  
            return res.send({ mensaje });
            
     } catch (error) {
       
       console.log(error);
       let mensaje = 'Lo siento no se pudo eliminar la noticia, contacte al administrador del sistema'
       return res.send({ mensaje });
  
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
       
  });


module.exports = router;