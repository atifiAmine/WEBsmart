const token = localStorage.getItem('authToken');
const role = localStorage.getItem('role');
globalThis.APIURL='https://5cf5bb1a-922a-4f81-b83d-e1fd1d254ffb.mock.pstmn.io/';

/* Cette fonction va me eprmettre d'afficher le menu-déroulant */
function ouvrir_deroulant(){
    const menu_deroulant = document.getElementById("recuperer_deroulant");
    menu_deroulant.classList.toggle("show");
    if(!document.getElementById("gerer_user")){ /* Je verifie si l'id existe déjà pour eviter d'avoir plusieurs a*/
        if(role=='admin'){
            const gerer_user = document.createElement("a");
            gerer_user.setAttribute("id",'gerer_user');
            gerer_user.setAttribute("class",'a3');
            gerer_user.href = "Admin.html";
            gerer_user.innerHTML=
            ` 
            <img src ="images/gerer_user.png" alt="gerer_user">
            <p> Gérer utilisateurs </p>
            `;
            menu_deroulant.appendChild(gerer_user);
            
            console.log("super");
        }else{
            console.log("erreur");
            
        }
    

    }
}



/* Cette fonction va me permettre de basculer le overlay en mdoe sombre. Voir style.css à partir de ligne 723*/
function changer_background_sombre(){
    let overlay = document.querySelector(".overlay");
    overlay.classList.add("show");
}

/* Ici, le overlay redeviendra tranparent */
function changer_background_clair(){
    let overlay = document.querySelector(".overlay");
    overlay.classList.remove("show");
}

/* Cette fonction va permetre de masquer une div, quand j'appuierai sur un bouton type 'quitter' */
function cacher_div(className){
    const div  = document.querySelector(className);
    div.innerHTML = '';
}


function Quitter(){
    /*Quand je clique sur le boutton "Quitter",j'appelle la focntion pour basculer le overlay en mode sombre et supprimer le formulaire*/
    document.querySelector(".btn_quitter").addEventListener("click",function(){
        changer_background_clair();
        cacher_div(".pop_up_ajout");
        
    })
}