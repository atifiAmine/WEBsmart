a=0;
fetch(`https://5cf5bb1a-922a-4f81-b83d-e1fd1d254ffb.mock.pstmn.io/container-level`)
.then(response => response.json())
.then(data=>{
        console.log(data);
            let contener = data.containerLevel;
            console.log("resultat" + JSON.stringify(contener));
            for(let i=0;i<contener.length;i++){
                let poubelle = contener[i];
                console.log(poubelle);
                for(let key in poubelle){
                    console.log("resultat2 :" + key + ':' + poubelle[key]);
            }
        }
    
        });
      
 

/*** Je crée un objet qui correspondra à la div  jauge_papier avec ses caractéristiques ***/
var gauge_papier= new JustGage({
    id : "papier_jauge",
    value : 20,
    min : 0,
    max : 100,
    symbol : '%'
});

/** Ici, cet objet correspond à la jauge verre de la div jauge_verre ***/
var gauge_verre = new JustGage({
    id: "verre_jauge",
    value : a,
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