function verifierFormulaire(){

   
        let Username = document.getElementById("nom_utilisateur");
        let UsernameValue = Username.value;
        let erreur_message = document.getElementById("error_input")
        if(UsernameValue==""){
            Username.classList.add("is-invalid");
            Username.classList.remove("is-valid");
            erreur_message.textContent = " Nom d'utilisateur invalide ";
            erreur_message.classList.add("block");  
        }else{
            Username.classList.add("is-valid");
            Username.classList.remove("is-invalid");
            erreur_message.classList.remove("block");
        }
    

    
        let password = document.getElementById("password");
        let passwordValue = password.value;
        if(passwordValue.length<=8){
            password.classList.add("is-invalid");
            password.classList.remove("is-valid");
            password.innerHTML = "<p>Mot de passe invalide</p>";
        }else{
            password.classList.add("is-valid");
            password.classList.remove("is-invalid"); 
        }
    }


button = document.querySelector(".btn");
button.addEventListener("click", verifierFormulaire);