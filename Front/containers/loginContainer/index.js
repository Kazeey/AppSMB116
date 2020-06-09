import * as React from 'react';
import {View, StyleSheet, ImageBackground, Alert } from 'react-native';

import { Input, Button, Text } from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';

import { Image } from 'react-native-elements';

import loginImage from '../../utils/picture/loginImage.png';
import backgroundLogin from '../../utils/picture/background.png';

import errorMessageComponent from '../../components/text/errorMessage/index';

// Imports des fonctions de communications avec le back
import authentification from '../../actions/authentification';
import resetPassword from '../../actions/resetPassword';

//Declaration du style
const styles = StyleSheet.create({
  loginWrapper: {
    justifyContent: 'center',
    height:100+'%',
  },
  loginImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 30 + 'px',
  },
  loginInput: {
    margin: 20 + 'px',
  },
  loginInputIcon: {
    marginRight: 10+'px',
    color: 'white', 
  },
  inputStyleLogin:{
    color: 'white',
  },
  loginButton: {
    margin: 10 +  'px',
    backgroundColor: '#4faa7c',
    color: 'white',
  },
  buttonForgotPassword:{
    margin: 10 + 'px',
    textDecorationLine: 'underline',
    color: 'grey',
  },
  buttonNewAccount: { 
    margin: 10 + 'px',
    backgroundColor: '#4faa7c',
    color: 'white',
  },
  backgroundImg:{
    flex: 1,
  }
});

//Fonction provisoire qui sera remplacé par une API
const login = async (username, password, setAuth, navigation) => {
  const resp = await authentification(username, password);
  //La réponse est un string 'blocked' signifie que le compte est bloqué
  if(resp === 'blocked' ){
    setAuth("Votre compte est actuellement suspendu, ou n'existe pas, veuillez contacter le support pour plus d'informations");
  }else{
    //La réponse est un string qui n'est pas 'blocked' signifie qu'il contient un userId
    if(typeof resp === 'string'){
        try {
          await AsyncStorage.setItem('@userId', resp)
        } catch (e) {
          console.log("Erreur lors du stockage de l'identifiant");
        }
      navigation.navigate('home', { screen: 'homeContainer' });
    }else{
      //Sinon, la réponse est un number qui est le nombre d'éssai restant avec ce mail. Si ce mail n'existe pas, renvoie tout de même un nbEssaie (5) pour ne 
      //Pas faire voir que le mail existe
      setAuth('Votre username ou votre password est incorrect. Il vous reste '+resp+' essais !');
    }
  }
}

//Declaration de la page de login
function loginContainer({ navigation }) {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [authError, setAuth] = React.useState(false);

    return (
      <ImageBackground 
        source={backgroundLogin}
        style={styles.backgroundImg}
      >
          <View style={styles.loginWrapper}>
            <Image
              source={{ uri: loginImage }}
              containerStyle={styles.loginImage}
            />
            <Input
              placeholder='Username'
              inputContainerStyle={styles.loginInput}
              leftIconContainerStyle={styles.loginInputIcon}
              value={username}
              inputStyle={styles.inputStyleLogin}
              onChange={(newValue)=> setUsername(newValue.target.value)}
              leftIcon={{type:'font-awesome', name: 'user-o', color: 'white'}}
            />
            <Input
              placeholder='Password'
              inputContainerStyle={styles.loginInput}
              leftIconContainerStyle={styles.loginInputIcon}
              value={password}
              inputStyle={styles.inputStyleLogin}
              onChange={(newValue)=> setPassword(newValue.target.value)}
              leftIcon={{type:'font-awesome', name: 'lock', color: 'white'}}
              secureTextEntry={true}
            />
            {
              authError && errorMessageComponent(authError)
            }
            {
              //TODO: Connexion avec Google / Facebook avec JWT
            }
            <Button
              title='Se connecter'
              buttonStyle={styles.loginButton}
              disabled={password === '' || username===''}
              onPress={() => login(username, password, setAuth, navigation)}
            >
            </Button>
            <Button
              title='Créer un compte'
              buttonStyle={styles.buttonNewAccount}
              onPress={() => navigation.navigate('createNewAccountContainer')}
            >
            </Button>
            {
              // TODO : Double vérification, avec une alert
            }
            <Button
              title='Mot de passe oublié'
              type="clear"
              containerStyle={styles.buttonForgotPassword}
              disabled={username===''}
              onPress={() => resetPassword(username, setAuth)}
            > 
            </Button>
        </View>
      </ImageBackground>
      
    );
}
export default loginContainer;  
  