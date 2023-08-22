const { request } = require('express');
const express = require('express');
const { pool } = require('mssql');
const router = express.Router();
const conex = require('../database'); 
const Handlebars = require('handlebars');
const sql = require('mssql');
var SECONDS = 350;
var MILLISECONDS = 10000;

router.get('/componentes',async function (req, res){

    const pool = await conex.getConnection();
    const result = await pool.request().query(
        'select * from componentes'
    )

    const querycomponentes = result.recordset;

    return res.render('../views/componentes/componentes.hbs',{querycomponentes})

})

router.get('/crearcomponentes', async function (req, res) {

    return res.render('../views/componentes/crearcomponentes.hbs')
})

router.post('/crearcomponentes', async function (req, res){

    const {tipo, nombre, fabricante, precio, descripcion, imagen} = req.body 

    const pool = await conex.getConnection();
    await pool 
    .request()
    .input('tipo', sql.VarChar, tipo)
    .input('nombre', sql.VarChar, nombre)
    .input('fabricante', sql.VarChar, fabricante)
    .input('precio', sql.VarChar, precio)
    .input('descripcion', sql.VarChar, descripcion)
    .input('imagen', sql.VarChar, imagen)
    .query(
        'INSERT INTO componentes VALUES (@tipo,@nombre,@fabricante,@precio,@descripcion,@imagen)' 
        );
        return res.redirect('/componentes');
})


router.get('/editarcomponentes/:id_componenetes', async function (req, res){
    const id_componenetes = req.params.id_componenetes;
    
    const pool = await conex.getConnection();
    
    const querycomponentesBYId =  await pool 
    .request() 
    .input('id_componenetes', sql.VarChar, id_componenetes)
    .query(
      "SELECT * FROM componentes WHERE id_componenetes = @id_componenetes");
  
      
  const editarcomponentesById = querycomponentesBYId.recordset;
  
  res.render('../views/componentes/editarcomponentes.hbs', {editarcomponentesById})
  
})

router.post('/editarcomponentes', async function (req, res) {
    
    const {id_componenetes, tipo, nombre, fabricante, precio, descripcion} = req.body;
    
    const pool = await conex.getConnection();
    
    await pool 
    .request()  
    .input('id_componenetes', sql.VarChar, id_componenetes)  
    .input('tipo', sql.VarChar, tipo)  
    .input('nombre', sql.VarChar, nombre)  
    .input('fabricante', sql.VarChar, fabricante)  
    .input('precio', sql.VarChar, precio)  
    .input('descripcion', sql.VarChar, descripcion)    
    .query(
        'UPDATE componentes SET tipo = @tipo, nombre = @nombre, fabricante = @fabricante, precio = @precio ,descripcion = @descripcion where id_componenetes = @id_componenetes'
        )
        res.redirect('/componentes')
    })
    
    router.post('/eliminarcomponentes', async (req, res) => {

        try {
          
          const id_componenetes = req.body.id_componenetes;
          const pool = await conex.getConnection();
              
              await pool  
              .request()
              .input('id_componenetes', sql.VarChar, id_componenetes)
              .query(
                'DELETE componentes WHERE id_componenetes = @id_componenetes')
      
        
                let mensaje = 'componente eliminado correctamente'
      
                return res.send({ mensaje });
                
         } catch (error) {
           
           console.log(error);
           let mensaje = 'Lo siento no se pudo eliminar el componente, contacte al administrador del sistema'
           return res.send({ mensaje });
      
         }   
                
      });
    

    // fromato moneda
    Handlebars.registerHelper('formatCurrency', function (value) {
        // Asumiendo que `value` es un número
        const formattedValue = Number(value).toLocaleString('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0, // Establece el número mínimo de dígitos decimales
          maximumFractionDigits: 0, // Establece el número máximo de dígitos decimales
        });
      
        return formattedValue;
      });
    
    
module.exports = router;