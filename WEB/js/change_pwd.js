function changer_pwd(){
    var password = document.getElementById("password").value;
    const userName = localStorage.getItem('username');
    fetch(`${globalThis.APIURL}admin/edit-user?username=${userName}&password=${password}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,  // Authentification avec token
            'Content-Type': 'application/json'   // Spécifie que l'on envoie des données JSON
        },
        body: JSON.stringify({
            username: userName,
            password : password  
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);  // Affiche les données reçue
        if(data.success){
        document.location='signin.html';
    }
    })
    .catch((error) => {
        console.error('Erreur:', error);  // Affiche l'erreur dans la console
        alert('Une erreur est survenue, veuillez réessayer.');
    });
   

}