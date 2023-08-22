const bcrypt = require('bcrypt');
const conex = require('../../../database');
const sql = require('mssql');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config')



const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
  
  }
  
  const JwtStrategy = new Strategy( options, (payload, done) => {
    console.log(payload, '=====payload======');
    return done(null, payload);
  });
  
  module.exports = JwtStrategy;
  
