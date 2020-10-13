function mostra(){
    $("#input").css("visibility","visible");
    $("#crea").css("visibility","collapse");
    $("#mostra").css("visibility","collapse");
}

function invia(){
    var par= $("#stanza").attr("value");
    console.log(par);
    $.ajax({
        url:"unisciti",
        type:"POST",
        data:{id:par},
        success: (g)=>{
            localStorage.setItem("giocatore",g);
            localStorage.setItem("id",par);
            window.location = "id="+par;
        }
    });
}

function crea(){
    var par = Math.floor((Math.random() * 10000) + 1);
    $("#codice").text(par.toString());
    $("p").css("visibility","visible");
    $("#crea").css("visibility","collapse");
    $("#mostra").css("visibility","collapse");
    $.ajax({
        url:"nuovastanza",
        type:"POST",
        data:{id:par},
        success: (g)=>{
            localStorage.setItem("giocatore",g);
            localStorage.setItem("id",par);
            window.location = "id="+par;
        }
    });
}