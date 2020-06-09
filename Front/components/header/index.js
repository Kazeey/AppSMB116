import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Icon} from 'react-native-elements'

function headerComponent(navigation, pageName){
    return(
        //TODO Effet header scroll up scroll down : https://github.com/janicduplessis/collapsible-navbar/blob/master/main.js
        <Header
        backgroundColor="#4faa7c"
        leftComponent={
          <Icon
            name='arrow-left'
            type='font-awesome'
            color='#fff'
            onPress={() => navigation.goBack()} />
        }
        centerComponent={{ text: pageName, style: { color: '#fff' } }}
      />
    )
}
export default headerComponent;