const express = require('express');
const app = express();
const fetch = require("node-fetch");
const cors = require('cors');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const moment = require('moment');

const key = "8f0736cf5aa618c9903b9f96973b3b59"; // Clé de l'api
const allSports = "https://api.the-odds-api.com/v3/sports/?all=true&apiKey="+key; // Récupération des sports

let admin = require("firebase-admin");

let serviceAccount = require("./tvsprono-dab6b-firebase-adminsdk-8legt-1a75d8f5c7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tvsprono-dab6b.firebaseio.com"
});

const db = admin.firestore();
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//Import des fonctions
const getAllBetsImport = require('./functions/bets/index.js');
const loginImport = require('./functions/login/index.js');
const betByIdImport = require('./functions/betById/index.js');
const statsImport = require('./functions/stats/index.js');
const sportsImport = require('./functions/sports/index.js');
const profileImport = require('./functions/profile/index.js');

//---------------------Déclaration des APIs----------------------

//Login
app.get('/addStats/:id/:idUser/:oddsAverageAll/:nbWinAll/:moneyEarnAll/:nameSport/:nbWin/:odds/:moneyEarn/:percentageWin', loginImport.data.authentification);
app.post('/api/login/authentification', loginImport.data.authentification); // Authentification de l'utilisateur
app.post('/api/login/resetPassword', loginImport.data.resetPassword); // Reset du mot de passe
app.post('/api/login/createAccount', loginImport.data.createAccount); // Création du compte

//Bets
app.get('/api/getBets', getAllBetsImport.data.getAllBets); // Récupération de tous les paris
app.post('/api/dailyBets', getAllBetsImport.data.getDailyBets); // Récupération de tous les paris de la journée
app.post('/api/createBet', getAllBetsImport.data.addBet); // Ajout d'un nouveau pari

//BetById
app.get('/api/betById/:betId', betByIdImport.data.getBetById); // Récupération d'un pari grâce à un ID
// app.post('/api/betById/:betId', betByIdImport.data.postBetbyId); a FAIRE
app.post('/api/betById/:betId',  betByIdImport.data.putBetById); // Mise à jour d'un pari grâce à un ID
// app.delete('/api/betById/:betId', betByIdImport.data.deleteBetbyId); a FAIRE

//stats
app.get('/api/stats', statsImport.data.getOneStatByID); // Récupération des statistiques d'un utilisateur grâce à un ID
app.post('/api/stats', statsImport.data.addStats); // Ajout de statistiques
app.get('/api/getStats', statsImport.data.getAllStats); // Récupération de toutes les statistiques

//statById
// app.get('/api/stat/:userId', getStatById(req, res))

//sports
app.get('/getSports', sportsImport.data.getSports); // Récupération de la liste des sports de l'api

//profile
app.get('/api/getAllProfileUsers/', profileImport.data.getAllUsers); // Récupération de tous les profils utilisateur
app.get('/api/getOneProfileUsers/:userId', profileImport.data.getOneUserByID); // Récupération d'un profil utilisateur avec un ID
app.get('/api/profile/getRole/:userId', profileImport.data.getRole); // Récupération du role d'un utilisateur grâce à un ID

// TODO : check le role, sécurité role
// ------------- TO DO : Les deux fonctions qui suivent ne sont pas dans des fontions comme les précédentes car nous avons décidé de les appeler manuellement, cependant il faudrait le faire ----------------//
// ------------- Insère tous les sports de l'api dans la BDD -------------//
app.get('/addSports', function (req, res) {
    let nbSport;
    
    fetch(allSports)  // Parcours tout ce qui est envoyé depuis l'api
    .then(res => res.json()) // Le transforme en Json
    .then(dataFromBDD => {
      for(nbSport = 0; nbSport < dataFromBDD.data.length; nbSport++) { // Pour chaque sport l'insère dans la BDD avec les caractèristiques ci-dessous
        let data = {
          sportKey : dataFromBDD.data[nbSport].key,
          group : dataFromBDD.data[nbSport].group,
          details : dataFromBDD.data[nbSport].details,
          title : dataFromBDD.data[nbSport].title,
          idSport : nbSport
        }
        let Sports = db.collection('Sport').doc(`${nbSport}`).set(data); // Insertion dans la BDD
      }
    })
});

// -------------- Ajouter les paris de l'api a la BDD -------------------//
app.get('/addBets', async function(req, res) {
  const data = [];
  
  // let bddDocument = db.collection('Sport');
  // bddDocument.get() // Récupère tous les sports
  // .then(docs => {
  //   docs.forEach(doc => {   // Pour chaque sport, l'insère dans le tableau 
  //     const data = [];
  //     let docData = doc.data();
      var url = 'https://api.the-odds-api.com/v3/odds/?sport=upcoming&region=uk&mkt=h2h&apiKey='+key;
      let settings = { method: "Get" };

      // On parcours les données renvoyées par l'api
      fetch(url, settings)
      .then(res => res.json())
      .then(json => {
        // On récupère les données de la BDD
        let bddDocument = db.collection('Bet');
        bddDocument.get()
        .then(docs => {
          let documents = [];
          let nbDocuments = 0;

          docs.forEach(doc => { // Pour chaque documents on le rajoute dans le tableau et incrémente l'ID du nombre de paris
            nbDocuments++;
            documents.push(doc.data())
          });

          for(const jsonData of json.data) { // Pour chaque "data" du json retourné par l'api
              let arraySites = [];
              let findInDocument = false; // initialisation de la variable de comparaison a false

              if(jsonData.sites.length === 0 ) { // Si jamais il n'y a pas de bookmaker, passage des côtes à 0.00 et push dans un tableau
                const siteTmp = {
                  valueOne : 0.00,
                  mean : 0.00,
                  valueTwo : 0.00,
                  siteKey : "No bookmaker",
                }
                arraySites.push(siteTmp);
              } else {  // Sinon récupération des cotes pour chaque site de paris et push dans un tableau
                for(const site of jsonData.sites) {
                  computedMean = ((site.odds.h2h[0] + site.odds.h2h[1]) / 2); // Calcul de la moyenne 
                  const siteTmp = {
                    valueOne : site.odds.h2h[0],
                    mean : computedMean,
                    valueTwo : site.odds.h2h[1],
                    siteKey :  site.site_key,
                  }
                  arraySites.push(siteTmp);
                }
              }

            if(documents.length > 0 ) { // S'il y a des enregistrements dans la base 
              findInDocument = documents.find(docTmp => { // Alors on compare les données de l'api et de la bdd pour voir s'il y a des doublons
                return(docTmp.teamOne == jsonData.teams[0] && docTmp.teamTwo == jsonData.teams[1] && docTmp.date == jsonData.commence_time); //si non findInDocument vaut "undefined"
              }); 
            }

            if(!findInDocument) {
              let data = {  // Formatage des données avant insertion dans la base
                date: moment.unix(jsonData.commence_time).format("DD-MM-YYYY"),
                homeTeam: jsonData.home_team,
                teamOne:jsonData.teams[0],
                teamTwo: jsonData.teams[1],
                site : arraySites,
                sport: jsonData.sport_nice,
                betId: nbDocuments,
              };

              nbDocuments++; // Incrémentation du nombre de paris présent en base pour l'ID
              let Bets = db.collection('Bet').doc(`${nbDocuments}`).set(data); // Insertion dans la base
              console.log("Insertion effectuée");
            } else {
              console.log("L'enregistrement existe déjà");
            }
          } 
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    });
//   });
// });

// ------------- Au lancement du serveur, insère les informations de l'api dans la base de données -------------//
app.listen(3000, function() {}); // Ecoute sur le port 3000
