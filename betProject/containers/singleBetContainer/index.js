import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text} from 'react-native-elements'

import headerComponent from '../../components/header/index';
  
function singleBetContainer({ route, navigation }) {
  const { singleBet } = route.params;
    return (
      <View>
        {headerComponent(navigation, 'Pari : '+ singleBet.title)}
        <Card
          key={singleBet.id}
          title={singleBet.title}
        >
          <Text>
            {singleBet.describe}
          </Text>
        </Card>
      </View>
    );
  }
  export default singleBetContainer;