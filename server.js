var express = require("express");
var routes = require(__dirname+"/controller/routing.js");
var sock = require(__dirname+"/controller/partita.js");


var app = express();

//template engine 
app.set("view engine","ejs");

//static file server
app.use(express.static(__dirname+"/static"));

//richiamo il controller
routes(app);

//default route 404
app.use(function(req, res){
    res.render("home.ejs");
});

var server= app.listen(3000);
console.log("up");

sock(server);

