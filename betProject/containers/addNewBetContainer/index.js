import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import headerComponent from '../../components/header/index';
import { Input, Button, Text, CheckBox } from 'react-native-elements';
import errorMessageComponent from '../../components/text/errorMessage/index';

import { Image } from 'react-native-elements';

// Import de la fonction de communication avec le back
import createBet from '../../actions/saveNewBets';

//Declaration du style
const styles = StyleSheet.create({
  loginInput: {
    margin: 20 + 'px',
  },
  loginInputIcon: {
    marginRight: 10+'px'
  },
  loginButton: {
    margin: 20 + 'px',
  },
});

const verifInput = (teamOne, teamTwo, sport, date, valueOne, valueTwo, homeTeamOne, homeTeamTwo, setAuth) => { // vérification du format des inputs
  let homeTeam;
  let mean;

  if(homeTeamOne == true) // Si la première checkbox n'est pas cochée, alors par défaut la deuxième l'est, et donc l'on passe l'équipe qui correspond pour la homeTeam
  {
    homeTeam = teamOne;
  }
  else
  {
    homeTeam = teamTwo;
  }

  // Vérification du format des inputs des côtes de chaque équipe
  let floatCoteOne = parseFloat(valueOne); 
  let floatCoteTwo = parseFloat(valueTwo);

  const indexOfSlash = date.indexOf('/'); // vérifie la présence d'un '/' dans la date pour laisser le format au DD-MM-YYYY et non pas DD/MM/YYYY

  // TO DO : vérifier la présence de lettre dans le champ
  
  if( indexOfSlash > 0) // s'il y a un slash dans la date, renvoi un message d'erreur
  {
    setAuth("Le format de la date n'est pas valide (DD-MM-YYYY).");
  } 
  else 
  {  
    if(isNaN(floatCoteOne) || isNaN(floatCoteTwo)) // Si les côtes ne sont pas des floats, renvoi un message d'erreur
    {
      setAuth("Le format de l'un des deux champs 'côte' n'est pas valide.");
    } 
    else 
    {
      mean = ((floatCoteOne + floatCoteTwo) / 2); // créer la moyenne des côtes 
      createBet(teamOne, teamTwo, sport, date, valueOne, valueTwo, mean, homeTeam, setAuth); // fonction de création de pari
    }
  }
}

function addNewBetContainer({ navigation }) {
                                                                  // Champs :
    const [teamOne, setTeamOne] = React.useState('');             // teamOne  -> Equipe n°1
    const [teamTwo, setTeamTwo] = React.useState('');             // teamTwo  -> Equipe n°2
    const [homeTeamOne, setHomeTeamOne] = React.useState(true);   // homeTeam -> Equipe à domicile
    const [homeTeamTwo, setHomeTeamTwo] = React.useState(false);  
    const [sport, setSport] = React.useState('');                 // sport    -> Sport de la rencontre
    const [date, setDate] = React.useState('');                   // date     -> Date de la rencontre
    const [valueOne, setValueOne] = React.useState('');           // valueOne -> Côte de l'équipe numéro 1
    const [valueTwo, setValueTwo] = React.useState('');           // valueTwo -> Côte de l'équipe numéro 2
    const [authError, setAuth] = React.useState(false);

    return (
      <View>
          {headerComponent(navigation, "Page création de paris")}
            <Input
              placeholder='Équipe n°1'
              inputContainerStyle={styles.loginInput}
              leftIconContainerStyle={styles.loginInputIcon}
              rightIcon={
                <CheckBox  // Checkbox de sélection de l'équipe à domicile
                  checked={homeTeamOne} 
                  onPress={() => {
                    setHomeTeamOne(true) 
                    setHomeTeamTwo(false)
                    }
                  }
                />
              }
              value={teamOne}
              onChange={(newValue)=> setTeamOne(newValue.target.value)}
              leftIcon={{type:'font-awesome', name: 'users'}} // icone de l'input
            />
            <Input
              placeholder='Équipe n°2'
              inputContainerStyle={styles.loginInput}
              leftIconContainerStyle={styles.loginInputIcon}
              rightIcon={
                <CheckBox  // Checkbox de sélection de l'équipe à domicile
                  checked={homeTeamTwo} 
                  onPress={() => {
                    setHomeTeamTwo(true)
                    setHomeTeamOne(false) 
                    }
                  }
                />
              }
              value={teamTwo}
              onChange={(newValue)=> setTeamTwo(newValue.target.value)}
              leftIcon={{type:'font-awesome', name: 'users'}} // icone de l'input
            />  
            <Input
              placeholder='Sport'
              inputContainerStyle={styles.loginInput}
              leftIconContainerStyle={styles.loginInputIcon}
              value={sport}
              onChange={(newValue)=> setSport(newValue.target.value)}
              leftIcon={{type:'font-awesome', name: 'futbol-o'}} // icone de l'input
            />
            <Input
              placeholder='Date'
              inputContainerStyle={styles.loginInput}
              leftIconContainerStyle={styles.loginInputIcon}
              value={date}
              onChange={(newValue)=> setDate(newValue.target.value)}
              leftIcon={{type:'font-awesome', name: 'calendar-o'}} // icone de l'input
            />
            <Input
              placeholder="Côte de l'équipe n°1"
              inputContainerStyle={styles.loginInput}
              leftIconContainerStyle={styles.loginInputIcon}
              value={valueOne}
              onChange={(newValue)=> setValueOne(newValue.target.value)}
              leftIcon={{type:'font-awesome', name: 'percent'}} // icone de l'input
            />
            <Input
              placeholder="Côte de l'équipe n°2"
              inputContainerStyle={styles.loginInput}
              leftIconContainerStyle={styles.loginInputIcon}
              value={valueTwo}
              onChange={(newValue)=> setValueTwo(newValue.target.value)}
              leftIcon={{type:'font-awesome', name: 'percent'}} // icone de l'input
            />
            {
              // Affichage des messages d'erreur
              authError && errorMessageComponent(authError)
            }
            <Button
              title='Créer un compte'
              containerStyle={styles.loginButton}
              // Vérifie qu'aucun des champs n'est vide avant de permettre à l'utilisateur de cliquer sur le bouton de création de paris
              disabled={teamOne === '' || teamTwo === '' || sport === '' || date === '' || valueOne === ''|| valueTwo === '' || (homeTeamOne === false && homeTeamTwo === false)}
              onPress={() => verifInput(teamOne, teamTwo, sport, date, valueOne, valueTwo, homeTeamOne, homeTeamTwo, setAuth)}
            >
            </Button>
      </View>
    );
  }
  export default addNewBetContainer;
