import * as React from 'react';

import {View, StyleSheet } from 'react-native';

import { Input, Button, Text, CheckBox, Card, ListItem } from 'react-native-elements';
import errorMessageComponent from '../../text/errorMessage/index';
import { eq } from 'react-native-reanimated';

// Imports des fonctions de communications avec le back
import updateAccount from '../../../actions/updateAccount/updateAccount';

import AsyncStorage from '@react-native-community/async-storage';
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@userId')
    if(value !== null) {
      return value;
    }
  } catch(e) {
    // error reading value
  }
}
//Declaration du style
const styles = StyleSheet.create({
    updateButton:{
        marginTop : 15+'px',
    },
    position:{
        alignItems : 'center',
    }, 
    backgroundImg:{
        flex: 1,
      }
});

function verifInput(name, firstname, username, password, mail, userId, setAuth) {
    if(mail) { // vérifie la présence d'un mail
    const indexOfAt = mail.indexOf('@'); // vérifie la présence d'un "@"
    const indexOfPoint = mail.indexOf('.', indexOfAt); // vérifie la présence d'un "." après le "@", ce "." correspond au domaine qui gère l'envoi du mail
    
    if( indexOfAt > 0 && indexOfPoint > 0) { // S'il y a un "@" et un "." après, alors lancement de la fonction de création de l'utilisateur
      updateAccount(name, firstname, username, password, mail, userId, setAuth);
    }
    else { // Sinon message d'erreur
      setAuth("Le format de l'addresse mail inscrite est incorrect ! Veuillez la modifier.");
    }
  }
}

function singleUserAdminComponent(user) {
    
    const [name, setName] = React.useState(user.name);            
    const [firstname, setFirstname] = React.useState(user.firstname);             
    const [mail, setMail] = React.useState(user.mail);                 
    const [username, setUsername] = React.useState(user.username);                   
    const [password, setPassword] = React.useState(user.password);           
    const [cguCgv] = React.useState(user.cguCgv);           
    const [state] = React.useState(user.state);           
    const [role] = React.useState(user.role);           
    const [userId] = React.useState(user.userId);   
    const [idVisiteur, setUserIdEnCours] = React.useState(user.userId);   
    const [authError, setAuth] = React.useState(false);

    let userIdEnCours = getData();
    userIdEnCours.then((value) => setUserIdEnCours(value));

    return (
        <View>
        {
            userId === idVisiteur 
            ?
                <Card
                    title="Mofications des données de l'utilisateur"
                >
                    <View>
                    <Input
                        placeholder= {name}
                        inputContainerStyle={styles.loginInput}
                        leftIconContainerStyle={styles.loginInputIcon}
                        value={name}
                        onChange={(newValue)=> setName(newValue.target.value)}
                        leftIcon={{type:'font-awesome', name: 'users'}} // icone de l'input
                    />
                    <Input
                        placeholder={firstname}
                        inputContainerStyle={styles.loginInput}
                        leftIconContainerStyle={styles.loginInputIcon}
                        value={firstname}
                        onChange={(newValue)=> setFirstname(newValue.target.value)}
                        leftIcon={{type:'font-awesome', name: 'users'}} // icone de l'input
                    />  
                    <Input
                        placeholder={mail}
                        inputContainerStyle={styles.loginInput}
                        leftIconContainerStyle={styles.loginInputIcon}
                        value={mail}
                        onChange={(newValue)=> setMail(newValue.target.value)}
                        leftIcon={{type:'font-awesome', name: 'futbol-o'}} // icone de l'input
                    />
                    <Input
                        placeholder={username}
                        inputContainerStyle={styles.loginInput}
                        leftIconContainerStyle={styles.loginInputIcon}
                        value={username}
                        onChange={(newValue)=> setUsername(newValue.target.value)}
                        leftIcon={{type:'font-awesome', name: 'calendar-o'}} // icone de l'input
                    />
                    <Input
                        placeholder={password}
                        inputContainerStyle={styles.loginInput}
                        leftIconContainerStyle={styles.loginInputIcon}
                        value={password}
                        onChange={(newValue)=> setPassword(newValue.target.value)}
                        leftIcon={{type:'font-awesome', name: 'book'}} // icone de l'input
                    /></View>
                    <Button
                        title='Mettre à jour les informations'
                        containerStyle={styles.updateButton}
                        // Vérifie qu'aucun des champs n'est vide avant de permettre à l'utilisateur de cliquer sur le bouton de création de paris
                        disabled={name === '' || firstname === '' || username === '' || password === '' || mail === ''}
                        onPress={() => verifInput(name, firstname, username, password, mail, userId, setAuth)}
                    >                                 
                    </Button>
                </Card>
            :
            <Card
                title={"Informations"}                            
            >
                <Card 
                    key={name}
                    title={"Prénom"}                            
                >
                    <ListItem
                        subtitle={
                            <View>
                                <View>
                                    <Text style={styles.position}>
                                        {name}
                                    </Text>
                                </View>
                            </View>
                        }
                        bottomDivider
                    />
                </Card>
                <Card 
                    key={firstname}
                    title={"Nom de famille"}                            
                >
                    <ListItem
                        subtitle={
                            <View>
                                <View>
                                    <Text style={styles.position}>
                                        {firstname}
                                    </Text>
                                </View>
                            </View>
                        }
                        bottomDivider
                    />
                </Card>
                <Card 
                    key={mail}
                    title={"Adresse mail"}                            
                >
                    <ListItem
                        subtitle={
                            <View>
                                <Text style={styles.position}>
                                    {mail}
                                </Text>
                            </View>
                        }
                        bottomDivider
                    />
                </Card>
                <Card 
                    key={username}
                    title={"Identifiant"}                            
                >
                    <ListItem
                        subtitle={
                            <View>
                                <Text style={styles.position}>
                                    {username}
                                </Text>
                            </View>
                        }
                        bottomDivider
                    />
                </Card>
                <Card 
                    key={password}
                    title={"Mot de passe"}                            
                >
                    <ListItem
                        subtitle={
                            <View>
                                <Text style={styles.position}>
                                    {userId == idVisiteur ? password : "Seul le posesseur de ce compte peut voir le mot de passe."}
                                </Text>
                            </View>
                        }
                        bottomDivider
                    />
                </Card>           
                <Card 
                    key={state}
                    title={"Etat du compte"}                            
                >
                    <ListItem
                        subtitle={
                            <View>
                                <Text style={styles.position}>
                                    {role === "admin" ? "L'utilisateur est un administrateur." : "L'utilisateur est un utilisateur basique."}
                                </Text>
                            </View>
                        }
                        bottomDivider
                    />
                </Card> 
            </Card>
        }
        </View>
    );
}
    
  export default singleUserAdminComponent;  
    