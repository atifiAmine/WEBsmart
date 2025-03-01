function ouvrir_deroulant(){
    document.getElementById("recuperer_deroulant").classList.toggle("show");

}

async function recuperer_volume(){

    /*** Pour récupérer les volumes en % de papier,verre et plastique, je devais attendre que cette fonction 
    se réalise, j'ai donc placé des await après chaque requête pour attendre la réponse ***/

    const response  = await  fetch(`https://5cf5bb1a-922a-4f81-b83d-e1fd1d254ffb.mock.pstmn.io/container-level`)
    const data = await response.json();
    console.log(data);
    let contener = data.containerLevel;
    console.log("resultat" + JSON.stringify(contener));
    let moyenne_verre,moyenne_plastique,moyenne_papier;
    for(let key in contener){
        let poubelle = contener[key];
        console.log("resultat2 " + JSON.stringify(poubelle));
        let moy = 0;
        let somme = 0;
        for(let i=0;i<poubelle.length;i++){
            somme += poubelle[i];
            
            }
            moy =somme/poubelle.length;
            if(key == 'bleu'){
                moyenne_verre = moy;
            }else if(key=='vert'){
                moyenne_plastique= moy;
            }else if(key=='jaune'){
                moyenne_papier = moy;
            }

        }
    
        verre = moyenne_verre*100;
        plastique = moyenne_plastique*100;
        papier = moyenne_papier*100;
        console.log("verre",verre);
        console.log("plastique",plastique);
        console.log("papier",papier);
        return { verre, plastique, papier};
    }

function message_alert(gauge,alert_id){
        const id_message = document.getElementById(alert_id);
        if(gauge.config.value>81 && gauge.config.value<100){
            id_message.textContent= ` Remplissage du conteneur  imminent !`;
            id_message.style.display = 'block';
            id_message.style.color = 'red';
        }else if((gauge.config.value)==100){
            id_message.textContent = ` Conteneur  rempli ! `;
            id_message.style.display = 'block';
            id_message.style.color = 'red';
        }else{
            id_message.style.display = 'none';
        }
    }

async function afficher_volumes(){ 

 

    const {verre,plastique,papier} = await recuperer_volume();
    
    console.log("Test_verre",verre);
    console.log("Test_plastique",plastique);
    console.log("Test_papier",papier);

    /** Ici, cet objet correspond à la jauge verre de la div jauge_verre ***/
    var gauge_papier = new JustGage({
        id: "papier_jauge",
        value : papier,
        min : 0,
        max : 100,
        symbol : '%',
        
        })
        
        message_alert(gauge_papier,"message_alert_papier");

    var gauge_verre = new JustGage({
            id: "verre_jauge",
            value : verre,
            min : 0,
            max : 100,
            symbol : '%',
            
        })
        console.log("verifions",gauge_verre.config.value);
        message_alert(gauge_verre,"message_alert_verre");

    var gauge_plastique= new JustGage({
            id: "plastique_jauge",
            value : plastique,
            min : 0,
            max : 100,
            symbol : '%',
            
        })
       
        message_alert(gauge_plastique,"message_alert_plastique");
        

        

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
            

afficher_volumes(); 
conso_perso();
const survol = document.querySelector(".jauge_verre");
const message = document.querySelector('.survol');

function afficher_survol(){
    message.textContent = `Poubelle 1 : ${verre} % Poubelle2 : ${verre}`;
    message.style.display = 'block';
}

function supprimer_survol(){
    message.style.display = 'none';

}

survol.addEventListener('mouseenter',afficher_survol);
survol.addEventListener('mouseleave',supprimer_survol); 

