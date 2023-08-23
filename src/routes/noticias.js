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
router.get('/crearnoticias',verificarPermisos, async function (req, res) {
    
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

router.post('/crearnoticias',verificarPermisos, async function (req, res) {
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




router.get('/editarnoticias/:id_noticias',verificarPermisos, async function (req, res){
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

router.post('/editarnoticias',verificarPermisos, async function (req, res) {

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
        return res.redirect('/login'); // Cambiar a la ruta de inicio de sesión correspondiente
      }
    } else {
      // No hay sesión de usuario, redirigir al inicio de sesión
      return res.redirect('/login'); // Cambiar a la ruta de inicio de sesión correspondiente
    }
  }
  

module.exports = router;