
/** Ici,  Les fonctions liées au formuaire d'inscription d'un nouvel utilisateur **/  


function ouvrir_formulaire(){
    let popup_ajout = document.createElement("div");
    popup_ajout.setAttribute("id",'ajout_div_user ');
    popup_ajout.innerHTML =
    `<form>
         <input id="nom_utilisateur_ajouté" class="form-control-nom" name=" Nom d'utilisateur ajouté"
         placeholder=" Nom d'utilisateur">
        <input id="email_utilisateur_ajouté" class="form-control-email" name=" Email"
        placeholder=" Email">
    </form>
    <div class="buttons">
        <button class="btn_enregistrer_user" type="button"   > Enregistrer utilisateur </button>
         <button class="btn_quitter" type="button"  onclick="Quitter()"> Quitter</button>
     </div>`;

     let main = document.querySelector(".pop_up_ajout");
     main.classList.toggle("show");
     main.appendChild(popup_ajout);

     

     /* Quand je clique sur le boutton "Enregistrer utilisateur", j'appelle la focntion pour enreguistrer users */
     document.querySelector(".btn_enregistrer_user").addEventListener("click",enregistrer_user);


}
    


function enregistrer_user(){
    let Name_user_enregistre = document.getElementById("nom_utilisateur_ajouté").value;
    let Email_user_enregistre = document.getElementById("email_utilisateur_ajouté").value;
    fetch(`${globalThis.APIURL}users?userName=${Email_user_enregistre}&name=${Name_user_enregistre}`,{
        method: 'POST', /* J'envoie des informations à l'API, c'est donc une requete POST */
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            /* Mes informations correspondent à ce qu'a entré l'admin */
            userName : Email_user_enregistre,
            
        })
    })
    .then((response) => response.json())
    .then((data)=>{
        console.log(data);
        
    })
  
}
   

/* Quand j'appuie sur le boutton "Ajouter un utilisateur", le overlay passe en sombre et le formulaire pour enregistrer un 
nouvel user s'affiche */
document.querySelector(".boutton_ajouter_user").addEventListener("click",function(){
    cacher_div(".pop_up_ajout");
    changer_background_sombre();
    ouvrir_formulaire();
})



/** Ici, Les fonctions liées à l'affichage des utilisateurs en fonction de ce que l'admin a entré **/ 


async function recuperer_users(){  /*D'abord, je fais une requête pour récupérer les users que l'admin entre dans url*/
    const token = localStorage.getItem('authToken');
    let nameStartWith = document.getElementById("url").value;
    let limit = 8;
    if(nameStartWith!==''){
        fetch(`${globalThis.APIURL}users?nameStartWith=${nameStartWith}&limit=${limit}`,{
            method : 'GET',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            let users = data.users;
            console.log(users);
            cacher_div(".table_user");
            afficher_user(users);
            })  
    }else{
        cacher_div(".table_user");
    }
}

function afficher_user(users){ /* En fonction des users entrés, je les affiche dans la table   onclick="confirmation_suppression('${Profil}')"*/
    console.log("users",users);
    users.forEach(user =>{
        const id = user.id;
        const Username = user.userName;
        const Profil = user.Name;
        let ligne = document.createElement("tr");
        ligne.setAttribute("id",'Admin ');
        ligne.innerHTML = 
        `<td> ${id}</td>
        <td> ${Profil} </td>
        <td> ${Username} </td>
        <td> <button class="modifier_user" type="button" onclick="Modifier_user()" style="color:#2998CC;"> Modifier </button></td>
        <td> <button class="supprimer_user" type="button" style="color:red;"> Supprimer </button></td>`;
        let tableau = document.querySelector(".table_user");
        tableau.appendChild(ligne);

        /* Quand j'appuie sur el bouton supprimer d'un des user, j'appelle la fonction pour afficher la div de supression*/
        ligne.querySelector(".supprimer_user").addEventListener("click",function(){
        cacher_div(".pop_up_ajout");
        changer_background_sombre();
        confirmation_suppression(Profil);
    })
   
    })
    /* Quand j'appuie sur le boutton "Modifier", le overlay passe en sombre et le formulaire pour modifier un 
         user s'affiche */
    document.querySelector(".modifier_user").addEventListener("click",function(){
        cacher_div(".pop_up_ajout");
        changer_background_sombre();
        Modifier_user();
    
    })

    
}


/* Fonction Modifier */

function Modifier_user(){

    popup_modifier = document.createElement("div");
    popup_modifier.setAttribute("id",'modifier_div_user ');
    popup_modifier.innerHTML = 
    `<form>
    <input id="profil_utilisateur_modifié" class="form-control-nom" name=" profil"
    placeholder="Profil">
   <input id="email_utilisateur_modifié" class="form-control-email" name=" Email"
   placeholder=" Email">
    </form>
    <div class="buttons">
    <button class="btn_modifier_pwd" type="button"  > Modifier mot de passe  </button>
    <button class="btn_update" type="button" onclick="update_pwd()" > Mettre à jour  </button>
        <button class="btn_quitter" type="button" onclick="Quitter()"> Quitter </button>
    </div>`;
    let main = document.querySelector(".pop_up_ajout");
    main.classList.toggle("show");
    main.appendChild(popup_modifier);
     
 }

function update_pwd() {
    
    let Profil_user_modifie = document.getElementById("profil_utilisateur_modifié").value;
    let Email_user_modifie = document.getElementById("email_utilisateur_modifié").value;
    
    fetch(`${globalThis.APIURL}admin/edit-user?username=${Email_user_modifie}&name=${Profil_user_modifie}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,  // Authentification avec token
            'Content-Type': 'application/json'   // Spécifie que l'on envoie des données JSON
        },
        body: JSON.stringify({
            username: Email_user_modifie,
            name : Profil_user_modifie  
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);  // Affiche les données reçues
    })
    .catch((error) => {
        console.error('Erreur:', error);  // Affiche l'erreur dans la console
        alert('Une erreur est survenue, veuillez réessayer.');
    });
}

function confirmation_suppression(Profil){
    
        console.log(Profil);
        popup_supprimer = document.createElement("div");
        popup_supprimer.classList.add('div_supprimer_user');
        popup_supprimer.innerHTML = 
        `<form>
        <p>  Etes-vous sûr de vouloir supprimer l'utilisateur ${Profil} ? </p>
        </form>
        <div class="buttons">
        <button class="oui" type="button"  >    Oui    </button>
        <button class="btn_quitter" type="button" onclick="Quitter()"  > Non  </button>
        </div>`;
    let main = document.querySelector(".pop_up_ajout");
    main.classList.toggle("show");
    main.appendChild(popup_supprimer);
     
}


function supprimer_user(){
    fetch(`${globalThis.APIURL}admin/edit-user?username=${Email_user_modifie}&name=${Profil_user_modifie}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,  // Authentification avec token
            'Content-Type': 'application/json'   // Spécifie que l'on envoie des données JSON
        },
        body: JSON.stringify({
            username: Email_user_modifie,
            name : Profil_user_modifie  

})
    })
        
}










