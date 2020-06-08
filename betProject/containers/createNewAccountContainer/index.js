import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import headerComponent from '../../components/header/index';
import { Input, Button, Text } from 'react-native-elements';
import errorMessageComponent from '../../components/text/errorMessage/index';

import { Image } from 'react-native-elements';
import createAccount from '../../actions/createAccount';

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

const verifInput = (name, firstname, username, mail, setAuth) => {
  if(mail) {
    const indexOfAt = mail.indexOf('@');
    const indexOfPoint = mail.indexOf('.', indexOfAt);
    
    if( indexOfAt > 0 && indexOfPoint > 0) {
      createAccount(name, firstname, username, mail, setAuth);
    }
    else {
      setAuth("Le format de l'addresse mail inscrite est incorrect ! Veuillez la modifier.");
    }
  }
}

function createNewAccountContainer({ navigation }) {

    const [name, setName] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [mail, setMail] = React.useState('');
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
              disabled={name === '' || firstname === '' || username === '' || mail === ''}
              onPress={() => verifInput(name, firstname, username, mail, setAuth)}
            >
            </Button>
      </View>
    );
  }
  export default createNewAccountContainer;