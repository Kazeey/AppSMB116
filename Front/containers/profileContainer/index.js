import * as React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import headerComponent from '../../components/header/index';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, ListItem, Button} from 'react-native-elements'

import getAllProfiles from '../../actions/profile';
import backgroundOnPages from '../../utils/picture/backgroundPage.png';
import profileUser from '../../components/profile/admin';
import profileAdmin from '../../components/profile/user';
import checkRole from '../../actions/security';

//Declaration du style
const styles = StyleSheet.create({
  backgroundImg:{
    flex: 1,
  }
});

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

    const [allProfiles, setAllProfiles] = React.useState([]);
    const [role, setRole] = React.useState([]);    

    React.useEffect(() => {
      // Met à jour le titre du document via l’API du navigateur
      getAllProfiles().then((response) => setAllProfiles(response));
      getData().then((response) => checkRole(response)).then((roleResp) => setRole(roleResp));
    },[])

    return (
      <ImageBackground 
      source={backgroundOnPages}
      style={styles.backgroundImg}
      >
        <View>
            {headerComponent(navigation, 'Profil')}
            {
              allProfiles.map((profile)=> {
                return ( <Card
                  key={profile.userId}
                  containerStyle={styles.cardStyle}
                  title={profile.name + " " + profile.firstname} // Titre du pari
                >
                  <ListItem
                      key={profile.userId}
                      subtitle={
                        <View>
                            <Button
                              title='Voir plus' // Bouton pour avoir plus d'informations sur le pari
                              buttonStyle={styles.seeMoreButton}
                              onClick={() => navigation.navigate('singleUserContainer', {singleUser: profile, role : role})}
                            >
                            </Button>
                        </View>
                      }
                      bottomDivider
                  />
                </Card>
                )
              })
            }
        </View>
      </ImageBackground>
    );
  }
  export default profileContainer;