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
    getAllUsers : function(req, res){
        const data = [];
    
        let bddDocument = db.collection('User');
        bddDocument.get() // Récupère tous les utilisateurs
        .then(docs => {
          docs.forEach(doc => {   // Pour chaque utilisateurs, l'insère dans le tableau 
            data.push(doc.data())
          });
          res.send(data); // Envoie tout au front
        });
    },

// ---------------- Récupère les stats d'un user et l'envoie au front ------------------//
    getOneUserByID : function(req, res){
        let Bets = db.collection('User').doc(req.params.userId);
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

    getRole : function(req, res){
        const data = [];
    
        let bddDocument = db.collection('User').where('userId', '==', req.params.userId);
        bddDocument.get() // Récupère le role de l'utilisateur
        .then(docs => {
          docs.forEach(doc => {   // Pour chaque utilisateurs, l'insère dans le tableau 
            data.push(doc.data())
          });
          
          res.send({response : data[0].role}); // Envoie tout au front
        });
    }
}

exports.data = methods;
