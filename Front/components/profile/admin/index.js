import * as React from 'react';

import {View, StyleSheet } from 'react-native';

import { Input, Button, Text, CheckBox, Card, ListItem } from 'react-native-elements';
import errorMessageComponent from '../../text/errorMessage/index';
import { eq } from 'react-native-reanimated';

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
function singleUserAdminComponent(user) {
    
    const [name] = React.useState(user.name);            
    const [firstname] = React.useState(user.firstname);             
    const [mail] = React.useState(user.mail);                 
    const [username] = React.useState(user.username);                   
    const [password] = React.useState(user.password);           
    const [cguCgv] = React.useState(user.cguCgv);           
    const [state] = React.useState(user.state);           
    const [role] = React.useState(user.role);           
    const [userId] = React.useState(user.userId);   
    const [idVisiteur, setUserIdEnCours] = React.useState(user.userId);   
    const [authError, setAuth] = React.useState(false);

    let userIdEnCours = getData();
    userIdEnCours.then((value) => setUserIdEnCours(value));

    console.log("userIdPage : ", userId, ' userIdVisiteur : ', idVisiteur)
    return (
        <View>
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
        </View>
    );
}
    
  export default singleUserAdminComponent;  
    