const token = localStorage.getItem('authToken');
console.log(token);

function ouvrir_deroulant(){
    document.getElementById("recuperer_deroulant").classList.toggle("show");
    if(token=='lasdkjfhasdlkjasdoa89s53li7utbcd'){
        document.getElementById("gerer_user").classList.add("show");
        console.log("super");
    }else{
        console.log("erreur");
        document.getElementById("gerer_user").classList.remove("show");
    }
   

}

async function recuperer_volume(){

    /*** Pour récupérer les volumes en % de papier,verre et plastique, je devais attendre que cette fonction 
    se réalise, j'ai donc placé des await après chaque requête pour attendre la réponse ***/
    
    const response  = await  fetch(`https://5cf5bb1a-922a-4f81-b83d-e1fd1d254ffb.mock.pstmn.io/container/level`)
    const data = await response.json();
    console.log(data);
    let contener = data.containerLevel;
    console.log("resultat" + JSON.stringify(contener));
    for(let key in contener){ /* Pour chaque poubelle, je rappelle parcourir_conteneur() qui crée une div */
        /* En fonction de la key, la div sera différente */
        if(key=='bleu'){
            let poubelle = 'papier';
            parcourir_conteneur(contener,key,poubelle);
        }else if(key =='vert'){
            let poubelle = 'verre';
            parcourir_conteneur(contener,key,poubelle);
        }else if(key=='jaune'){
            let poubelle = 'plastique';
            parcourir_conteneur(contener,key,poubelle);
        }
    
}
}

function parcourir_conteneur(contener,key,poubelle){
    let valeur = key.level;
    console.log("resultat2 " + JSON.stringify(valeur));
            for(let i=0;i<valeur.length;i++){
                console.log(valeur[i]);
                /* Ici, je construit une div et je l'implémente d'un h2,d'une jauge,d'une image */
                let type = document.createElement("div");
                type.setAttribute("id",`Poubelle${i+1}`);
                type.setAttribute("class","poubelle")
                type.innerHTML = `<h2>Poubelle ${i+1}</h2>
                <div class="jauge" id="${key}jauge${i+1}"></div>
                <img src="poubelle_${poubelle}.png" alt="poubelle"  >
                <h2> ${poubelle} </h2>  `;
                console.log(valeur[i]);
                let main = document.querySelector(".main-menu");
                main.appendChild(type);
                afficher_volumes(`${key}jauge${i+1}`,valeur[i]);
                
}
}


recuperer_volume();


function afficher_volumes(id_jauge,valeur_jauge){ 
    let jauge =  document.getElementById(id_jauge);
    console.log(id_jauge,valeur_jauge);
    
    

    /** Ici,une même jauge  **/
   

    var gauge= new JustGage({
            id: id_jauge,
            value : valeur_jauge*100,
            min : 0,
            max : 100,
            symbol : '%',
            
        })
       
    }



function conso_perso(){
    /** Je récupère le token stocké dans le localstorage */
    const token = localStorage.getItem('authToken');
    console.log(token);
    /** Je fais une requête avec pour argument le token généré */
    fetch (`https://5cf5bb1a-922a-4f81-b83d-e1fd1d254ffb.mock.pstmn.io/users/id/date=2025-1`,{
        method : 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        /** Je parcours toutes les clés de data */
        for(key in data){
            resultat_glass = data.bleu; /** Ici, je recupère les données spécifiques au conteneur verre (poubelle bleu) et je stocke dans resultat_glass */ 
            console.log("resultat_glass " +  JSON.stringify(resultat_glass));
            for (key in resultat_glass){
                /** c'est le volume perso qui m'interrese, donc je recupère la clé totalUseThisMonth */
                if(key=='totalUseThisMonth'){
                    /** Je récupère la valeur de cette clé, cad le volume de verre jeté par l'utilisateur */
                    volume_glass=resultat_glass[key];
                }
            }
            /* Je fais la même chose pour les container plastique et papier */

            resultat_plastique=data.vert;
            for(key in resultat_plastique){
                if(key=='totalUseThisMonth'){
                    volume_plastique=resultat_plastique[key];
                }
            }

            resultat_papier=data.jaune;
            for(key in resultat_papier){
                if(key=='totalUseThisMonth'){
                    volume_papier=resultat_papier[key];
                }

            
        
            }
        
            for(key in resultat_glass){
                if(key=='lastUse'){
                    horaire_glass=resultat_glass[key];
                }
            }

            for(key in resultat_plastique){
                if(key=='lastUse'){
                    horaire_plastique = resultat_plastique[key];
                }
            }

            for(key in resultat_papier){
                if(key=='lastUse'){
                    horaire_papier = resultat_papier[key];
                }
            }
            

        }
        
        console.log(volume_glass);
        console.log(volume_plastique);
        console.log(volume_papier);
        
        function horaire(n){

            var date = new Date(n*1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var secondes = "0" + date.getSeconds();
            var resultat_horaire = hours + ':' + minutes.substr(-2) + ':' + secondes.substr(-2);
            console.log(resultat_horaire);
            return resultat_horaire
        }
        horaire_glass = horaire(horaire_glass);
        horaire_plastique = horaire(horaire_plastique);
        horaire_papier = horaire(horaire_papier);
        
        
        const id_glass_horaire = document.getElementById("horaire_glass");
        id_glass_horaire.textContent = horaire_glass;
        
        
        const id_glass_volume = document.getElementById("volume_glass");
        /* Je stocke   volume_glass (cad le volulme perso de verre jeté) dans id_glass */
        id_glass_volume.textContent = volume_glass;

        const id_plastique_horaire = document.getElementById("horaire_plastique");
        id_plastique_horaire.textContent= horaire_plastique;

        const id_plastique = document.getElementById("volume_plastique");
        id_plastique.textContent= volume_plastique;

        const id_papier_horaire = document.getElementById("horaire_papier");
        id_papier_horaire.textContent= horaire_papier;

        const id_papier = document.getElementById("volume_papier");
        id_papier.textContent =  volume_papier;

        
           
        
    })

}
            

conso_perso();



