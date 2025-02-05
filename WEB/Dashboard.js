
/*** Je crée un objet qui correspondra à la div  jauge_papier avec ses caractéristiques ***/
var gauge_papier= new JustGage({
    id : "papier_jauge",
    value : 80,
    min : 0,
    max : 100,
    symbol : '%'
   
    
    
});
/** Ici, cet objet correspond à la jauge verre de la div jauge_verre ***/
var gauge_verre = new JustGage({
    id: "verre_jauge",
    value : 50,
    min : 0,
    max : 100,
    symbol : '%'
})


var gauge_plastique = new JustGage({
    id : "verre_plastique",
    value : 40,
    min : 0,
    max: 100,
    symbol : '%'
})