async function recuperer_poubelles(){  /*D'abord, je fais une requête pour récupérer les poubelles que l'admin entre dans url*/
    const token = localStorage.getItem('authToken');
        fetch(`${globalThis.APIURL}container/level`,{
            method : 'GET',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            let conteners = data.containerLevel;
            for( key in conteners){
                poubelles = conteners[key];
            }
            console.log(poubelles);
            afficher_poubelles(poubelles);
            })  
    }
    

function afficher_poubelles(poubelles){ /* En fonction des poubelles entrées, je les affiche dans la table   onclick="confirmation_suppression('${Profil}')"*/
    console.log("users",poubelles);
    poubelles.forEach((poubelle,index) =>{
        const id = poubelle.id;
        const type = poubelle.type;
        console.log(id,type);
        let ligne = document.createElement("tr");
        ligne.classList.add(index);
        if(index % 2 ==0){
            ligne.style.backgroundColor = '#e1eacd';
        }else{
            ligne.style.backgroundColor = '#D2DBBF';
        }
        ligne.setAttribute("id",'contener ');
        ligne.innerHTML = 
        `<td> ${id}</td>
        <td> ${type} </td>
        <td> <button class="modifier_user" type="button" onclick="Modifier_user()" style="color:#2998CC;"> Modifier </button></td>
        <td> <button class="supprimer_user" type="button" style="color:red;"> Supprimer </button></td>`;
        let tableau = document.querySelector(".table_user");
        tableau.appendChild(ligne);
    })
}


window.onload=recuperer_poubelles();