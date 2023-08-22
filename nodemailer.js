const randomstring = require('./randomString')
let newRandomPassword = randomstring.generateString();

"use strict";
const nodemailer = require('nodemailer');


// async..await is not allowed in global scope, must use a wrapper
async function main() {
    let email = "gdajbds@gmail.com"
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true, // true for 465, false for other ports
    aport: 465, 
    auth: {
        user: 'emailsprosalco@gmail.com',
        pass: 'qnlrvnwopsogmbll'
    }
});
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'emailsprosalco@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Recuperacion de Clave", // Subject line
    text: `Emails skylink`, // plain text body
    html: `<h1>Hola!</h1>
    <strong>Esta es tu clave de recuperacion: ${newRandomPassword}</strong><p>Ingresa nuevamente al sitio web con esta clave</p>  `, // html body
  });
  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
// html: `Esta es su clave de recuperacion: ${newRandomPassword} Ingresa nuevamente al sitio web con esta clave`, // html body
main().catch(console.error);
module.exports = main;
