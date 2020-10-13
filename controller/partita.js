var socket = require("socket.io");
var db = require("../model/data");
var sock={},puntate={};


async function distribuzione(socket,id,giocatore){


    if ( giocatore == "g1"){
        db.carte_g1(id).then((ris)=>{
            socket.emit("le_tue_carte",ris);
        });
    }else{
        db.carte_g2(id).then((ris)=>{
            socket.emit("le_tue_carte",ris);
        });
    }

    db.carte_mazzo(id).then((ris)=>{
        //console.log(ris);
        ris.pop();
        ris.pop();
        socket.emit("mazzo",ris);
    })

}

async function fine_manche(socket,id,giocatore){

    if ( giocatore == "g1"){
        db.carte_g2(id).then((ris)=>{
            socket.emit("avversario",ris);
        });
    }else{
        db.carte_g1(id).then((ris)=>{
            socket.emit("avversario",ris);
        });
    }

    db.carte_mazzo(id).then((ris)=>{
        socket.emit("mazzo2",ris);
    })

}

async function calcolo_punti(puntata_g1,puntata_g2,id){
    //da fare 
}

async function punteggi(socket,puntata,id,giocatore){
    if(sock[id]==undefined){
        sock[id]=socket;
        puntate[id]=puntata;
    }else{
        risultato= await calcolo_punti(puntata,puntate[id],id);
        await db.nuova_manche(id);
        // console.log(risultato);
        //almeno qua faccio un emit globale alla stanza
        socket.emit("punteggio",risultato);
        sock[id].emit("punteggio",risultato);
    }
}


module.exports = (server)=>{

    var io=socket(server);

    io.on("connection",(socket)=>{

        socket.on("new_game",(id,giocatore)=>{
            distribuzione(socket,id,giocatore);
        });

        socket.on("puntata",(puntata,id,giocatore)=>{
            fine_manche(socket,id,giocatore);
            punteggi(socket,puntata,id,giocatore);        
        })

    });


}
