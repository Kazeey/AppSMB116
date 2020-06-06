const express = require('express');
const app = express();
const fetch = require("node-fetch");
const cors = require('cors');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');

const key = "8f0736cf5aa618c9903b9f96973b3b59";
const allSports = "https://api.the-odds-api.com/v3/sports/?all=true&apiKey="+key;
const urlUpcoming = ""+key;

let admin = require("firebase-admin");

let serviceAccount = require("../../tvsprono-dab6b-firebase-adminsdk-8legt-1a75d8f5c7.json");

const db = admin.firestore();
app.use(cors())


let methods = {
    // ------------- Permet d'insérer les infos de login verif -------------//
    authentification : function(req, res){
      console.log("username : ", req.body.username," password : ",  req.body.password, " date : ", req.body.date)
      let bddUser = db.collection('User').where("username", "==", req.body.username);
      bddUser.get()
      .then(docs => {
        let documentsUser = {};
        docs.forEach(doc => { 
          documentsUser = doc.data();
        });

        if(documentsUser.password === req.body.password){
         //res.send(documentsUser.userId)
        }else {
          let bddloginVerif = db.collection('loginVerif').where('mail', '==', documentsUser.mail);
          bddloginVerif.get()
          .then(docs => {
            let documentsLogin = {};
            docs.forEach(doc => { 
              documentsLogin = doc.data();
            });

            let bddDateloginVerif = db.collection('loginVerif').where('date', '==', req.body.date);
            bddDateloginVerif.get()
            .then(docs => {
              let documentsDate = {};
              docs.forEach(doc => { 
                documentsDate = doc.data();
              });
            });
          });
        }

      });
    },

    forgotMail : function(req, res){  
        var transporter = nodemailer.createTransport({
        service: 'Yahoo', // Service utilisé pour l'envoi de l'email
        auth: {
          user: 'tvsprono@yahoo.com', // Email que j'ai créé pour avoir une boite sur Yahoo
          pass: 'ewogyqmackvlqnwa' // Mod de passe généré par Yahoo pour l'application
        }
      });
      
      var mailOptions = {
        from: 'tvsprono@yahoo.com', // Expéditeur
        to: 'quentinpeze@hotmail.fr', // Destinataire
        subject: 'Sending Email using Node.js', // Objet du mail
        text: 'Votre mot de passe temporaire est  : '  // Contenu du mail
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
        
    },

    resetPassword : function(req, res){
        
    }, 
}

exports.data = methods;

/*
        // On récupère les données de la BDD
        let bddDocument = db.collection('loginVerif');
        bddDocument.get()
        .then(docs => {
            let documents = [];
            let nbDocuments = 0;

            docs.forEach(doc => { // Pour chaque documents on le rajoute dans le tableau et incrémente l'ID du nombre de paris
                nbDocuments++;
                documents.push(doc.data())
            });

            let data = { // Formatage des données pour la table Users
                idVerif: req.params.idVerif,
                mail: req.params.mail,
                date: req.params.date,
                nbEssai: req.params.nbEssai,
            };
            nbDocuments++; // Incrémentation du nombre de paris présent en base pour l'ID

            let Bets = db.collection('loginVerif').doc(`${nbDocuments}`).set(data); // Ajout des données en base
        });
*/