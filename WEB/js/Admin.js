/** Ici, Les fonctions liées à l'affichage des utilisateurs en fonction de ce que l'admin a entré **/ 


async function recuperer_users(){  /*D'abord, je fais une requête pour récupérer les users que l'admin entre dans url*/
    const token = localStorage.getItem('authToken');
    let nameStartWith = document.getElementById("url").value;
    let limit = document.getElementById("nombre").value;
        fetch(`${globalThis.APIURL}admin/users?nameStartWith=${nameStartWith}&limit=${limit}`,{
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
    }
    

function afficher_user(users){ /* En fonction des users entrés, je les affiche dans la table   onclick="confirmation_suppression('${Profil}')"*/
    console.log("users",users);
    users.forEach((user,index) =>{
        const id = user.id;
        const Username = user.userName;
        const rfid = user.userRfid;
        const Profil = user.Name;
        console.log(rfid,Profil);
        let ligne = document.createElement("tr");
        ligne.classList.add(index);
        if(index % 2 ==0){
            ligne.style.backgroundColor = '#e1eacd';
        }else{
            ligne.style.backgroundColor = '#D2DBBF';
        }
        ligne.setAttribute("id",'Admin ');
        ligne.innerHTML = 
        `<td> ${id}</td>
        <td> ${Profil} </td>
        <td> ${Username} </td>
        <td> ${rfid} </td>
        <td> <button class="modifier_user" type="button" onclick="Modifier_user()" style="color:#2998CC;"> Modifier </button></td>
        <td> <button class="supprimer_user" type="button" style="color:red;"> Supprimer </button></td>`;
        let tableau = document.querySelector(".table_user");
        tableau.appendChild(ligne);

        /* Quand j'appuie sur el bouton supprimer d'un des user, j'appelle la fonction pour afficher la div de supression*/
        ligne.querySelector(".supprimer_user").addEventListener("click",function(){
        cacher_div(".pop_up_ajout");
        changer_background_sombre();
        confirmation_suppression(Profil,id);
    })

       /* Quand j'appuie sur le boutton "Modifier", le overlay passe en sombre et le formulaire pour modifier un 
         user s'affiche */
    ligne.querySelector(".modifier_user").addEventListener("click",function(){
        cacher_div(".pop_up_ajout");
        changer_background_sombre();
        Modifier_user(id);
   
    })
   
    
    })

    
}


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

        <input id="tag_nfc" class="form-control-nfc" name="nfc"
        placeholder="Tag NFC">

        <select id="role" name="role">   
        <option value="member">Membre</option>
        <option value="admin">Admin</option>
        </select>

    </form>
    <div class="buttons">
        <button class="btn_enregistrer_user" type="button"  > Enregistrer utilisateur </button>
         <button class="btn_quitter" type="button" onclick="Quitter()" >Quitter</button>
     </div>`;

     let main = document.querySelector(".pop_up_ajout");
     main.classList.toggle("show");
     main.appendChild(popup_ajout);

    //  let main_quitter = document.querySelector(".btn_quitter").addEventListener("click",Quitter());
     

     /* Quand je clique sur le boutton "Enregistrer utilisateur", j'appelle la focntion pour enreguistrer users */
     document.querySelector(".btn_enregistrer_user").addEventListener("click",function(){
        enregistrer_user();
        cacher_div(".pop_up_ajout");
        changer_background_clair();
        recuperer_users();


})
}
    


function enregistrer_user(){
    let Name_user_enregistre = document.getElementById("nom_utilisateur_ajouté").value;
    let Email_user_enregistre = document.getElementById("email_utilisateur_ajouté").value;
    let NFC = document.getElementById("tag_nfc").value;
    let role = document.getElementById("role").value;

    fetch(`${globalThis.APIURL}admin/users?userName=${Email_user_enregistre}&name=${Name_user_enregistre}&nfcTag=${NFC}&role=${role}`,{
        method: 'POST', /* J'envoie des informations à l'API, c'est donc une requete POST */
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            /* Mes informations correspondent à ce qu'a entré l'admin */
            userName : Email_user_enregistre,
            Name : Name_user_enregistre,
            useRfid : NFC,
            role : role

            
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





/* Fonction Modifier */

function Modifier_user(id){

    popup_modifier = document.createElement("div");
    popup_modifier.setAttribute("id",'modifier_div_user ');
    popup_modifier.innerHTML = 
    `<form>
    <input id="profil_utilisateur_modifié" class="form-control-nom" name=" profil"
    placeholder="Profil">
   <input id="email_utilisateur_modifié" class="form-control-email" name=" Email"
   placeholder=" Email">
     <input id="rfid_utilisateur_modifié" class="form-control-nfc" name=" rfid"
   placeholder=" Rfid">
    <input id="pwd_utilisateur_modifié" class="form-control-pwd"  name=" pwd"
   placeholder="Mot de passe ">
    </form>
    <div class="buttons">
    <button class="btn_modifier_pwd" type="button"  > Modifier mot de passe  </button>
    <button class="btn_update" type="button" onclick="update(${id})" > Mettre à jour  </button>
        <button class="btn_quitter" type="button" onclick="Quitter()"> Quitter </button>
    </div>`;
    let main = document.querySelector(".pop_up_ajout");
    main.classList.toggle("show");
    main.appendChild(popup_modifier);
     
 }

function update(id) {

    let Profil_user_modifie = document.getElementById("profil_utilisateur_modifié").value;
    let Email_user_modifie = document.getElementById("email_utilisateur_modifié").value;
    let rfid = document.getElementById("rfid_utilisateur_modifié").value;
    let password = document.getElementById("pwd_utilisateur_modifié").value;
      
  
    
    fetch(`${globalThis.APIURL}admin/users?id=${id}&username=${Email_user_modifie}&name=${Profil_user_modifie}&password=${password}&nfcTag=${rfid}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,  // Authentification avec token
            'Content-Type': 'application/json'   // Spécifie que l'on envoie des données JSON
        }
       
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

function confirmation_suppression(Profil,id){
    
        console.log(Profil);
        popup_supprimer = document.createElement("div");
        popup_supprimer.classList.add('div_supprimer_user');
        popup_supprimer.innerHTML = 
        `<form>
        <p>  Etes-vous sûr de vouloir supprimer l'utilisateur ${Profil} ? </p>
        </form>
        <div class="buttons">
        <button class="oui" type="button"  > Oui </button>
        <button class="btn_quitter" type="button" onclick="Quitter()"  > Non  </button>
        </div>`;
    let main = document.querySelector(".pop_up_ajout");
    main.classList.toggle("show");
    main.appendChild(popup_supprimer);

        popup_supprimer.querySelector(".oui").addEventListener("click", function() {
            supprimer_user(id, Profil);
            cacher_div(".pop_up_ajout");
            changer_background_clair();
        });
    }
        
    
     



function supprimer_user(id,Profil){
    fetch(`${globalThis.APIURL}admin/users?userId=${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,  // Authentification avec token
            'Content-Type': 'application/json'   // Spécifie que l'on envoie des données JSON
        },
        
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);  // Affiche les données reçues
    })
    .catch((error) => {
        console.error('Erreur:', error);  // Affiche l'erreur dans la console
        alert('Une erreur est survenue, veuillez réessayer.');
    });
    let main = document.querySelector(".div_supprimer_user");
    main.innerHTML = `<p> Utilisateur ${Profil} supprimé </p>`;
        
        
}

window.onload=recuperer_users();






