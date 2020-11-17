const e = require("express");
var socket = require("socket.io");
var db = require("../model/data");
var utility = require(__dirname+"/utility.js")
var sock = {}, puntate = {};


async function distribuzione(socket, id, giocatore) {


    if (giocatore == "g1") {
        db.carte_g1(id).then((ris) => {
            socket.emit("le_tue_carte", ris);
        });
    } else {
        db.carte_g2(id).then((ris) => {
            socket.emit("le_tue_carte", ris);
        });
    }

    db.carte_mazzo(id).then((ris) => {
        //console.log(ris);
        ris.pop();
        ris.pop();
        socket.emit("mazzo", ris);
    })

}

async function fine_manche(socket, id, giocatore) {

    if (giocatore == "g1") {
        db.carte_g2(id).then((ris) => {
            socket.emit("avversario", ris);
        });
    } else {
        db.carte_g1(id).then((ris) => {
            socket.emit("avversario", ris);
        });
    }

    db.carte_mazzo(id).then((ris) => {
        socket.emit("mazzo2", ris);
    })

}

async function calcolo_punti(puntata_g1, puntata_g2, id) {
    var carte1 = [], carte2 = [], cartemazzo = [];
    var punti=[0,0];
    await db.carte_g1(id).then((ris) => {
        carte1[0] = ris[0].value;
        carte1[1] = ris[1].value;
        carte1[2] = ris[2].value;
    }).catch((e)=>{
        console.log(e);
    });
    await db.carte_g2(id).then((ris) => {
        carte2[0] = ris[0].value;
        carte2[1] = ris[1].value;
        carte2[2] = ris[2].value;
    }).catch((e)=>{
        console.log(e);
    });
    await db.carte_mazzo(id).then((ris) => {
        cartemazzo[0] = ris[0].value;
        cartemazzo[1] = ris[1].value;
        cartemazzo[2] = ris[2].value;
        cartemazzo[3] = ris[3].value;
        cartemazzo[4] = ris[4].value;
    }).catch((e)=>{
        console.log(e);
    });
    console.log(puntata_g1, puntata_g2);
    console.log(carte1, carte2, cartemazzo);
    var podio_val = cartemazzo.sort(function(a, b){return b-a});
    var podio_pos = utility.trova_pos(podio_val,cartemazzo);
    var obj1 = {
        [puntata_g1[0]] : carte1[0],
        [puntata_g1[1]] : carte1[1],
        [puntata_g1[2]] : carte1[2],
    }
    var obj2  = {
        [puntata_g2[0]] : carte2[0],
        [puntata_g2[1]] : carte2[1],
        [puntata_g2[2]] : carte2[2],
    }
    i=5;
    j=0;
    while(i>0){
        try{
            obj1[podio_pos[j]];    
        }
        catch(e){
            obj1[podio_pos[j]]=0
        }
        try{
            obj2[podio_pos[j]];    
        }
        catch(e){
            obj2[podio_pos[j]] = 0;
        }

        if ( obj1[podio_pos[j]]> obj2[podio_pos[j]]){
            punti[0]=punti[0]+i;
        }else{
            punti[1]=punti[1]+i;
        }
        i=i-2;
        j++;
    }
    console.log(punti);
    return punti;
}

async function punteggi(socket, puntata, id, giocatore) {
    if (sock[id] == undefined) {
        //var g1 = giocatore; 
        sock[id] = socket;
        puntate[id] = puntata;
    } else {
        risultato = await calcolo_punti(puntata, puntate[id], id);
        await db.nuova_manche(id);
        // console.log(risultato);
        //almeno qua faccio un emit globale alla stanza
        socket.emit("punteggio",risultato[0]);
        sock[id].emit("punteggio",risultato[1]);
    }
}


module.exports = (server) => {

    var io = socket(server);

    io.on("connection", (socket) => {

        socket.on("new_game", (id, giocatore) => {
            distribuzione(socket, id, giocatore);
        });

        socket.on("puntata", (puntata, id, giocatore) => {
            fine_manche(socket, id, giocatore);
            punteggi(socket, puntata, id, giocatore);
        })

    });


}
