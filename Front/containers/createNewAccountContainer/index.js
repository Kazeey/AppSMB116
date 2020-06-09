import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import headerComponent from '../../components/header/index';
import { Input, Button, Text } from 'react-native-elements';
import errorMessageComponent from '../../components/text/errorMessage/index';

import { Image } from 'react-native-elements';

// Imports des fonctions de communications avec le back
import createAccount from '../../actions/createAccount';

//Declaration du style
const styles = StyleSheet.create({
  loginWrapper: {
    justifyContent: 'center',
    height:100+'%',
  },
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

const verifInput = (name, firstname, username, mail, setAuth) => {
  if(mail) { // vérifie la présence d'un mail
    const indexOfAt = mail.indexOf('@'); // vérifie la présence d'un "@"
    const indexOfPoint = mail.indexOf('.', indexOfAt); // vérifie la présence d'un "." après le "@", ce "." correspond au domaine qui gère l'envoi du mail
    
    if( indexOfAt > 0 && indexOfPoint > 0) { // S'il y a un "@" et un "." après, alors lancement de la fonction de création de l'utilisateur
      createAccount(name, firstname, username, mail, setAuth);
    }
    else { // Sinon message d'erreur
      setAuth("Le format de l'addresse mail inscrite est incorrect ! Veuillez la modifier.");
    }
  }
}

function createNewAccountContainer({ navigation }) {
                                                              // Champs :
    const [name, setName] = React.useState('');               // name      -> Prénom de l'utilisateur
    const [firstname, setFirstname] = React.useState('');     // firsntame -> Nom de l'utilisateur
    const [username, setUsername] = React.useState('');       // username  -> Login de l'utilisateur
    const [mail, setMail] = React.useState('');               // mail      -> Mail de l'utilisateur
    const [authError, setAuth] = React.useState(false);   

    return (
      <View>
          {headerComponent(navigation, "Page création de compte")}
            <Input
              placeholder='Name'
              inputContainerStyle={styles.loginInput}
              leftIconContainerStyle={styles.loginInputIcon}
              value={name}
              onChange={(newValue)=> setName(newValue.target.value)}
              leftIcon={{type:'font-awesome', name: 'user'}}
            />
            <Input
              placeholder='Firstname'
              inputContainerStyle={styles.loginInput}
              leftIconContainerStyle={styles.loginInputIcon}
              value={firstname}
              onChange={(newValue)=> setFirstname(newValue.target.value)}
              leftIcon={{type:'font-awesome', name: 'user'}}
            />        
            <Input
              placeholder='Username'
              inputContainerStyle={styles.loginInput}
              leftIconContainerStyle={styles.loginInputIcon}
              value={username}
              onChange={(newValue)=> setUsername(newValue.target.value)}
              leftIcon={{type:'font-awesome', name: 'user'}}
            />
            <Input
              placeholder='Mail'
              inputContainerStyle={styles.loginInput}
              leftIconContainerStyle={styles.loginInputIcon}
              value={mail}
              onChange={(newValue)=> setMail(newValue.target.value)}
              leftIcon={{type:'font-awesome', name: 'envelope'}}
            />
            {
              authError && errorMessageComponent(authError)
            }
            <Button
              title='Créer un compte'
              containerStyle={styles.loginButton}
              // Vérifie que les inputs ne sont pas vides avant de permettre à l'utilisateur de cliquer sur le bouton
              disabled={name === '' || firstname === '' || username === '' || mail === ''}
              onPress={() => verifInput(name, firstname, username, mail, setAuth)}
            >
            </Button>
      </View>
    );
  }
  export default createNewAccountContainer;