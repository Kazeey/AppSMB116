import * as React from 'react';
import { ScrollView, View, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import headerComponent from '../../components/header/index';
import checkRole from '../../actions/security';

import backgroundOnPages from '../../utils/picture/backgroundPage.png';

import { Card, ListItem, Button} from 'react-native-elements'

// Imports des fonctions de communications avec le back
import getDailyBets from '../../actions/dailyBets';

const styles = StyleSheet.create({
  seeMoreButton:{
    margin: 10 + 'px',
    backgroundColor: '#4faa7c',
    color: 'white',
  backgroundImg:{
    flex: 1,
  },
}
})

//Récupération des variables du react navigation
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@userId')
    if(value !== null) {
      return value;
    }
  } catch(e) {
    // error reading value
  }
});

function dailyBetsContainer({ navigation }) {

  const [dailyBets, setDailyBets] = React.useState([]);
  const [role, setRole] = React.useState([]);

  React.useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    getDailyBets().then((response) => setDailyBets(response) );
    getData().then((response) => checkRole(response)).then((roleResp) => setRole(roleResp));
  },[])

  return (
    <ScrollView>
        {headerComponent(navigation, 'Pari du jour')}
        {
          
          //TODO : Pagination ou limite
          dailyBets.map((dailyBet)=> {
            return (      
              <ImageBackground 
                source={backgroundOnPages}
                style={styles.backgroundImg}
              >
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
                          onClick={() => navigation.navigate('singleBetContainer', {singleBet: dailyBet, role : role})}
                        >
                        </Button>
                      </View>
                    }
                    bottomDivider
                />
                </Card>
              </View>
            </ImageBackground>
            )
          })
        }
      </ScrollView>
    );
  }
  export default dailyBetsContainer;