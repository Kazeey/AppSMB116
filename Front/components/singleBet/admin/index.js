import * as React from 'react';

import {View, StyleSheet } from 'react-native';

import { Input, Button, Text, CheckBox, Card, ListItem } from 'react-native-elements';
import updateBet from '../../../actions/updateBet';
import errorMessageComponent from '../../text/errorMessage/index';

const styles = StyleSheet.create({
    updateButton:{
        marginTop : 15+'px',
    },
});

function verifInput(teamOne, teamTwo, sport, date, description, winner, stateBet, setAuth) {
    const indexOfSlash = date.indexOf('/'); // vérifie la présence d'un '/' dans la date pour laisser le format au DD-MM-YYYY et non pas DD/MM/YYYY
    let resultat;
    // TO DO : vérifier la présence de lettre dans le champ
    if( indexOfSlash > 0) // s'il y a un slash dans la date, renvoi un message d'erreur
    {
      setAuth("Le format de la date n'est pas valide (DD-MM-YYYY).");
    } 
    else 
    {  
        updateBet(teamOne, teamTwo, sport, date, description, winner, stateBet, setAuth)
    }
}

function singleBetAdminComponent(bet) {
    console.log(bet);
    // Champs :
    const [teamOne, setTeamOne] = React.useState(bet.teamOne);            
    const [teamTwo, setTeamTwo] = React.useState(bet.teamTwo);             
    const [sport, setSport] = React.useState(bet.sport);                 
    const [date, setDate] = React.useState(bet.startTime);                   
    const [valueOne, setValueOne] = React.useState(bet.valueOne);           
    const [valueTwo, setValueTwo] = React.useState(bet.valueTwo);           
    const [description, setDescription] = React.useState('');           
    const [stateBet, setStateBet] = React.useState('');              
    const [winner, setWinner] = React.useState('');   
    const [betId, setBetId] = React.useState(bet.betId);   
    const [authError, setAuth] = React.useState(false);

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
                placeholder="Description"
                inputContainerStyle={styles.loginInput}
                leftIconContainerStyle={styles.loginInputIcon}
                value={description}
                onChange={(newValue)=> setDescription(newValue.target.value)}
                leftIcon={{type:'font-awesome', name: 'percent'}} // icone de l'input
            />
            <Input
                placeholder="État du match"
                inputContainerStyle={styles.loginInput}
                leftIconContainerStyle={styles.loginInputIcon}
                value={stateBet}
                onChange={(newValue)=> setStateBet(newValue.target.value)}
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
                    checked={winner === teamOne} 
                    onPress={() => {
                            setWinner(teamOne)
                        }
                    }
                />
                <CheckBox 
                    title= { teamTwo }
                    checked={winner === teamTwo} 
                    onPress={() => {
                            setWinner(teamTwo)
                        }
                    }
                />
                <CheckBox 
                    title= "Égalité"
                    checked={winner === 'equality'} 
                    onPress={() => {
                            setWinner('equality')
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
                disabled={teamOne === '' || teamTwo === '' || sport === '' || date === '' || description === ''|| stateBet === '' || winner === false}
                onPress={() => verifInput(teamOne, teamTwo, sport, date, description, stateBet, winner, setAuth)}
            >
            </Button>
        </View>
    );
}
    
  export default singleBetAdminComponent;  
    