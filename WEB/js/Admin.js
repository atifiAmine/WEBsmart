

async function table_users(){
    const token = localStorage.getItem('authToken');
    let user_recherche = document.getElementById("url");
    let nameStartWith =  user_recherche.value;
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
            cacher_users();
            afficher_user(users);
            })  
    }else{
        cacher_users();
    }
}

function afficher_user(users){
    console.log("users",users);
    users.forEach(user =>{
        const id = user.id;
        const Username = user.userName;
        const Name = user.Name;
        console.log("id",id);
        let type = document.createElement("tr");
        type.setAttribute("id",'Admin ');
        type.innerHTML = `<td> ${id}</td>
        <td> ${Name} </td>
        <td> ${Username} </td>
        <td> <button class="modifier_user" type="button" style="color:#2998CC;"> Modifier </button></td>
        <td> <button class="supprimer_user" type="button" style="color:red;"> Supprimer </button></td>`;
        let main = document.querySelector(".table_user");
        main.appendChild(type);
    

    
        
    })
}

function cacher_users(){
    const main  =document.querySelector(".table_user");
    main.innerHTML = '';
}

/* Cette fonction va me permettre de basculer le overlay en mdoe sombre. Voir style.css à partir de ligne 723*/
function changer_background_sombre(){
    let main = document.querySelector(".overlay");
    main.classList.add("show");
}

/* Ici, le overlay redeviendra tranparent */
function changer_background_clair(){
    let main = document.querySelector(".overlay");
    main.classList.remove("show");
}


function ajout_user(){
    let type = document.createElement("div");
    type.setAttribute("id",'ajout_div_user ');
    type.innerHTML =`<form>
     <input id="nom_utilisateur_ajouté" class="form-control-nom-ajoute" name=" Nom d'utilisateur ajouté"
                    placeholder=" Nom d'utilisateur">
                    <input id="email_utilisateur_ajouté" class="form-control-email-ajoute" name=" Email"
                    placeholder=" Email">
                    </form>
                    <div class="buttons_ajout">
                     <button class="btn_ajout_user" type="button"  >Enregistrer utilisateur </button>
                     <button class="btn_quitter_ajout_user" type="button" > Quitter</button>
                     </div>`;
                     let main = document.querySelector(".pop_up_ajout");
                     main.classList.toggle("show");
                     main.appendChild(type);
                     /* Quand je clique sur le boutton "Enregistrer utilisateur", j'appelle la focntion pour enreguistrer users */
                     document.querySelector(".btn_ajout_user").addEventListener("click",function(){
                        enregistrer_user();
                        
                    });
                    /*Quand je clique sur le boutton "Quitter",j'appelle la focntion pour basculer el overlay en mode sombre et cacher la div*/
                    document.querySelector(".btn_quitter_ajout_user").addEventListener("click",function(){
                        changer_background_clair();
                        pas_ajout_user();
                        
                    })
                    

}

function pas_ajout_user(){
    const main = document.querySelector(".pop_up_ajout");
    main.innerHTML = '';
}


document.querySelector(".boutton_ajouter_user").addEventListener("click",function(){
    pas_ajout_user();
    changer_background_sombre();
    ajout_user();
})





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
            name : Name_user_enregistre
        })
    })
    .then((response) => response.json())
    .then((data)=>{
        console.log(data);
        
    })
  
}
       
