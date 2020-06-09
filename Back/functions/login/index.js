const express = require('express');
const app = express();
const fetch = require("node-fetch");
const cors = require('cors');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const { uuid } = require('uuidv4');

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
let currentDate = date + "-" + month + "-" + year // Création de la date courante

let transporter = nodemailer.createTransport({
  service: 'Yahoo', // Service utilisé pour l'envoi de l'email
  auth: {
    user: 'tvsprono@yahoo.com', // Email que j'ai créé pour avoir une boite sur Yahoo
    pass: 'ewogyqmackvlqnwa' // Mod de passe généré par Yahoo pour l'application
  }
});

let methods = {
    //TODO AJOUTER CATCH ERROR POUR GERER LES ERRORS LORS DE LA COMMUNICATION AVEC LA BDD
    //TODO Checker l'utilisation de firebase auth

    // ------------- Permet d'insérer les infos de login verif -------------//
    authentification : async function(req, res){
      let bddUser = db.collection('User').where("username", "==", req.body.username); // Cherche tous les users ou le login correspond à la valeur récupérée depuis la méthode POST
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
          //Cherche si l'utilisateur a déja essayer de se connecter sur la plateforme
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
                state : false, // bloque le comtpe en changeant l'état
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

    createAccount : async function(req, res){  // Création d'un comtpe
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
        userId : uuid(), // Génération d'un ID aléatoire
      }

      var mailOptions = {
        from: 'tvsprono@yahoo.com', // Expéditeur
        to:  req.body.mail, // Destinataire
        subject: '[TvsProno] - Nouveau mot de passe', // Objet du mail
        html: "<p>Bonjour, suite à la création de votre compte veuillez trouver votre mot de passe temporaire : <b>"+ tempPassword +"</b>. Une fois votre première connexion sur l'application, vous pourrez le modifier dans la page 'profil'.</p>"  // Contenu du mail
      };

      let checkBddUser = db.collection('User');
      await checkBddUser.get()
      .then(async docs =>  {
        //Récupération des informations du users
        let documentsUser = [];
        docs.forEach(doc => { 
          if(doc.data())
          {
            documentsUser.push(doc.data())
          }
          else
          {
            documentsUser = null;
          }
        });

        if(documentsUser.length < 1){
          let bddUser = db.collection('User');
          bddUser.get()
          .then(async docs =>  {
            let createBddUser = db.collection('User').doc(`${newAccount.userId}`).set(newAccount);
          });   

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log("Erreur lors de l'envoi ", error);
            } else {
              console.log('Email envoyé : ' + info.response);
            }
          });

          res.send({response : "Un mail vous à été envoyé à l'adresse : " + req.body.mail});
        } else {
          documentsUser.forEach(docUser => {
            if(docUser.mail == req.body.mail) {
              res.send({response : "L'adresse mail est déjà associée à un compte !"});
            } else {           
              let bddUser = db.collection('User');
              bddUser.get()
              .then(async docs =>  {
                let createBddUser = db.collection('User').doc(`${newAccount.userId}`).set(newAccount);
              });   

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log("Erreur lors de l'envoi ", error);
                } else {
                  console.log('Email envoyé : ' + info.response);
                }
              });
              res.send({response : "Un mail vous à été envoyé à l'adresse : " + req.body.mail });
            }
          });
        } 
      })
    },

    resetPassword : async function(req, res){

      let newPassword = Math.floor(Math.random() * 1000000) + 100000;

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

        let updatePassword = { 
          password : ""+newPassword+"",
        };

        if(documentsUser)
        {
          var mailOptions = {
            from: 'tvsprono@yahoo.com', // Expéditeur
            to:  documentsUser.mail, // Destinataire
            subject: '[TvsProno] - Nouveau mot de passe', // Objet du mail
            html: "<p>Veuillez trouver votre nouveau mot de passe : <b>"+ newPassword +"</b>, si vous n'êtes pas à l'origine de cette action, veuillez faire attention a vos informations confidentielles.</p>"  // Contenu du mail
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log("Erreur lors de l'envoi ", error);
            } else {
              console.log('Email envoyé : ' + info.response);
            }
          });

          let updateBddPassword = db.collection('User').where("username", "==", req.body.username);
          const updateBdd = await updateBddPassword.get()
          .then(query => {
            query.forEach(function(doc) {
              doc.ref.update(updatePassword);
            });
          });
        }
      });
      res.send({response : "Ok"});
    }, 
}

exports.data = methods;

