import * as React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import { Card, ListItem, Button} from 'react-native-elements'
import headerComponent from '../../components/header/index';
import AsyncStorage from '@react-native-community/async-storage';

// Imports des fonctions de communications avec le back
import getAllBets from '../../actions/bets';
import checkRole from '../../actions/security';

const styles = StyleSheet.create({
  seeMoreButton:{
    margin: 10 + 'px',
    backgroundColor: '#4faa7c',
    color: 'white',
  },
  addNewButton: {
    margin: 10 + 'px',
    backgroundColor: '#4faa7c',
    color: 'white',
  }
});
// récupération de l'id de l'utilisateur stocké lors de la connexion
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
  const [allBets, setAllBets] = React.useState([]);
  const [role, setRole] = React.useState([]);
  const [userId, setUserId] = React.useState([]);

  React.useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    getAllBets().then((response) => setAllBets(response));
    getData().then((response) => checkRole(response)).then((roleResp) => setRole(roleResp));
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
                title={allBet.teamOne + ' vs ' + allBet.teamTwo} // Titre du pari
                >
                <ListItem
                    key={allBet.betId}
                    subtitle={
                      <View>
                        <Button // Voir plus d'informations concernant le pari
                          title='Voir plus'
                          buttonStyle={styles.seeMoreButton}
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
          // Si le role de l'utilisateur est "admin", alors il pourra voir le bouton, pour rajouter un pari
          role === "admin" && <Button
          title='Ajouter un nouveau Pari'
          buttonStyle={styles.addNewButton}
          onClick={() => navigation.navigate('addNewBetContainer')}
          >
          </Button>
        }
      </ScrollView>
    );
  }
  export default betsContainer;