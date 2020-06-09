import * as React from 'react';

import {View, StyleSheet } from 'react-native';

import { Input, Button, Text, CheckBox, Card, ListItem } from 'react-native-elements';
import updateBet from '../../../actions/updateBet';
import errorMessageComponent from '../../text/errorMessage/index';
import { eq } from 'react-native-reanimated';

const styles = StyleSheet.create({
    updateButton:{
        marginTop : 15+'px',
    },
});

function verifInput(teamOne, teamTwo, sport, date, description, victoryTeamOne, victoryTeamTwo, equality, betId, setAuth) {
    const indexOfSlash = date.indexOf('/'); // vérifie la présence d'un '/' dans la date pour laisser le format au DD-MM-YYYY et non pas DD/MM/YYYY
    let resultat;
    let winner;

    if(description == '')
    {
        description = "No description";
    }

    // TO DO : vérifier la présence de lettre dans le champ
    if( indexOfSlash > 0) // s'il y a un slash dans la date, renvoi un message d'erreur
    {
      setAuth("Le format de la date n'est pas valide (DD-MM-YYYY).");
    } 
    else 
    {  
        if(victoryTeamOne === true)
        {
            winner = teamOne;
        }
        else
        {          
            if(victoryTeamTwo === true)
            {
                winner = teamTwo;
            }
            else
            {
                winner = "Égalité !";
            }
        }
        
        updateBet(teamOne, teamTwo, sport, date, description, winner, betId, setAuth)
    }
}

function singleBetAdminComponent(bet) {
    // Champs :
    const [teamOne, setTeamOne] = React.useState(bet.teamOne);            
    const [teamTwo, setTeamTwo] = React.useState(bet.teamTwo);             
    const [sport, setSport] = React.useState(bet.sport);                 
    const [date, setDate] = React.useState(bet.date);                   
    const [valueOne, setValueOne] = React.useState(bet.valueOne);           
    const [valueTwo, setValueTwo] = React.useState(bet.valueTwo);           
    const [description, setDescription] = React.useState(bet.description);           
    const [victoryTeamOne, setvictoryTeamOne] = React.useState(false);   
    const [victoryTeamTwo, setvictoryTeamTwo] = React.useState(false);   
    const [equality, setEquality] = React.useState(false);   
    const [betId, setBetId] = React.useState(bet.betId);   
    const [authError, setAuth] = React.useState(false);
    console.log(bet)
    return (
        <View>
            <Input
                placeholder= {teamOne}
                inputContainerStyle={styles.loginInput}
                leftIconContainerStyle={styles.loginInputIcon}
                value={teamOne}
                onChange={(newValue)=> setTeamOne(newValue.target.value)}
                leftIcon={{type:'font-awesome', name: 'users'}} // icone de l'input
            />
            <Input
                placeholder={teamTwo}
                inputContainerStyle={styles.loginInput}
                leftIconContainerStyle={styles.loginInputIcon}
                value={teamTwo}
                onChange={(newValue)=> setTeamTwo(newValue.target.value)}
                leftIcon={{type:'font-awesome', name: 'users'}} // icone de l'input
            />  
            <Input
                placeholder={sport}
                inputContainerStyle={styles.loginInput}
                leftIconContainerStyle={styles.loginInputIcon}
                value={sport}
                onChange={(newValue)=> setSport(newValue.target.value)}
                leftIcon={{type:'font-awesome', name: 'futbol-o'}} // icone de l'input
            />
            <Input
                placeholder={date}
                inputContainerStyle={styles.loginInput}
                leftIconContainerStyle={styles.loginInputIcon}
                value={date}
                onChange={(newValue)=> setDate(newValue.target.value)}
                leftIcon={{type:'font-awesome', name: 'calendar-o'}} // icone de l'input
            />
            <Input
                placeholder={description ? description : 'Description'}
                inputContainerStyle={styles.loginInput}
                leftIconContainerStyle={styles.loginInputIcon}
                value={description}
                onChange={(newValue)=> setDescription(newValue.target.value)}
                leftIcon={{type:'font-awesome', name: 'percent'}} // icone de l'input
            />
            {bet.site.map((siteProno) => {
                    return(
                        <Card 
                            key={siteProno.siteKey}
                            title={siteProno.siteKey}                            
                        >
                            <ListItem
                                key={siteProno.siteKey}
                                subtitle={
                                    <View>
                                        <Text>
                                            Cote de {teamOne} : {siteProno.valueOne}
                                            {"\n"}
                                            {<hr></hr>}
                                            Cote de {teamTwo} : {siteProno.valueTwo}
                                        </Text>
                                    </View>
                                }
                                bottomDivider
                            />
                        </Card>
                    )
                } 
            )}
            <Text>
            </Text>
            <Card 
                title="État du match"                            
            >
                <CheckBox 
                    title= { teamOne }
                    checked={victoryTeamOne} 
                    onPress={() => {
                            setvictoryTeamOne(true)
                            setvictoryTeamTwo(false)
                            setEquality(false)
                        }
                    }
                />
                <CheckBox 
                    title= { teamTwo }
                    checked={victoryTeamTwo} 
                    onPress={() => {
                        setvictoryTeamOne(false)
                        setvictoryTeamTwo(true)
                        setEquality(false)
                        }
                    }
                />
                <CheckBox 
                    title= "Égalité"
                    checked={equality} 
                    onPress={() => {
                        setvictoryTeamOne(false)
                        setvictoryTeamTwo(false)
                        setEquality(true)
                        }
                    }
                />
            </Card>
            {
                // Affichage des messages d'erreur
                authError && errorMessageComponent(authError)     
            }
            <Button
                title='Mettre à jour le pari'
                containerStyle={styles.updateButton}
                // Vérifie qu'aucun des champs n'est vide avant de permettre à l'utilisateur de cliquer sur le bouton de création de paris
                disabled={teamOne === '' || teamTwo === '' || sport === '' || date === '' }
                onPress={() => verifInput(teamOne, teamTwo, sport, date, description, victoryTeamOne, victoryTeamTwo, equality, betId, setAuth)}
            >                                 
            </Button>
        </View>
    );
}
    
  export default singleBetAdminComponent;  
    