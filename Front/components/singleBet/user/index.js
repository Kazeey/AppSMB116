import * as React from 'react';

import {View, StyleSheet } from 'react-native';

import { Input, Button, Text, CheckBox, Card, ListItem } from 'react-native-elements';
import { eq } from 'react-native-reanimated';

const styles = StyleSheet.create({
    updateButton:{
        marginTop : 15+'px',
    },
    position:{
        alignItems: 'center',
    },
    positionEquipe:{
        marginTop : 15 +'px',
        alignItems: 'center',
    }
});

function singleBetAdminComponent(bet) {
    // Champs :
    const [teamOne] = React.useState(bet.teamOne);            
    const [teamTwo] = React.useState(bet.teamTwo);             
    const [sport] = React.useState(bet.sport);                 
    const [date] = React.useState(bet.date);                   
    const [valueOne] = React.useState(bet.valueOne);           
    const [valueTwo] = React.useState(bet.valueTwo);           
    const [homeTeam] = React.useState(bet.homeTeam);           
    const [description] = React.useState(bet.description);           
    const [winner] = React.useState(bet.winner);   
    const [betId] = React.useState(bet.betId);   
    const [authError, setAuth] = React.useState(false);

    return (
        <View>
            <Card 
                key={teamOne}
                title={"Équipe N°1"}                            
            >
                <ListItem
                    subtitle={
                        <View>
                            <View>
                                <Text>
                                    Équipe : {teamOne}
                                </Text>
                            </View>
                            <View style={styles.positionEquipe}>
                                <Text>
                                    {homeTeam == teamOne ? "L'équipe joue à domicile." : "L'équipe jour à l'extérieur"}
                                </Text>
                            </View>
                        </View>
                    }
                    bottomDivider
                />
            </Card>
            <Card 
                key={teamTwo}
                title={"Équipe N°2"}                            
            >
                <ListItem
                    subtitle={
                        <View>
                            <View>
                                <Text>
                                    Équipe : {teamTwo}
                                </Text>
                            </View>
                            <View style={styles.positionEquipe}>
                                <Text>
                                    {homeTeam == teamTwo ? "L'équipe joue à domicile." : "L'équipe jour à l'extérieur"}
                                </Text>
                            </View>
                        </View>
                    }
                    bottomDivider
                />
            </Card>
            <Card 
                key={sport}
                title={"Sport"}                            
            >
                <ListItem
                    subtitle={
                        <View style={styles.position}>
                            <Text>
                                {sport}
                            </Text>
                        </View>
                    }
                    bottomDivider
                />
            </Card>
            <Card 
                key={date}
                title={"Date de l'évènement"}                            
            >
                <ListItem
                    subtitle={
                        <View style={styles.position}>
                            <Text>
                                La rencontre au lieu le : {date}
                            </Text>
                        </View>
                    }
                    bottomDivider
                />
            </Card>
            <Card 
                key={description}
                title={"Description"}                            
            >
                <ListItem
                    subtitle={
                        <View>
                            <Text>
                                {description ? description : "Il n'y a pas de description pour le moment."}
                            </Text>
                        </View>
                    }
                    bottomDivider
                />
            </Card>           
            <Card 
                title="Pronostiqueurs"                            
            >
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
            </Card>
            <Card 
                key={winner}
                title={"Statut du pari"}                            
            >
                <ListItem
                    subtitle={
                        <View style={styles.position}>
                            <Text>
                                {winner ? winner : "Il n'y a pas de statut défini pour le moment."}
                            </Text>
                        </View>
                    }
                    bottomDivider
                />
            </Card> 

        </View>
    );
}
    
  export default singleBetAdminComponent;  
    