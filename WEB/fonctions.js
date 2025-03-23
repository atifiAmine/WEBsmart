const token = localStorage.getItem('authToken');
console.log(token);
const role = localStorage.getItem('role');

function ouvrir_deroulant(){
    document.getElementById("recuperer_deroulant").classList.toggle("show");
    if(role=='admin'){
        document.getElementById("gerer_user").classList.add("show");
        console.log("super");
    }else{
        console.log("erreur");
        document.getElementById("gerer_user").classList.remove("show");
    }
   

}