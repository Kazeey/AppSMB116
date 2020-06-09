import * as React from 'react';

import {View, StyleSheet,  } from 'react-native';

import { Text } from 'react-native-elements';

const styles = StyleSheet.create({
    errorMessageWrapper: {
        backgroundColor: 'rgba(210,26,16,.15)',
        margin: 20 + 'px',
    },
    errorMessageText: {
        color: '#d21a10',
        padding: 10 + 'px',
    }
  });

function errorMessageComponent(errorMessage) {
  return (
      <View style={styles.errorMessageWrapper}> 
          <Text style={styles.errorMessageText}>
            {errorMessage}
            </Text>
      </View>
  )
}
    
  export default errorMessageComponent;  
    