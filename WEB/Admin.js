


async function table_users(){
    const token = localStorage.getItem('authToken');
    let nameStartWith = 'a';
    let limit = 2;
    fetch(`https://5cf5bb1a-922a-4f81-b83d-e1fd1d254ffb.mock.pstmn.io/users?${nameStartWith}&${limit}`,{
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
        let id=0;
        for(key in users){
            informations_user = users[key];
            for(let i=0;i<informations_user.length;i++){
                     informations_user[i].id  = id;
                      console.log("id",id);
                // for(let i=0;i<users.length;i++){
                //     let ligne   = document.createElement("tr");
                //     ligne.setAttribute("id",`User${i+1}`);
                //     ligne.setAttribute("class","User")
                //     ligne.innerHTML = `<td>${users[id[i+1]]}</td>
                //     <td>${users[Username[i+1]]}</td>
                //     <td>${users[Name[i+1]]}</td>
                //     </tr>`
                //     let main = document.querySelector("table_user");
                //     main.appendChild(ligne);
                // }
               
            }
        }
        
        
        })
       
         
        
    
}







    // let Profile = document.getElementById("profil_user");
    // let Email = document.getElementById("email_user");
    // Profile.innertextContent= 
table_users();
   