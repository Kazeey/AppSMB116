import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import headerComponent from '../../components/header/index';

//Declaration du style
const styles = StyleSheet.create({
  global: {
    marginLeft : 10+'%',
    margin : 20+'px',
    width : 80+'%',
    textAlign : "justify",
    alignItems : "center",
    fontFamily: "Roboto-Light",
  },
  paragOne: {
    fontSize : 20+'px',
  },
  paragTwo: {
    fontSize : 20+'px',
  },
  paragThree: {
    fontSize : 20+'px',
    color :"red"
  },
  loginButton: {
    margin: 20 + 'px',
  },
});

function homeContainer({ navigation }) {
    return (
      <View>
          {headerComponent(navigation, "Page d'accueil")}
          <Text style={styles.global}>
            <Text style={styles.paragOne}>
              TvsProno est l’application qui vous permets d’avoir la meilleur vision de vos paris et des matchs à venir. {"\n"}
              Foot, tennis, basket, pétanque, esport … {"\n"}
              TvsProno est le service qui couvre le plus de sport sur lesquels vous pouvez parier.
              {"\n"}
              {"\n"}
              Suivez tous les matchs des plus grosses compétitions, telles que la NBA, la Ligue 1 Conforama, Roland Garros, ou encore la LEC ! 
            </Text>
            {"\n"}
            {"\n"}
            {"\n"}
            <Text style={styles.paragTwo}>
              Sur chaque matchs, vous aurez la possibilité d'accéder aux détails concernant le match en lui-même,
              mais aussi l’état actuel des deux compositions de joueur. Bref, avec TvsProno vous ne passerez à côté de rien ! 
            </Text>
            {"\n"}
            {"\n"}
            {"\n"}
            <Text style={styles.paragThree}>
              +18 - Les jeux d’argents et de hasard sont interdits aux mineurs
              Toute personne souhaitant faire l’objet d’une interdiction aux jeux doit le faire elle-même auprès du ministère de l’intérieur.
              Jouer comporte des risques, pour être aidé composez le 09 74 75 13 13 ou rendez-vous sur le site : {"\n"}
              <a href="https://www.joueurs-info-service.fr">https://www.joueurs-info-service.fr</a> 
            </Text>

          </Text>
      </View>
    );
  }
  export default homeContainer;


  
  //
  
  
