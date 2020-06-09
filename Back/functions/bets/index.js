const express = require('express');
const app = express();
const fetch = require("node-fetch");
const cors = require('cors');
const { uuid } = require('uuidv4');

let admin = require("firebase-admin"); // Fichier de config de Firebase

let serviceAccount = require("../../tvsprono-dab6b-firebase-adminsdk-8legt-1a75d8f5c7.json");

const db = admin.firestore();
app.use(cors())

let methods = {
    
    getAllBets : async function (req,res) { // Récupère tous les paris
        const data = [];
    
        let bddDocument = await db.collection('Bet');
        bddDocument.get() // Récupère tous les sports
        .then(docs => {
          docs.forEach(doc => {   // Pour chaque sport, l'insère dans le tableau data
            data.push(doc.data())
          });
          res.send({response : data}); // Envoie la réponse au front
        });
    },

    getDailyBets : async function(req, res) { // Récupère tous les paris de la journée
      const data = [];
      let bddDocument = await db.collection('Bet').where('date', '==', req.body.date); // Cherche tous les paris ou la date correspond à la valeur récupérée depuis la méthode POST
      bddDocument.get() // Récupère tous les sports
      .then(docs => {
        docs.forEach(doc => {   // Pour chaque sport, l'insère dans le tableau data
          data.push(doc.data())
        });
        res.send({response : data}); // Envoie la réponse au front
      });
    },

    addBet : async function(req, res) {
      let random = uuid();
      let data = { // Formatage des données pour la table Users
        teamOne: req.body.teamOne,
        teamTwo: req.body.teamTwo,
        sport: req.body.sport,
        date: req.body.date,
        homeTeam: req.body.homeTeam,
        site : [{
          mean : req.body.mean,
          valueOne : req.body.valueOne,
          valueTwo : req.body.valueTwo,
          siteKey : "TvsProno"
        }],
        betId : random,
      };
      
      let Bets = db.collection('Bet').doc(`${random}`).set(data); // Ajout des données en base
      res.send({response : "Pari ajouté !"}); // Envoie tout au front
    }
}

exports.data = methods;