import * as React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import headerComponent from '../../components/header/index';
import AsyncStorage from '@react-native-community/async-storage';

import getProfile from '../../actions/profile';
import backgroundOnPages from '../../utils/picture/backgroundPage.png';

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

function profileContainer({ navigation }) {
    const userId = getData();
    const profileInfo = getProfile(userId);
    return (
      <ImageBackground 
      source={backgroundOnPages}
      style={styles.backgroundImg}
      >
        <View>
            {headerComponent(navigation, 'Profile')}
            {
              //profileInfo.name
              //profileInfo.firstname
              //...
            }
        </View>
      </ImageBackground>
    );
  }
  export default profileContainer;