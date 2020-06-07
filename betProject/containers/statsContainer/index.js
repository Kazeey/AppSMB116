import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button} from 'react-native-elements'

import headerComponent from '../../components/header/index';

import getStats from '../../actions/stats';

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


function statsContainer({ navigation }) {
  const userId = getData();
  const myStats = getStats(userId);
    return (
      <View >
        {headerComponent(navigation, 'Statistique')}
        <Button
          //onClick={() => navigation.navigate('LoginContainer')}
        >
          Go to Home
        </Button>
        {
          console.log('myStats', myStats)
        }
      </View>
    );
  }
  export default statsContainer;