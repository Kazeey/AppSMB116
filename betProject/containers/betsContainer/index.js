import * as React from 'react';
import { Text,ScrollView, StyleSheet } from 'react-native';
import { Button} from 'react-native-elements'
import headerComponent from '../../components/header/index';

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
  const role = checkRole(userId)
    return (
      <ScrollView >
        {headerComponent(navigation, "Liste des paris")}
        
        {
          role === "admin" && <Button
          title='Ajouté un nouveau Pari'
          onClick={() => navigation.navigate('addNewBetContainer', {dailyBet: false })}
        >
        </Button>
        }
      </ScrollView>
    );
  }
  export default betsContainer;