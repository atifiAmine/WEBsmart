


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
        for(key in users){
            if(key=='id'){
                const  id = users[key];
                console.log("Test",id);
            }else if(key=='userName'){
                const  Username = users[key];
            }else if(key=='Name'){
                const  Name = users[key];
            }
            

        }
        
    })
}

    // let Profile = document.getElementById("profil_user");
    // let Email = document.getElementById("email_user");
    // Profile.innertextContent= 
table_users();
   