import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import headerComponent from '../../components/header/index';


function createNewAccountContainer({ navigation }) {
    return (
      <View>
          {headerComponent(navigation, "Page création de compte")}
          {
            //Description de l'appli 
          }
      </View>
    );
  }
  export default createNewAccountContainer;