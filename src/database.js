const sql = require('mssql');
const { config } = require('../src/config')
 
/**  
 * @description `configProsalco1` es un objeto que contiene los ajustes de configuración para conectarse a una base
de datos de Microsoft SQL Server. Incluye propiedades como el nombre de usuario, la contraseña, el
nombre del servidor, el nombre de la base de datos, el número de puerto y otras opciones como el
dialecto y el nombre de la instancia. Este objeto se usa como argumento cuando se establece una
conexión a la base de datos usando el método `sql.connect()`. */
let configDbProsalco = {

  "user": config.dbUser,

  "password": config.dbPassword,

  "server": config.dbServer,
  
  "database": config.database,  
 
  "port": 1434,

  "dialect": "mssql",

  "trustServerCertificate": true,

  "dialectOptions": {

    "instanceName": config.dbInstaceName
  }
};  

// const config = {
//   user: 'mar',
//   password: 'mar',
//   server: 'localhost',
//   database: 'DBPRODUCCIONNewViews', 
//   options: {
//     encrypt: true,
//     trustServerCertificate: true,
//   },
// };


/**
 * @description La función devuelve una conexión a una base de datos SQL utilizando un objeto de configuración.
 * @returns una promesa que se resuelve en un objeto de grupo de conexión de base de datos.
 */
async function getConnection() {
  try {
    const pool = await sql.connect(configDbProsalco);

    return pool;
  } catch (error) {
    console.log(error);
  }
}

getConnection()

module.exports.getConnection = getConnection;
module.exports.sql = sql;

















