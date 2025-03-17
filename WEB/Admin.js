


async function table_users(){
    const token = localStorage.getItem('authToken');
    let user_recherche = document.getElementById("url");
    let nameStartWith =  user_recherche.value;
    let limit = 2;
    if(nameStartWith!==''){
        fetch(`https://5cf5bb1a-922a-4f81-b83d-e1fd1d254ffb.mock.pstmn.io/users?nameStartWith=${nameStartWith}&limit=${limit}`,{
            method : 'GET',
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            let users = data.users;
            console.log(users);
            afficher_user(users);
            })  
    }else{
        supprimer_users();
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

function supprimer_users(){
    const main  =document.querySelector(".table_user");
    main.innerHTML = '';
}


    // let Profile = document.getElementById("profil_user");
    // let Email = document.getElementById("email_user");
    // Profile.innertextContent= 

function ajout_user(){
    let type = document.createElement("div");
    type.setAttribute("id",'ajout_div_user ');
    type.innerHTML =` <input id="nom_utilisateur_ajouté" class="form-control-nom-ajoute" name=" Nom d'utilisateur ajouté"
                    placeholder=" Nom d'utilisateur">
                    <input id="email_utilisateur_ajouté" class="form-control-email-ajoute" name=" Email"
                    placeholder=" Email">
                     <button class="btn_ajout_user" type="button" onclick="verifierFormulaire()" >Ajouter utilisateur </button>`;
                     let main = document.querySelector(".pop_up_ajout");
                     main.appendChild(type);

}

