require('dotenv').config()

const config = { 
    
    PORT: process.env.ENV_PORT, 
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbServer: process.env.DB_SERVER,
    database: process.env.DATABASE_NAME,
    dbPort: process.env.DB_PORT,
    dbInstaceName: process.env.DB_INSTANCENAME,
    jwtSecret: process.env.JWT_SECRET,
}

module.exports = { config }