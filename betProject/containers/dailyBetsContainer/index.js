import * as React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import headerComponent from '../../components/header/index';

import { Card, ListItem, Button} from 'react-native-elements'

import getDailyBets from '../../actions/dailyBets';
import checkRole from '../../actions/security'

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
  const userId = getData();
  //Declaration provisoir tableau
  const dailyBets = getDailyBets(userId);
  //const role = checkRole(userId)

    return (
    <ScrollView>
        {headerComponent(navigation, 'Pari du jour')}
        {
          //TODO : Pagination ou limite
          console.log("promise", dailyBets.value)
          // dailyBets.map((dailyBet)=> {
          //   return (
          //     <View key={dailyBet.id}>
          //       <Card
          //       key={dailyBet.id}
          //       title={dailyBet.title}
          //       >
          //       <ListItem
          //           key={dailyBet.id}
          //           title={dailyBet.describe}
          //           subtitle={
          //           <View>
          //             <Button
          //               title='Voir plus'
          //               onClick={() => navigation.navigate('singleBetContainer', {singleBet: dailyBet})}
          //             >
          //             </Button>
          //           </View>
                    
          //           }
          //           bottomDivider
          //       />
          //       {
          //         role === "admin" && <Button
          //         title='Ajouté un nouveau Pari'
          //         onClick={() => navigation.navigate('addNewBetContainer', {dailyBet: true })}
          //       >
          //       </Button>
          //       }
          //       </Card>
          //     </View>
          //   )
          // })
        }
      </ScrollView>
    );
  }
  export default dailyBetsContainer;