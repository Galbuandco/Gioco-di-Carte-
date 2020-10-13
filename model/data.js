const mongo = require("mongoose");
sigle = ["AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "KC", "QC", "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "KD", "QD", "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "KH", "QH", "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "KS", "QS"];
var risultato_query;

    mongo.connect('mongodb://localhost/carte', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongo.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected");
});

const carteSchema = new mongo.Schema({
    card: String,
    img: String,
    value: Number,
});

const partiteSchema = new mongo.Schema({
    name: String, //numero o stringa ??
    g1: [carteSchema],
    g2: [carteSchema],
    mazzo: [carteSchema],
    pt1: Number,
    pt2: Number,
});


var carte = mongo.model("carte", carteSchema);
var Game = mongo.model("partite", partiteSchema);


module.exports =  {

    crea_nuova_partita : async function (id){
        var game = new Game({ name: id,pti:0,pt2:0});
        var promises=[];
        for(var i=0;i<3;i++){
            promises.push(carte.findOne({ card: sigle[Math.floor(Math.random()*53)] }, (err, doc) => {
                game.g1.push(doc);
                //game.save();
            }));
        };
        for(var i=0;i<3;i++){
            promises.push(carte.findOne({ card: sigle[Math.floor(Math.random()*53)] }, (err, doc) => {
                game.g2.push(doc);
                //game.save();
            }));
        }
        for(var i=0;i<5;i++){
            promises.push(carte.findOne({ card: sigle[Math.floor(Math.random()*53)] }, (err, doc) => {
                game.mazzo.push(doc);
                //game.save();
            }));
        }
        Promise.all(promises).then(()=>{game.save()});
    },



    nuova_manche : async function (id){
        Game.findOneAndDelete({name:id}).then(()=>{
            var game = new Game({ name: id});
            var promises=[];
            for(var i=0;i<3;i++){
                promises.push(carte.findOne({ card: sigle[Math.floor(Math.random()*53)] }, (err, doc) => {
                    game.g1.push(doc);
                    //game.save();
                }));
            };
            for(var i=0;i<3;i++){
                promises.push(carte.findOne({ card: sigle[Math.floor(Math.random()*53)] }, (err, doc) => {
                    game.g2.push(doc);
                    //game.save();
                }));
            }
            for(var i=0;i<5;i++){
                promises.push(carte.findOne({ card: sigle[Math.floor(Math.random()*53)] }, (err, doc) => {
                    game.mazzo.push(doc);
                    //game.save();
                }));
            }
            Promise.all(promises).then(()=>{game.save()});
        })
    },
    
    carte_g1: async(id)=>{
        try{
            var risultato_query= await Game.findOne({name:id}).exec();
            return risultato_query.g1;
        }catch(err){
            console.log(err);
        }
    },

    carte_g2: async(id)=>{
        var risultato_query= await Game.findOne({name:id}).exec();
        return risultato_query.g2;
    },

    carte_mazzo: async(id)=>{
        try{
            var risultato_query= await Game.findOne({name:id}).exec();
            return risultato_query.mazzo;
        }catch(err){
            console.log(err);
        }
    }
  
}








