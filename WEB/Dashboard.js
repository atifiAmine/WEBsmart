async function recuperer_volume(){

    /*** Pour récupérer les volumes en % de papier,verre et plastique, je devais attendre que cette fonction 
    se réalise, j'ai donc placé des await après chaque requête pour attendre la réponse ***/

    const response  = await  fetch(`https://5cf5bb1a-922a-4f81-b83d-e1fd1d254ffb.mock.pstmn.io/container-level`)
    const data = await response.json();
    console.log(data);
    let contener = data.containerLevel;
    console.log("resultat" + JSON.stringify(contener));
    let moyenne_papier,moyenne_plastique,moyenne_verre;
    for(let key in contener){
        let poubelle = contener[key];
        console.log("resultat2 " + JSON.stringify(poubelle));
        let moy = 0;
        let somme = 0;
        for(let i=0;i<poubelle.length;i++){
            somme += poubelle[i];
            }
            moy =somme/poubelle.length;
            if(key == 'jaune'){
                moyenne_papier = moy;
            }else if(key == 'bleu'){
                moyenne_verre = moy;
            }else if(key=='vert'){
                moyenne_plastique = moy;
            }

        }
        papier = moyenne_papier*100;
        verre = moyenne_verre*100;
        plastique  = moyenne_plastique*100;
        return papier,verre,plastique;
    }


async function afficher_volumes(){ 

    /*** J'attends que la fonction plus haut se réalise pour povoir réutiliser les variables papier
     verre et palstique ***/

    const papier = await recuperer_volume();
    console.log("Test " + papier);
    /*** Je crée un objet qui correspondra à la div  jauge_papier avec ses caractéristiques ***/
    var gauge_papier= new JustGage({
        id : "papier_jauge",
        value : papier,
        min : 0,
        max : 100,
        symbol : '%'
        })

    /** Ici, cet objet correspond à la jauge verre de la div jauge_verre ***/
    var gauge_verre = new JustGage({
        id: "verre_jauge",
        value : verre,
        min : 0,
        max : 100,
        symbol : '%'
        })

    var gauge_plastique = new JustGage({
        id : "verre_plastique",
        value : plastique,
        min : 0,
        max: 100,
        symbol : '%'
        })

    }

afficher_volumes();
recuperer_volume();
/** Je récupère le token stocké dans le localstorage depuis le fichier signin.js  */
const token = localStorage.getItem('authToken');
/** Je fais uen requête avec pour argument le token généré */
fetch (`https://5cf5bb1a-922a-4f81-b83d-e1fd1d254ffb.mock.pstmn.io/users/5468?date=2025-1`,{
    method : 'GET',
    headers: {
        'Authorization' : `Bearer ${token}`
    }
})
.then(response=>response.json())
.then(data=>{
    console.log(data);
    for(key in data){
        resultat_glass = data.glass;
        console.log("resultat_glass " +  JSON.stringify(resultat_glass));
        for (key in resultat_glass){
            if(key=='totalUseThisMonth'){
                volume_glass=resultat_glass[key];
            }
        }
    }
    console.log(volume_glass);
    
})
        
