const { request } = require('express');
const express = require('express');
const { pool } = require('mssql');
const router = express.Router();
const conex = require('../database');
const sql = require('mssql');
var SECONDS = 350;
var MILLISECONDS = 10000;

router.get('/cursos', async function (req, res){
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + (SECONDS * MILLISECONDS) > Date.now()) {
        req.session.user.lastVisit = Date.now();
        var datosUsuario =  req.session.DatosUsuario;

       

    const pool = await conex.getConnection();
    const result = await pool.request().query(
        'SELECT * FROM cursos'
    )

    const querycursos = result.recordset

    return res.render('../views/cursos/cursos.hbs', {querycursos})
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

router.get('/crearcursos',verificarPermisos, async function (req, res) {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + (SECONDS * MILLISECONDS) > Date.now()) {
        req.session.user.lastVisit = Date.now();
        var datosUsuario =  req.session.DatosUsuario;

        try {
    return res.render('../views/cursos/crearcursos.hbs')
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


router.post('/crearcursos',verificarPermisos, async function (req, res) {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + (SECONDS * MILLISECONDS) > Date.now()) {
        req.session.user.lastVisit = Date.now();
         var datosUsuario =  req.session.DatosUsuario;;
         
         try{
           const { titulo_curso, descripcion, duracion, imagen, puntuacion} = req.body;
           
    const pool = await conex.getConnection();
              await pool 
              .request()
              .input('titulo_curso', sql.VarChar, titulo_curso)
              .input('descripcion', sql.VarChar, descripcion)
              .input('duracion', sql.VarChar, duracion)
              .input('imagen', sql.VarChar, imagen)
              .input('puntuacion', sql.Int, puntuacion)
              .query(
                  'INSERT INTO cursos VALUES (@titulo_curso,@descripcion,@duracion,@imagen,@puntuacion)' 
                  );

              return res.redirect('/cursos');
} catch (error) {
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

router.get('/editarcursos/:id_cursos',verificarPermisos, async (req, res) => {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + (SECONDS * MILLISECONDS) > Date.now()) {
        req.session.user.lastVisit = Date.now();
         var datosUsuario =  req.session.DatosUsuario;;

         try{        
      const id_cursos = req.params.id_cursos;
    const pool = await conex.getConnection();
  
    const queryCursosBYId =  await pool 
    .request()
    .input('id_cursos', sql.VarChar, id_cursos)
    .query(
      "SELECT * FROM cursos WHERE id_cursos = @id_cursos");
  
  
  const editarCursosById = queryCursosBYId.recordset;
  
  res.render('../views/cursos/editarcursos.hbs', {editarCursosById})
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

router.post('/editarcursos',verificarPermisos,async  (req, res) => {
  try {
    if (req.session.user) {
      if (req.session.user.lastVisit + (SECONDS * MILLISECONDS) > Date.now()) {
        req.session.user.lastVisit = Date.now();
         var datosUsuario =  req.session.DatosUsuario;;
    const {id_cursos ,titulo_curso,descripcion, duracion, puntuacion } = req.body;
    try{
    const pool = await conex.getConnection();

    await pool 
        .request() 
        .input('id_cursos', sql.VarChar, id_cursos)    
        .input('titulo_curso', sql.VarChar, titulo_curso)    
        .input('descripcion', sql.VarChar, descripcion) 
        .input('duracion', sql.VarChar, duracion)
        .input('puntuacion', sql.VarChar, puntuacion)
        .query(
          'UPDATE cursos SET titulo_curso = @titulo_curso, descripcion = @descripcion, duracion = @duracion, puntuacion = @puntuacion  where id_cursos = @id_cursos')
          


          res.redirect('/cursos')
        } catch (error) {
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

router.post('/eliminarcursos', async (req, res) => {

    try {
      
      const id_cursos = req.body.id_cursos;
      const pool = await conex.getConnection();
          
          await pool  
          .request()
          .input('id_cursos', sql.VarChar, id_cursos)
          .query(
            'DELETE cursos WHERE id_cursos = @id_cursos')
  
    
            let mensaje = 'curso eliminado correctamente'
  
            return res.send({ mensaje });
            
     } catch (error) {
       
       console.log(error);
       let mensaje = 'Lo siento no se pudo eliminar el curso, contacte al administrador del sistema'
       return res.send({ mensaje });
  
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