import * as React from 'react';
import { View, StyleSheet, ImageBackground} from 'react-native';
import { Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import headerComponent from '../../components/header/index';
import backgroundOnPages from '../../utils/picture/backgroundPage.png';

import getStats from '../../actions/stats';

//Declaration du style
const styles = StyleSheet.create({
  backgroundImg:{
    flex: 1,
  }
});

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
      <ImageBackground 
        source={backgroundOnPages}
        style={styles.backgroundImg}
      >
        <View >
          {headerComponent(navigation, 'Statistique')}
          <Button
            //onClick={() => navigation.navigate('LoginContainer')}
          >
            Go to Home
          </Button>
          {
          }
        </View>
      </ImageBackground>
    );
  }
  export default statsContainer;