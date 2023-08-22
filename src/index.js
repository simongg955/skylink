const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const helpers = require('handlebars-helpers')();

const session = require('express-session')
const https = require('https'); // Importa el módulo https u otros módulos relevantes

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; // Desactiva temporalmente la validación del certificado


//DotEnv 
const { config } = require('./config')

const app = express()





app.set('port', config.PORT);

handlebars.registerHelper('eq', function(a,b){
  return a === b;
})


app.engine('exphbs', exphbs({extname: 'exphbs', defaultLayout: 'main', layoutsDir: __dirname + 'views/layouts/assets'}));

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
}))
app.set('view engine', '.hbs');



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./utils/auth');

//Sesion
app.use(session({
  secret: 'secretKey',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 350 * 10000  // sesión válida por 1 minuto
  }
}));


app.use(require('./routes/recoveryPassword'));
app.use(require('./routes/login'));
app.use(require('./routes/inicio'));
app.use(require('./routes/componentes'));
app.use(require('./routes/cursos'));
app.use(require('./routes/noticias'));

app.use(express.static(path.join(__dirname, 'public')));  




// Settings





  





app.listen(app.get("port"), () => {
    console.log('Server is in port', app.get('port'));
  });

  app.use(express.json());
  
