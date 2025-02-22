var nodemailer = require("nodemailer");
var Email = document.getElementById("Email");
var EmailValue = Email.ariaValueMax;
function reinitialiser_pwd(){
    
    const transporter = nodemailer.createTransport({
      service : 'gmail',
      auth:{
        user : "atifiamine77290@gmail.com",
        pass: "qsbsnezajfquoxmi"
    
      }
     });
     var mailOptions = {
      from: "atifiamine77290@gmail.com",
      to : EmailValue ,
      subject : "Envoi d'email pour réinitialisation mot de passe",
      text : "Vous êtes bien inscrits au site Space X"
     };
     transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    
    }
    reinitialiser_pwd();
