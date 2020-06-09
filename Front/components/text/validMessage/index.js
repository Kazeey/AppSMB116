import * as React from 'react';

import {View, StyleSheet,  } from 'react-native';

import { Text } from 'react-native-elements';

const styles = StyleSheet.create({
    validMessageWrapper: {
        backgroundColor: 'rgba(210,26,16,.15)',
        margin: 20 + 'px',
    },
    validMessageText: {
        color: '#d21a10',
        padding: 10 + 'px',
    }
  });

function validMessageComponent(validMessage) {
  return (
      <View style={styles.validMessageWrapper}> 
          <Text style={styles.validMessageText}>
            {validMessage}
          </Text>
      </View>
  )
}
    
  export default validMessageComponent;  
    