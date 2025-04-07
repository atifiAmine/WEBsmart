

function reinitialiser_pwd(){
  var Email = document.getElementById("Email");
  var EmailValue = Email.value;

  fetch(`${globalThis.APIURL}send-email?email=${EmailValue}`,{
    method : "POST",
    headers : {
      'content-type' : "application/json"
    },
    body : JSON.stringify({
      Email : EmailValue
    })
  })
  .then(response =>response.json())
  .then(data=>{
    console.log(data.message);

  })

}
    
