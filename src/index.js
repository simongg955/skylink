const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const helpers = require('handlebars-helpers')();


const session = require('express-session')


//DotEnv 
const { config } = require('./config')

const app = express()




app.set('port', config.PORT);

handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
  switch (operator) {
      case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      default:
          return options.inverse(this);
  }
});

handlebars.registerHelper('set', function(variable, value, options) {
  options.data.root[variable] = value;
});




handlebars.registerHelper('eq', function(a,b){
  return a === b;
})






app.engine('exphbs', exphbs({extname: 'exphbs', defaultLayout: 'main', layoutsDir: __dirname + 'views/layouts/assets'}));

handlebars.registerHelper('stars', function (puntuacion) {
  const maxEstrellas = 5; // Número máximo de estrellas
  const numEstrellas = Math.floor(puntuacion); // Parte entera de la puntuación
  const parteDecimal = puntuacion - numEstrellas; // Parte decimal de la puntuación

  let stars = '';

  // Agrega estrellas doradas completas
  for (let i = 0; i < numEstrellas; i++) {
    stars += '<span class="star-gold">★</span>';
  }

  // Agrega una estrella parcial dorada si corresponde
  if (parteDecimal > 0) {
    const porcentaje = parteDecimal * 100;
    const estilo = `width: ${porcentaje}%;`;
    stars += `<span class="star-gold" style="${estilo}">★</span>`;
  }

  // Agrega estrellas vacías si no están llenas
  const estrellasRestantes = maxEstrellas - numEstrellas - (parteDecimal > 0 ? 1 : 0);
  for (let i = 0; i < estrellasRestantes; i++) {
    stars += '<span class="star-empty">★</span>';
  }

  return new handlebars.SafeString(stars); // Usa SafeString para evitar que Handlebars escape el HTML
});
// handlebars.registerHelper('stars', function (puntuacion) {
//   const numStars = Math.floor(puntuacion); // Parte entera de la puntuación
//   const decimal = puntuacion - numStars; // Parte decimal de la puntuación
//   const starHTML = '<span class="star star-gold">★</span>';
//   const emptyStarHTML = '<span class="star star-empty">★</span>';
  
//   let starsHTML = '';

//   // Agrega las estrellas enteras
//   for (let i = 0; i < numStars; i++) {
//     starsHTML += starHTML;
//   }

//   // Agrega la estrella parcial si hay una parte decimal mayor que 0
//   if (decimal > 0) {
//     const partialStar = '<span class="star star-partial" style="width: ' + (decimal * 100) + '%;">★</span>';
//     starsHTML += partialStar;
//   }

//   // Agrega las estrellas vacías necesarias para llegar a 5 estrellas
//   for (let i = numStars + 1; i < 5; i++) {
//     starsHTML += emptyStarHTML;
//   }

//   return new handlebars.SafeString(starsHTML);
// });


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
app.use(require('./routes/comentarios'));

app.use(express.static(path.join(__dirname, 'public')));  




// Settings





  





app.listen(app.get("port"), () => {
    console.log('Server is in port', app.get('port'));
  });

  app.use(express.json());
  
