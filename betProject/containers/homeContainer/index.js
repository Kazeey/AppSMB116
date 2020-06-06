import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import headerComponent from '../../components/header/index';


function homeContainer({ navigation }) {
    return (
      <View>
          {headerComponent(navigation, "Page d'accueil")}
          {
            //Description de l'appli ? 
            //lien réseaux sociaux ?
          }
      </View>
    );
  }
  export default homeContainer;