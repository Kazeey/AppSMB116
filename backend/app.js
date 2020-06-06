const express = require('express');
const app = express();
const fetch = require("node-fetch");
const cors = require('cors');
var admin = require("firebase-admin");

var serviceAccount = require("./tvsprono-dab6b-firebase-adminsdk-8legt-1a75d8f5c7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tvsprono-dab6b.firebaseio.com"
});
const db = admin.firestore();
app.use(cors())

//Import des fonctions
import {authentification, forgotMail, resetPassword} from './api/login/index'
import getAllBets from './api/bets/index'
import {getBetById, postBetById, putBetById } from './api/betById/index'

//---------------------Déclaration des APIs----------------------

//Login
app.post('/api/login/authentification', authentification(req, res));
app.post('/api/login/forgotMail', forgotMail(req, res));
app.get('/api/login/resetPassword', resetPassword(req, res));

//Bets
app.get('/api/getBets', getAllBets(req,res));

//BetById
app.get('/api/betById/:betId', getBetById(req,res));
app.post('/api/betById/:betId', postBetById(req,res));
app.put('/api/betById/:betId',  putBetById(req,res));
app.delete('/api/betById/:betId', deleteBetById(req,res));

//stats
app.get('/api/stats', getStats(req, res));

//statById
app.get('/api/stat/:userId', getStatById(req, res))
// ------------- Récupère toutes les données de l'api sans rien y faire de particulier -------------//
app.get('/', function (req, res) {
    var url = 'https://api.the-odds-api.com/v3/odds/?sport=mma_mixed_martial_arts&region=us&mkt=h2h&apiKey=3288210595840480a739c737d7b1e6fa';
     
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.send(JSON.stringify(data));
        //console.log(data.data[0]["sport_key"]);
    })
    .catch(err => {
        res.send(err);
    });
});

// ------------- Permet de récupérer un certain pari en fonction du "number" -------------//
app.get('/betList/:number', function (req, res) {
  let Bets = db.collection('App').doc(req.params.number);
  let getDoc = Bets.get();
  
  getDoc
  .then((doc) => {
    if (doc.exists) {
        return res.status(200).json(doc.data());
    } else {
        return res.status(400).json({"message":"No bet founded."});
    }
  }).catch((error) => {
      return res.status(400).json({"message":"Unable to connect to Firestore."});
  });
});

// ------------- Permet d'ajouter une description et un etat a un pari, en fonction des paramètres -------------//
app.get('/updateBet/:number/:description/:etat', function (req, res) {
  let Bets = db.collection('App').doc(req.params.number);
  let updateSingle = Bets.update({
      description : req.params.description,
      etatBet : req.params.etat
    });
});

// ------------- Permet d'insérer les données d'un utilisateur, en fonction des paramètres -------------//
app.get('/addUser/:number/:nom/:prenom/:mail/:mdp/:role/:cgucgv/:activation', function (req, res) {
  let data = {
    nom: req.params.nom,
    prenom: req.params.prenom,
    mail: req.params.mail,
    MDP: req.params.mdp,
    role : req.params.role,
    cguCgv: req.params.cgucgv,
    activation: req.params.activation,
    idUser: req.params.number
  };

  let Bets = db.collection('User').doc(`${req.params.number}`).set(data); 
});

// ------------- Au lancement du serveur, insère les informations de l'api dans la base de données -------------//
app.listen(3000, function() {
    console.log('Le serveur écoute sur le port : 3000');
    var url = 'https://api.the-odds-api.com/v3/odds/?sport=upcoming&region=us&mkt=h2h&apiKey=3288210595840480a739c737d7b1e6fa';

    let settings = { method: "Get" };

    fetch(url, settings)
    .then(res => res.json())
    .then(json => {
      //Call bdd

      let bddDocument = db.collection('App');
      bddDocument.get().then(docs => {
        let documents = [];
        let nbDocuments = 0;
        docs.forEach(doc => {
          nbDocuments++;
          documents.push(doc.data())
        });
        for(const jsonData of json.data)
        {
            let arraySites = [];
            let heureDepart;

            heureDepart = jsonData.commence_time;

            // Si jamais il n'y a pas de bookmaker, passage des côtes à 0.00
            if(jsonData.sites.length < 1 )
            {
              const siteTmp = {
                valueOne : 0.00,
                valueTwo : 0.00,
                siteKey : "No bookmaker",
              }
              arraySites.push(siteTmp);
            }
            else
            {
              for(const site of jsonData.sites)
              {
                const siteTmp = {
                  valueOne : site.odds.h2h[0],
                  valueTwo : site.odds.h2h[1],
                  siteKey :  site.site_key,
                }
                arraySites.push(siteTmp);
              }
            }
          const findInDocument = documents.find(docTmp => true 
            // console.log(docTmp.teamOne,'==', jsonData.teams[0]) 
            // console.log(docTmp.teamTwo, '==', jsonData.teams[1]) 
            // console.log(docTmp.startTime, '==', jsonData.commence_time)
            // return(docTmp.teamOne == jsonData.teams[0] && docTmp.teamTwo == jsonData.teams[1] && docTmp.startTime == jsonData.commence_time);
          ); 
          console.log(findInDocument);
          if(findInDocument === false)
          {
            let data = {
              startTime: jsonData.commence_time,
              homeTeam: jsonData.home_team,
              teamOne:jsonData.teams[0],
              teamTwo: jsonData.teams[1],
              site : arraySites,
              sport: jsonData.sport_nice,
              idBet: nbDocuments,
            };

            let Bets = db.collection('App').doc(`${nbDocuments}`).set(data); 
            nbDocuments++;

            console.log("insertion effectuée");
          }
          else
          {
            console.log("ça existe déjà");
          }
        } 
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });


    

});



// Comparaison des paris entre l'api et la bdd pour ne pas les écraser



// ------------- Debug d'ajout au cas ou -------------//
// app.get('/add/:number', function (req, res) {

//   let data = {
//     heureDepart: 35,
//     homeTeam: "Chicago",
//     joueurDeux: "Chicago",
//     joueurUn: "Quebec",
//     cote: 0.15,
//     sport: true,
//     idPari: 2,
//     site : "winamax"
//   };

//   let Bets = db.collection('App').doc(req.params.number).set(data);  
// });
