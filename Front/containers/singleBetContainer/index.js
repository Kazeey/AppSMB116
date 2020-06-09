import * as React from 'react';
import { View, StyleSheet, ImageBackground, Button } from 'react-native';
import { Card, Text} from 'react-native-elements'

import headerComponent from '../../components/header/index';
import singleBetAdmin from '../../components/singleBet/admin';
import singleBetUser from '../../components/singleBet/user';

import checkRole from '../../actions/security';

import backgroundOnPages from '../../utils/picture/backgroundPage.png';

//Declaration du style
const styles = StyleSheet.create({
  backgroundImg:{
    flex: 1,
  }
});

function singleBetContainer({ route, navigation }) {
    const { singleBet } = route.params;
    const { role } = route.params;
    const title = singleBet.teamOne + " VS " + singleBet.teamTwo;

    return (
      <ImageBackground 
      source={backgroundOnPages}
      style={styles.backgroundImg}
      >
        <View>
          {headerComponent(navigation, title)}
          <Card
            key={singleBet.id}
            title={title}
          >
            <Text>
              {singleBet.describe}
            </Text>

            {role === "admin" ? singleBetAdmin(singleBet) : singleBetUser(singleBet)}
            
          </Card>
        </View>
      </ImageBackground>
    );
  }
  export default singleBetContainer;