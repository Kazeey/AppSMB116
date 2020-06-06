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
    getAllStats : function(req, res){
        let Bets = db.collection('Stats');
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

// ---------------- Récupère les stats d'un user et l'envoie au front ------------------//
    getOneStatByID : function(req, res){
        let Bets = db.collection('Stats').doc(req.params.statsId);
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

    addStats : function(req, res){      
        let perSport = [{
            nameSport : req.params.nameSport,
            nbWin : req.params.nbWin,
            odds : req.params.odds,
            moneyEarn : req.params.moneyEarn,
            percentageWin : req.params.percentageWin
        }]

        let data = { // Formatage des données pour la table Users
            id: req.params.id,
            idUser: req.params.idUser,
            oddsAverageAll: req.params.oddsAverageAll,
            nbWinAll: req.params.nbWinAll,
            moneyEarnAll : req.params.moneyEarnAll,
            perSport: perSport,
        };

        let nomInsert = req.params.id + '_' + req.params.idUser;
        let Bets = db.collection('Stats').doc(`${nomInsert}`).set(data); // Ajout des données en base
    }
}

exports.data = methods;