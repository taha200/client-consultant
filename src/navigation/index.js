import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GalioProvider} from 'galio-framework';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Image, Text, View} from 'react-native';
const Drawer = createDrawerNavigator();
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

function CustomDrawerContent(props) {
  async function removeUser() {
    try {
      await AsyncStorage.removeItem('@user');
      firebase.auth().signOut();
    } catch (e) {
      // saving error
      console.log(e)
    }
  }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => (
          <Image
            style={{
              width: 260,
              height: 100,
            }}
            source={require('./../Assets/logo.png')}
          />
        )}
        style={{height: 130, width: '100%'}}
      />
      <DrawerItemList {...props} labelStyle={{fontSize: 25}} />
      <DrawerItem
        label="Sign Out"
        onPress={() => removeUser()}
        labelStyle={{fontSize: 25}}
      />
    </DrawerContentScrollView>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={Screens.Dashboard} />
      <Drawer.Screen name="Profile" component={Screens.Profile} />
    </Drawer.Navigator>
  );
}
// FILES
import {Screens} from '../Containers';
const customTheme = {
  SIZES: {BASE: 18},
  // this will overwrite the Galio SIZES BASE value 16
  COLORS: {PRIMARY: 'red'},
  // this will overwrite the Galio COLORS PRIMARY color #B23AFC
};

const Stack = createStackNavigator();

function Navigation() {
  return (
    <GalioProvider theme={customTheme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Dashboard" component={MyDrawer} />
          <Stack.Screen name="Quiz" component={Screens.Quiz} />
          <Stack.Screen name="Profile" component={Screens.Profile} />
          <Stack.Screen
            name="ConsultantReview"
            component={Screens.ConsultantReview}
          />
          <Stack.Screen
            name="ConsultantList"
            component={Screens.ConsultantList}
          />

          <Stack.Screen name="ChatRoom" component={Screens.ChatRoom} />
        </Stack.Navigator>
      </NavigationContainer>
    </GalioProvider>
  );
}

export default Navigation;
