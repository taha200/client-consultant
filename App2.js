import React from 'react';
import {StatusBar, View} from 'react-native';
import Navigation from './src/navigation';
import ValidationNavigator from './src/navigation/validate';
import Spinner from './src/Components/spinner';
import firebase from 'react-native-firebase';
import {SocketIOProvider} from 'use-socketio';
import Constants from './src/Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default function App() {
  const [user, setUser] = React.useState(false);
  React.useEffect(() => {
    // SplashScreen.hide();
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        fetchData();
      } else {
        setUser(user);
      }
    });
  }, []);

  if (user === false) {
    return <Spinner />;
  }
  if (user === null) {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />

        <ValidationNavigator />
      </View>
    );
  }
  if (user) {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />
        <SocketIOProvider
          url={Constants.url}
          opts={{
            query: {
              userId: user._id,
            },
          }}>
          <Navigation />
        </SocketIOProvider>
      </View>
    );
  }
  async function fetchData() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    // console.log(fcmToken)
    axios
      .get(Constants.url + '/user/get_user', {
        params: {
          firebase_id: firebase.auth().currentUser.uid,
          user_type: 'Client',
        },
      })
      .then(user => {
        console.log(user.data, 'desu');
        if (user.data) {
          if (user.data.acc_status !== 'Blocked') {
            setUser(user.data);
            if (fcmToken !== user.data.notification_key) {
              // user has a device token
              axios
                .post(Constants.url + '/user/update_user', {
                  ...user.data,
                  notification_key: fcmToken,
                })
                .then(data => {
                  console.log('fcmToken: Updated', fcmToken, data.data);
                });
            }
          } else {
            if (firebase.auth().currentUser) {
              firebase.auth().signOut();
            }
            setUser(null);
            alert(
              'Your account has been blocked for further inquiry constact: \n antonyfriday@gmail.com',
            );
          }
        } else {
          if (firebase.auth().currentUser) {
            firebase.auth().signOut();
          }

          alert('User does not exists as a Client.');
        }
      })
      .catch(err => console.log(err));
  }
}
