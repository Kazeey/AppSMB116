const express = require('express');
const app = express();
const fetch = require("node-fetch");
const cors = require('cors');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const { uuid } = require('uuidv4');

const key = "8f0736cf5aa618c9903b9f96973b3b59";
const allSports = "https://api.the-odds-api.com/v3/sports/?all=true&apiKey="+key;
const urlUpcoming = ""+key;

let admin = require("firebase-admin");

let FieldValue = admin.firestore.FieldValue;
let serviceAccount = require("../../tvsprono-dab6b-firebase-adminsdk-8legt-1a75d8f5c7.json");

const db = admin.firestore();
app.use(cors())

let date = new Date().getDate(); //Current Date
let month = new Date().getMonth() + 1; //Current Month
let year = new Date().getFullYear(); //Current Year
if(date < 10){
    date = "0"+date;
}
if(month < 10){
    month = "0"+month;
}
let currentDate = date + "-" + month + "-" + year

let methods = {
    //TODO AJOUTER CATCH ERROR POUR GERER LES ERRORS LORS DE LA COMMUNICATION AVEC LA BDD
    //TODO Checker l'utilisation de firebase auth

    // ------------- Permet d'insérer les infos de login verif -------------//
    authentification : async function(req, res){
      let bddUser = db.collection('User').where("username", "==", req.body.username);
      await bddUser.get()
      .then(async docs =>  {
        //Récupération des informations du users
        let documentsUser = null;
        docs.forEach(doc => { 
          if(doc.data())
          {
            documentsUser = doc.data();
          }
          else
          {
            documentsUser = null;
          }
        });

        //Si il n'existe pas ou si il n'est pas activé, Renvoie au front que c'est le cas
        if(documentsUser === null || documentsUser.state == false)
        {
          res.send({response : "blocked"});
        }
        else
        { 
          //Cherche si il a déja essayer de se connecter sur la plateforme
          let bddVerif = db.collection('loginVerif').where("mail", "==", documentsUser.mail);
          const respVerif = await bddVerif.get()
          .then(async verifs => {
            let loginVerifInfo = [];
            verifs.forEach(verif => { 
              if(verif.data().date === currentDate){
                loginVerifInfo.push(verif.data());
              }
            });
            
            // S'il y a plus de 5 essai retourne "blocked" et bloque le compte
            if(loginVerifInfo.length > 0 && loginVerifInfo[0].nbVerif > 4){              
              let changeStateToFalse = { 
                state : false,
              };
              let changeStateAccountBdd = db.collection('User').where("mail", "==", documentsUser.mail);
              await changeStateAccountBdd.get()
              .then(query => {
                query.forEach(function(doc) {
                  doc.ref.update(changeStateToFalse);
                });
              });
              res.send({response : "blocked"});  
            }
            else // Si moins de 5 essais
            {
              if(documentsUser.password === req.body.password) // Compare les mdp et supprime les essais de connexion si c'est bon
              {
                let deleteBddVerif = db.collection('loginVerif').where("mail", "==", documentsUser.mail);
                await deleteBddVerif.get()
                .then(query => {
                  query.forEach(function(doc) {
                    doc.ref.delete();
                  });
                });
                res.send({response : documentsUser.userId})
              }
              else // sinon incrémente le nombre de vérif
              {
                //Si il n'a jamais essayé de se connecter avant, crée dans la bdd son essai
                if(loginVerifInfo.length == 0)
                {
                  db.collection('loginVerif').doc(`${documentsUser.userId}`).set({
                    mail : documentsUser.mail,
                    nbVerif : 1,
                    verifId : documentsUser.userId,
                    date : currentDate,
                  })
                  res.send({response : 4 });
                }
                else //Sinon incrémente son nombre d'essai
                {
                  let updateLoginVerif = { 
                    nbVerif : loginVerifInfo[0].nbVerif+1,
                  };
                  let deleteBddVerif = db.collection('loginVerif').where("verifId", "==", loginVerifInfo[0].verifId);
                  const deleteVerif = await deleteBddVerif.get()
                  .then(query => {
                    query.forEach(function(doc) {
                      doc.ref.update(updateLoginVerif);
                    });
                  });
                  const nbEssai = 5 - (loginVerifInfo[0].nbVerif + 1)
                  res.send({response : nbEssai });
                }
              }
            }
          })
        } 
      });
      
    },

    createAccount : async function(req, res){  
      let tempPassword = Math.floor(Math.random() * 1000000) + 100000;

      let newAccount = {
        cguCgv : true,
        name : req.body.name,
        firstname : req.body.firstname,
        mail : req.body.mail,
        username : req.body.username,
        password : ""+tempPassword+"",
        role : "user",
        state : true,
        userId : uuid(),
      }
      
      let bddUser = db.collection('User');
      await bddUser.get()
      .then(async docs =>  {
        let createBddUser = db.collection('User').doc(`${newAccount.userId}`).set(newAccount);
      });
      res.send({response : "Compte Créé"});
    },

    resetPassword : async function(req, res){
      var transporter = nodemailer.createTransport({
        service: 'Yahoo', // Service utilisé pour l'envoi de l'email
        auth: {
          user: 'tvsprono@yahoo.com', // Email que j'ai créé pour avoir une boite sur Yahoo
          pass: 'ewogyqmackvlqnwa' // Mod de passe généré par Yahoo pour l'application
        }
      });
      
      let newPassword = Math.floor(Math.random() * 1000000) + 100000;

      console.log(req.body.username);
      let bddUser = db.collection('User').where("username", "==", req.body.username);
      await bddUser.get()
      .then(async docs =>  {
        //Récupération des informations du users
        let documentsUser = null;
        docs.forEach(doc => { 
          if(doc.data())
          {
            documentsUser = doc.data();
          }
          else
          {
            documentsUser = null;
          }
        });

        var mailOptions = {
          from: 'tvsprono@yahoo.com', // Expéditeur
          to:  documentsUser.mail, // Destinataire
          subject: '[TvsProno] - Nouveau mot de passe', // Objet du mail
          html: "<p>Veuillez trouver votre nouveau mot de passe : <b>"+ newPassword +"</b>, si vous n'êtes pas à l'origine de cette action, veuillez faire attention a vos informations confidentielles.</p>"  // Contenu du mail
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        let updatePassword = { 
          password : ""+newPassword+"",
        };

        let updateBddPassword = db.collection('User').where("username", "==", req.body.username);
        const updateBdd = await updateBddPassword.get()
        .then(query => {
          query.forEach(function(doc) {
            doc.ref.update(updatePassword);
          });
        });
      });
      res.send({response : "Ok"});
    }, 
}

exports.data = methods;

