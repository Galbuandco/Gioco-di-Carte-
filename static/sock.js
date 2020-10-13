var partita = localStorage.getItem("id");
var giocatore = localStorage.getItem("giocatore");
var socket = io.connect("http://151.21.175.6:3000");
var iter=0,puntate=[];

//dom elements
var avversario = document.getElementById("avversario");
var mazzo = document.getElementById("mazzo");
var carte = document.getElementById("tue_carte");
var prossima = document.getElementById("next");


console.log(partita);
socket.emit("new_game",partita,giocatore);

socket.on("le_tue_carte",(ris)=>{
    ris.forEach(element => {
        carte.innerHTML += element.img;
    });
    carte.children[1].style.filter = "contrast(40%)";
    carte.children[2].style.filter = "contrast(40%)";
    avversario.innerHTML = '<img src=card.png>' + '<img src=card.png>' +'<img src=card.png>';
});

socket.on("avversario",(ris)=>{
    avversario.innerHTML="";
    ris.forEach(element => {
        avversario.innerHTML += element.img;
    });
})

socket.on("mazzo",(ris)=>{
    ris.forEach(element => {
        mazzo.innerHTML += element.img;
    });
    mazzo.innerHTML += '<img src=card.png>' + '<img src=card.png>';
    mazzo.children[0].onclick = function(){punto_su(0);}
    mazzo.children[1].onclick = function(){punto_su(1);}
    mazzo.children[2].onclick = function(){punto_su(2);}
    mazzo.children[3].onclick = function(){punto_su(3);}
    mazzo.children[4].onclick = function(){punto_su(4);}
});

socket.on("mazzo2",(ris)=>{
    mazzo.innerHTML="";
    ris.forEach(element => {
        mazzo.innerHTML += element.img;
    });
});

function punto_su(arg){
    if(iter<3){
        if(iter==2){
            puntate[iter]=arg;
            socket.emit("puntata",puntate,partita,giocatore);
            iter++;
        }else{
            puntate[iter]=arg;
            iter++;        
        }
        //carte.children[iter].style.filter = "contrast(100%)";
    }
}

socket.on("punteggio",(risultato)=>{
    console.log(risultato);
    if(giocatore=="g1"){
        document.getElementById("tuoi").innerHTML=risultato[0];
        document.getElementById("suoi").innerHTML=risultato[1];
    }else{
        document.getElementById("tuoi").innerHTML=risultato[1];
        document.getElementById("suoi").innerHTML=risultato[0];
    }
})