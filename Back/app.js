const express = require('express');
const app = express();
const fetch = require("node-fetch");
const cors = require('cors');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const moment = require('moment');
const { uuid } = require('uuidv4');

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
const apiImport = require('./functions/api/index.js');
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
app.post('/api/login/updateAccount/:userId', loginImport.data.updateAccount); // Création du compte

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
app.get('/api/addSports', apiImport.data.addSports);
app.get('/api/addBets', apiImport.data.addBets);

//profile
app.get('/api/getAllProfiles/', profileImport.data.getAllUsers); // Récupération de tous les profils utilisateur
app.get('/api/getOneProfileUsers/:userId', profileImport.data.getOneUserByID); // Récupération d'un profil utilisateur avec un ID
app.get('/api/profile/getRole/:userId', profileImport.data.getRole); // Récupération du role d'un utilisateur grâce à un ID

// TODO : check le role, sécurité role

// ------------- Au lancement du serveur, insère les informations de l'api dans la base de données -------------//
app.listen(3000, function() {}); // Ecoute sur le port 3000
