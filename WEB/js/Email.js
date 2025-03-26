const express = require('express');
const fs = require("fs");
const nodemailer = require("nodemailer");
var Email = document.getElementById("Email");
var EmailValue = Email.value;
function reinitialiser_pwd(){

  fetch(`https://5cf5bb1a-922a-4f81-b83d-e1fd1d254ffb.mock.pstmn.io/send-email?email=${EmailValue}`,{
    method : "POST",
    headers : {
      'content-type' : "application/json"
    },
  })
  .then(response =>response.json())
  .then(data=>{
    console.log(data.message);

  })
    
  const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth:{
      user : "atifiamine77290@gmail.com",
      pass: "qsbsnezajfquoxmi"
  
    }
   });
   var mailOptions = {
    from: "atifiamine77290@gmail.com",
    to : EmailValue,
    subject : "Envoi d'email avec Node.js",
    text : "Veuillez cliquez sur le lien pour réinitialisez votre mot de passe"
   };
   transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

button = document.querySelector(".btn");
button.addEventListener("click", reinitialiser_pwd());