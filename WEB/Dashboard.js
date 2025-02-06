

    fetch(`https://5cf5bb1a-922a-4f81-b83d-e1fd1d254ffb.mock.pstmn.io/container-level`)
    .then(response => response.json())
    .then(data=>{
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
                
                plastique  = moyenne_plastique*100;

                /*** Je crée un objet qui correspondra à la div  jauge_papier avec ses caractéristiques ***/
                var gauge_papier= new JustGage({
                    id : "papier_jauge",
                    value : 50,
                    min : 0,
                    max : 100,
                    symbol : '%'
                })

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
                    value : plastique,
                    min : 0,
                    max: 100,
                    symbol : '%'
                })

});