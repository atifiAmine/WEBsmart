let erreur_message = document.getElementById("error_input_user");
let erreur_password = document.getElementById("error_input_password");

function verifierFormulaire(){

    let Username = document.getElementById("nom_utilisateur");
    let UsernameValue = Username.value;
    if(UsernameValue==""){
        Username.classList.add("is-invalid");
        Username.classList.remove("is-valid");
        erreur_message.textContent = " Nom d'utilisateur invalide ! ";
        erreur_message.style.display="block";  
    }else{
        Username.classList.add("is-valid");
        Username.classList.remove("is-invalid");
        erreur_message.style.display="none";
    }


    let password = document.getElementById("password");
    let passwordValue = password.value;
    if(passwordValue.length<=8){
        password.classList.add("is-invalid");
        password.classList.remove("is-valid");
        erreur_password.textContent="Mot de passe invalide !";
        erreur_password.style.display="block";
    }else{
        password.classList.add("is-valid");
        password.classList.remove("is-invalid");
        erreur_password.style.display="none";
        requetePostman(UsernameValue,passwordValue);
        
        
    }

}

function requetePostman(UsernameValue,passwordValue){
    if (verifierFormulaire){
        console.log(UsernameValue,passwordValue);
        fetch(`https://5cf5bb1a-922a-4f81-b83d-e1fd1d254ffb.mock.pstmn.io/auth/signin?username=${UsernameValue}&password=${passwordValue}`)
        .then(response=>response.json())
        .then(data => {
            if(data.login=="success"){
                console.log("Succès");
                let token = data.authToken;
                let role = data.role;
                localStorage.setItem('authToken',token);
                localStorage.setItem('role',role);
                document.location.href="Dashboard.html";
            }else{
                console.log("erreur");
                erreur_password.textContent = " Nom d'utilsateur ou mot de passe inexistant !";
                erreur_password.style.display="block";
                }
                })
                .catch(error => {
                    console.error("Errreur lors de la requête",error);
                });

                    
                    }

                }
           
                

button = document.querySelector(".btn");
button.addEventListener("click", verifierFormulaire);