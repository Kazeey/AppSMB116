import * as React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import headerComponent from '../../components/header/index';

import { Card, ListItem, Button} from 'react-native-elements'

import getDailyBets from '../../actions/dailyBets';

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
}

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
                title={dailyBet.teamOne + ' vs ' + dailyBet.teamTwo}
                >
                <ListItem
                    key={dailyBet.betId}
                    subtitle={
                      <View>
                        <Button
                          title='Voir plus'
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