import * as React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-elements'

import headerComponent from '../../components/header/index';
import profileAdmin from '../../components/profile/admin';
import profileUser from '../../components/profile/user';

import checkRole from '../../actions/security';

import backgroundOnPages from '../../utils/picture/backgroundPage.png';

import AsyncStorage from '@react-native-community/async-storage';
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
//Declaration du style
const styles = StyleSheet.create({
  backgroundImg:{
    flex: 1,
  }
});

function singleUserContainer({ route, navigation }) {
    const { singleUser } = route.params;
    const { role } = route.params;
    const title = singleUser.name + " " + singleUser.firstname;

    console.log(singleUser);

    return (
      <ImageBackground 
      source={backgroundOnPages}
      style={styles.backgroundImg}
      >
        <View>
          {headerComponent(navigation, title)}
          <Card
            key={singleUser.id}
            title={title}
          >
            <View>
                {role === "admin" ? profileAdmin(singleUser) : profileUser(singleUser)}
            </View>
            
          </Card> 
        </View>
      </ImageBackground>
    );
  }
  export default singleUserContainer;