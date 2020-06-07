// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import loginContainer from './containers/loginContainer/index';
import homeContainer from './containers/homeContainer/index';
import betsContainer from './containers/betsContainer/index';
import statsContainer from './containers/statsContainer/index';
import singleBetContainer from './containers/singleBetContainer/index';
import addNewBetContainer from './containers/addNewBetContainer/index';
import dailyBetsContainer from './containers/dailyBetsContainer/index';
import profileContainer from './containers/profileContainer/index';
import createNewAccountContainer from './containers/createNewAccountContainer/index';

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

function Home(){
  return (   
    <Tab.Navigator>
      <Tab.Screen 
        name="homeContainer"
        component={homeContainer}
        options={{
            tabBarLabel: "",
            tabBarIcon: () => (
              <MaterialCommunityIcons name="home" color='#fff' size={24} />
            ),
          }}
      />
        <Tab.Screen 
          name="dailyBetsContainer"
          component={dailyBetsContainer}
          options={{
              tabBarLabel: "",
              tabBarIcon: () => (
                <MaterialCommunityIcons name="calendar" color='#fff' size={24} />
              ),
            }}
        />
        <Tab.Screen 
          name="betsContainer"
          component={betsContainer}
          options={{
              tabBarLabel: "",
              tabBarIcon: () => (
                <MaterialCommunityIcons name="format-list-bulleted" color='#fff' size={24} />
              ),
            }}
        />
        <Tab.Screen 
          name="statsContainer"
          component={statsContainer}
          options={{
              tabBarLabel: "",
              tabBarIcon: () => (
                <MaterialCommunityIcons name="chart-bell-curve-cumulative" color='#fff' size={24} />
              ),
            }}
        />
        <Tab.Screen 
          name="profileContainer"
          component={profileContainer}
          options={{
              tabBarLabel: "",
              tabBarIcon: () => (
                <MaterialCommunityIcons name="account" color='#fff' size={24} />
              ),
            }}
        />
    </Tab.Navigator>
  )
}

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="loginContainer" component={loginContainer} options={{headerShown: false}} />
          <Stack.Screen name="home" component={Home}  options={{headerShown: false}} />
          <Stack.Screen name="singleBetContainer" component={singleBetContainer}  options={{headerShown: false}} />
          <Stack.Screen name="addNewBetContainer" component={addNewBetContainer}  options={{headerShown: false}} />
          <Stack.Screen name="createNewAccountContainer" component={createNewAccountContainer}  options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
