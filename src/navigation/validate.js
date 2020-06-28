import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from './../Containers';

const Stack = createStackNavigator();

function ValidationNavigator() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="HelpLine" component={Screens.HelpLine} />
          <Stack.Screen name="FirstScreen" component={Screens.FirstScreen} />
          <Stack.Screen name="Signup" component={Screens.Signup} />
          <Stack.Screen name="Login" component={Screens.Login} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default ValidationNavigator;
