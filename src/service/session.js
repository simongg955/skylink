
module.exports = {
    
    isLoggedIn( req, res ){
        try {
            if (req.session.user) {
              if (req.session.user.lastVisit + (60 * 1000) > Date.now()) {
                req.session.user.lastVisit = Date.now();
                var datosUsuario = global.SesionU;

       
    
                 return datosUsuario ; 
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
        }
    }

// module.exports = {

//     isLoggedIn( req, res ){
//         try {
//             const SECONDS = 60;
//             const MILLISECONDS = 1000
//             if (req.session.user && req.session.user.lastVisit + (SECONDS * MILLISECONDS) > Date.now()) {
//                 var datosUsuario = global.SesionU;
//                 return true;
//               }
//             else {
//                 console.log("EL EN ELSE DE ISLOGGEDIN");
//                 return res.render('../views/login/login.hbs', {layout: 'partials/empty' }); 
//             }
//         }
//         catch
//         {       
//             console.log("EL EN CATCH DE ISLOGGEDIN");
//             return res.render('../views/login/login.hbs', {layout: 'partials/empty' }); 
//           }   
//     }
// }









