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
    
    getAllBets : async function (req,res) {
        const data = [];
    
        let bddDocument = await db.collection('Bet');
        bddDocument.get() // Récupère tous les sports
        .then(docs => {
          docs.forEach(doc => {   // Pour chaque sport, l'insère dans le tableau 
            data.push(doc.data())
          });
          res.send(data); // Envoie tout au front
        });
    },

    getDailyBets : async function(req, res) {
      const data = [];
      let bddDocument = await db.collection('Bet').where('startTime', '==', req.body.date);
      bddDocument.get() // Récupère tous les sports
      .then(docs => {
        docs.forEach(doc => {   // Pour chaque sport, l'insère dans le tableau 
          data.push(doc.data())
        });
        res.send({response : data}); // Envoie tout au front
      });
    }
}

exports.data = methods;