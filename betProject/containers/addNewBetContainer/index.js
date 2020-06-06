import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import headerComponent from '../../components/header/index';
import { Button } from 'react-native-elements';

//Récupération des variables du react navigation

function addNewBetContainer({ route, navigation }) {
    //Déclaration des states pour les inputs
    const { dailyBet } = route.params;
    const [title, setTitle] = React.useState('');
    const [date, setDate] = React.useState('');
    return (
      <View>
          {headerComponent(navigation, "Ajout d'un nouveau pari")}
          {
              //liste des inputs : ... date 
          }
          {
            dailyBet ? (
              //date = date du jour
               date = 'now'
            ) : (
              //date = libre choix
               date = 'libre'
            )
          }
          <Button
          title='Ajouté un nouveau Pari'
          //Complété le disable avec l'ensemble des champs nécessaire à remplir
          disable={title && date }
          onClick={() => saveNewBet(title, date)}
        >
        </Button>
      </View>
    );
  }
  export default addNewBetContainer;