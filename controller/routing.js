var db = require("../model/data.js");
var bodyParser = require("body-parser");
var events = require('events');
var event = new events.EventEmitter();
var response;


module.exports = (app)=>{

    // create application/x-www-form-urlencoded parser
        var urlencodedParser = bodyParser.urlencoded({ extended: false })
        var jsonParser = bodyParser.json()

        app.get('/NuovaPartita', (req, res) => {
            res.render("home");
        });

        app.post("/nuovastanza",urlencodedParser, function(req,res,next){
            response=res;
            event.on("abbinamento_eseguito",(response,id)=>{
                db.crea_nuova_partita(id);
                response.end("g1");
            });
        });
        
        app.post("/unisciti",urlencodedParser, (req,res)=>{
           event.emit("abbinamento_eseguito",response,req.body.id);
           res.end("g2");
        });

        app.get("/:id",(req,res)=>{
            res.render("partita");
        });
    }