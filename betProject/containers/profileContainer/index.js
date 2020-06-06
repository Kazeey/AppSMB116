import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import headerComponent from '../../components/header/index';

import getProfile from '../../actions/profile';

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
    console.log('userId', userId);
    const profileInfo = getProfile(userId);
    return (
      <View>
          {headerComponent(navigation, 'Profile')}
          {
            console.log('profileInfo', profileInfo)
            //profileInfo.name
            //profileInfo.firstname
            //...
          }
      </View>
    );
  }
  export default profileContainer;