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

 methods = {
    //TODO Retravailler les fonctions
    addSports : async function(req, res){
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
    }, 

    
    addBets : async function(req, res){
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
                    let random = uuid();
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
                      betId: random,
                    };
      
                    nbDocuments++; // Incrémentation du nombre de paris présent en base pour l'ID
                    let Bets = db.collection('Bet').doc(`${random}`).set(data); // Insertion dans la base
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
       //   });
      //   });
    }

}

exports.data = methods;

