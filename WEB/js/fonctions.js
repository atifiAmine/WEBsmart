const token = localStorage.getItem('authToken');
const role = localStorage.getItem('role');
globalThis.APIURL='http://172.16.15.74:3330/';


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

function pas_ajout_user(){
    const main = document.querySelector(".pop_up_ajout");
    main.innerHTML = '';
}