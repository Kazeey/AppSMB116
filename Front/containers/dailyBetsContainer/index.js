import * as React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import headerComponent from '../../components/header/index';

import { Card, ListItem, Button} from 'react-native-elements'

// Imports des fonctions de communications avec le back
import getDailyBets from '../../actions/dailyBets';

const styles = StyleSheet.create({
  seeMoreButton:{
    margin: 10 + 'px',
    backgroundColor: '#4faa7c',
    color: 'white',
  }
});

function dailyBetsContainer({ navigation }) {

  const [dailyBets, setDailyBets] = React.useState([]);

  React.useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    getDailyBets().then((response) => setDailyBets(response) );
  },[])

  return (
    <ScrollView>
        {headerComponent(navigation, 'Pari du jour')}
        {
          //TODO : Pagination ou limite
          dailyBets.map((dailyBet)=> {
            return (
              <View key={dailyBet.betId}>
                <Card
                key={dailyBet.betId}
                title={dailyBet.teamOne + ' vs ' + dailyBet.teamTwo} // Titre du pari
                >
                <ListItem
                    key={dailyBet.betId}
                    subtitle={
                      <View>
                        <Button
                          title='Voir plus' // Bouton pour avoir plus d'informations sur le pari 
                          buttonStyle={styles.seeMoreButton}
                          onClick={() => navigation.navigate('singleBetContainer', {singleBet: dailyBet})}
                        >
                        </Button>
                      </View>
                    }
                    bottomDivider
                />
                </Card>
              </View>
            )
          })
        }
      </ScrollView>
    );
  }
  export default dailyBetsContainer;