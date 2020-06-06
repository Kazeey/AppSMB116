const express = require('express');
const app = express();
const fetch = require("node-fetch");
const cors = require('cors');

const key = "8f0736cf5aa618c9903b9f96973b3b59";
const allSports = "https://api.the-odds-api.com/v3/sports/?all=true&apiKey="+key;
const urlUpcoming = ""+key;

let admin = require("firebase-admin");

let serviceAccount = require("../../tvsprono-dab6b-firebase-adminsdk-8legt-1a75d8f5c7.json");

const db = admin.firestore();
app.use(cors())

let methods = {
    // ------------- Liste un certain pari en fonction du "number", de la BDD et les envoies vers le front -------------//
    getBetById : function(req, res){
        let Bets = db.collection('Bet').doc(req.params.betId);
        let getDoc = Bets.get();
        
        getDoc
        .then(doc => {
          if (doc.exists) {
              return res.status(200).json(doc.data());
          } else {
              return res.status(400).json({"message":"No bet founded."});
          }
        }).catch((error) => {
            return res.status(400).json({"message":"Unable to connect to Firestore."});
        });
    },


    // ------------- Permet d'ajouter une description et un etat à un pari, en fonction des paramètres -------------//
    putBetById : function(req, res){
        let Bets = db.collection('App').doc(req.params.betId);
        let updateSingle = { // Mise à jour des données en base
          description : req.params.description,
          etatBet : req.params.etat
        };
      
        Bets.update(updateSingle);
    },

}

exports.data = methods;