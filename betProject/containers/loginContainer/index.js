import * as React from 'react';
import {View, StyleSheet,  } from 'react-native';

import { Input, Button, Text } from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';

import { Image } from 'react-native-elements';

import loginImage from '../../utils/picture/loginImage.jpg';
import errorMessageComponent from '../../components/text/errorMessage/index';
import authentification from '../../actions/authentification';

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
    marginBottom: 80 + 'px',
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

//Fonction provisoire qui sera remplacé par une API
const login = async (username, password, setAuth, navigation) => {
  const resp = await authentification(username, password);
  //La réponse est un string 'blocked' signifie que le compte est bloqué
  if(resp === 'blocked' ){
    setAuth("Votre compte est actuellement suspendu, veuillez contacter le support pour plus d'information");
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
      setAuth('Votre username ou votre password est incorrect. Il vous reste '+resp+ ' essais !');
    }
  }
}

//Declaration de la page de login
function loginContainer({ navigation }) {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [authError, setAuth] = React.useState(false);

    return (
      <View style={styles.loginWrapper}>
        {
          //TODO CHANGEZ L'IMAGE PAR LE VRAI LOGO
        }
        <Image
          source={{ uri: loginImage }}
          containerStyle={styles.loginImage}
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
          placeholder='Password'
          inputContainerStyle={styles.loginInput}
          leftIconContainerStyle={styles.loginInputIcon}
          value={password}
          onChange={(newValue)=> setPassword(newValue.target.value)}
          leftIcon={{type:'font-awesome', name: 'lock'}}
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
          containerStyle={styles.loginButton}
          disabled={password === '' || username===''}
          onClick={() => login(username, password, setAuth, navigation)}
        >
        </Button>
      </View>
    );
}
export default loginContainer;  
  