import * as React from 'react';
import { ScrollView, View } from 'react-native';

import { Card, ListItem, Button} from 'react-native-elements'
import headerComponent from '../../components/header/index';

import getAllBets from '../../actions/bets';
import checkRole from '../../actions/security';

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

function betsContainer({ navigation }) {
  const userId = getData();
  const [allBets, setAllBets] = React.useState([]);
  const [role, setRole] = React.useState([]);

  React.useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    getAllBets().then((response) => setAllBets(response));
    checkRole(userId).then((response) => setRole(response));
  },[])

    return (
      <ScrollView >
        {headerComponent(navigation, "Liste des paris")}
        {
          allBets.map((allBet)=> {
            return (
              <View key={allBet.betId}>
                <Card
                key={allBet.betId}
                title={allBet.teamOne + ' vs ' + allBet.teamTwo}
                >
                <ListItem
                    key={allBet.betId}
                    subtitle={
                      <View>
                        <Button
                          title='Voir plus'
                          onClick={() => navigation.navigate('singleBetContainer', {singleBet: allBet})}
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
        {
          role === "admin" && <Button
          title='Ajouter un nouveau Pari'
          onClick={() => navigation.navigate('addNewBetContainer')}
          >
          </Button>
        }
      </ScrollView>
    );
  }
  export default betsContainer;