//     carte : {
//         "AC":{value:100,img:'<img src=86px-1C.svg.png>',uscita:false},
//         "2C":{value:2,img:'<img src=86px-2C.svg.png>',uscita:false},
//         "3C":{value:3,img:'<img src=86px-3C.svg.png>',uscita:false},
//         "4C":{value:4,img:'<img src=86px-4C.svg.png>',uscita:false},
//         "5C":{value:5,img:'<img src=86px-5C.svg.png>',uscita:false},
//         "6C":{value:6,img:'<img src=86px-6C.svg.png>',uscita:false},
//         "7C":{value:7,img:'<img src=86px-7C.svg.png>',uscita:false},
//         "8C":{value:8,img:'<img src=86px-8C.svg.png>',uscita:false},
//         "9C":{value:9,img:'<img src=86px-9C.svg.png>',uscita:false},
//         "10C":{value:10,img:'<img src=86px-10C.svg.png>',uscita:false},
//         "JC":{value:11,img:'<img src=86px-JC.svg.png>',uscita:false},
//         "KC":{value:13,img:'<img src=86px-KC.svg.png>',uscita:false},
//         "QC":{value:12,img:'<img src=86px-QC.svg.png>',uscita:false},
//         "AD":{value:100,img:'<img src=86px-1D.svg.png>',uscita:false},
//         "2D":{value:2,img:'<img src=86px-2D.svg.png>',uscita:false},
//         "3D":{value:3,img:'<img src=86px-3D.svg.png>',uscita:false},
//         "4D":{value:4,img:'<img src=86px-4D.svg.png>',uscita:false},
//         "5D":{value:5,img:'<img src=86px-5D.svg.png>',uscita:false},
//         "6D":{value:6,img:'<img src=86px-6D.svg.png>',uscita:false},
//         "7D":{value:7,img:'<img src=86px-7D.svg.png>',uscita:false},
//         "8D":{value:8,img:'<img src=86px-8D.svg.png>',uscita:false},
//         "9D":{value:9,img:'<img src=86px-9D.svg.png>',uscita:false},
//         "10D":{value:10,img:'<img src=86px-10D.svg.png>',uscita:false},
//         "JD":{value:11,img:'<img src=86px-JD.svg.png>',uscita:false},
//         "KD":{value:13,img:'<img src=86px-KD.svg.png>',uscita:false},
//         "QD":{value:12,img:'<img src=86px-QD.svg.png>',uscita:false},
//         "AH":{value:100,img:'<img src=86px-1H.svg.png>',uscita:false},
//         "2H":{value:2,img:'<img src=86px-2H.svg.png>',uscita:false},
//         "3H":{value:3,img:'<img src=86px-3H.svg.png>',uscita:false},
//         "4H":{value:4,img:'<img src=86px-4H.svg.png>',uscita:false},
//         "5H":{value:5,img:'<img src=86px-5H.svg.png>',uscita:false},
//         "6H":{value:6,img:'<img src=86px-6H.svg.png>',uscita:false},
//         "7H":{value:7,img:'<img src=86px-7H.svg.png>',uscita:false},
//         "8H":{value:8,img:'<img src=86px-8H.svg.png>',uscita:false},
//         "9H":{value:9,img:'<img src=86px-9H.svg.png>',uscita:false},
//         "10H":{value:10,img:'<img src=86px-10H.svg.png>',uscita:false},
//         "JH":{value:11,img:'<img src=86px-JH.svg.png>',uscita:false},
//         "KH":{value:13,img:'<img src=86px-KH.svg.png>',uscita:false},
//         "QH":{value:12,img:'<img src=86px-QH.svg.png>',uscita:false},
//         "AS":{value:1,img:'<img src=86px-1S.svg.png>',uscita:false},
//         "2S":{value:2,img:'<img src=86px-2S.svg.png>',uscita:false},
//         "3S":{value:3,img:'<img src=86px-3S.svg.png>',uscita:false},
//         "4S":{value:4,img:'<img src=86px-4S.svg.png>',uscita:false},
//         "5S":{value:5,img:'<img src=86px-5S.svg.png>',uscita:false},
//         "6S":{value:6,img:'<img src=86px-6S.svg.png>',uscita:false},
//         "7S":{value:7,img:'<img src=86px-7S.svg.png>',uscita:false},
//         "8S":{value:8,img:'<img src=86px-8S.svg.png>',uscita:false},
//         "9S":{value:9,img:'<img src=86px-9S.svg.png>',uscita:false},
//         "10S":{value:10,img:'<img src=86px-10S.svg.png>',uscita:false},
//         "JS":{value:11,img:'<img src=86px-JS.svg.png>',uscita:false},
//         "KS":{value:13,img:'<img src=86px-KS.svg.png>',uscita:false},
//         "QS":{value:12,img:'<img src=86px-QS.svg.png>',uscita:false},
//     },

