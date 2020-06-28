import React from 'react';

import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from './../../Components/header';
import {Button, Text} from 'galio-framework';
import {useNavigation} from '@react-navigation/native';
import firebase from 'react-native-firebase';
import Constants from './../../Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {useSocket} from 'use-socketio';

function Item({item, currentUser}) {
  const navigation = useNavigation();
  // console.log(item, 'ji Item des');
  let [otherUser, setOtherUser] = React.useState(
    item.client._id === currentUser ? item.counsalor : item.client,
  );
  const {socket} = useSocket();

  React.useEffect(() => {
    socket.on('user' + otherUser._id, data => {
      console.log(data);
      setOtherUser(data);
    });
  }, []);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ChatRoom', {chatroom_id: item._id})}>
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
        <Image
          style={styles.avatar}
          source={{
            uri: otherUser.avatar
              ? otherUser.avatar
              : 'https://bootdey.com/img/Content/avatar/avatar6.png',
          }}
        />
      </View>
      <View
        style={{
          flex: 3,
          padding: 5,
          flexDirection: 'row',
        }}>
        <View style={{flex: 3, flexDirection: 'row'}}>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <Text h5 style={{color: '#696969'}}>
              {otherUser.user_name}
            </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <Text style={{color: '#696969', textAlign: 'center'}}>
                {otherUser.status}
                {/* online */}
              </Text>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  margin: 5,
                  backgroundColor: '#696969',
                  borderRadius: 7,
                }}
              />
              <View
                style={{
                  width: 15,
                  height: 15,
                  margin: 5,
                  borderRadius: 7,
                  backgroundColor:
                    otherUser.status === 'Online'
                      ? '#B4D143'
                      : otherUser.status === 'In Session'
                      ? 'red'
                      : '#696969',
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Dashboard() {
  const navigation = useNavigation();
  const [user, setUser] = React.useState(null);
  const [chatRoom, setChatRoom] = React.useState([]);
  const {socket} = useSocket();
  async function removeUser() {
    try {
      await AsyncStorage.removeItem('@user');
      firebase.auth().signOut();
    } catch (e) {
      // saving error
      console.log(e);
    }
  }
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      saveToAsyncStorage();
    });
    if (user) {
      socket.on('get_rooms' + user._id, chatRooms => {
        console.log('room socket', chatRooms);
        setChatRoom(
          chatRooms.sort(
            (a, b) =>
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
          ),
        );
      });
      socket.on('userBlocked' + '5e85cb2fb33280212cc6959e', data => {
        console.log(data);
        // setOtherUser(data);
        removeUser();
      });
    }
  }, []);

  console.log(user, 'userDtat desu');
  return (
    <View style={{flex: 1}}>
      <Header title="Chats" back_btn={false} drawer_btn={true} />

      {chatRoom.length === 0 ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text h5 style={{color: '#696969'}}>
            No Chats
          </Text>
        </View>
      ) : (
        <FlatList
          data={chatRoom}
          renderItem={({item}) => <Item item={item} currentUser={user._id} />}
          keyExtractor={item => item._id}
        />
      )}
      <Button
        onlyIcon
        icon="chat"
        iconFamily="MaterialCommunityIcons"
        iconSize={25}
        color="warning"
        iconColor="#fff"
        rounded
        radius={30}
        style={styles.fab}
        onPress={() => navigation.navigate('ConsultantList')}>
        <Text>warning</Text>
      </Button>
    </View>
  );
  async function saveToAsyncStorage() {
    try {
      const value = await AsyncStorage.getItem('@user');
      let fcmToken = await AsyncStorage.getItem('fcmToken');

      if (value == null) {
        // value previously stored
        axios
          .get(Constants.url + '/user/get_user', {
            params: {
              firebase_id: firebase.auth().currentUser.uid,
              user_type: 'Client',
            },
          })
          .then(async user => {
            // console.log(user.data, 'desu');
            try {
              let userData = JSON.stringify(user.data);
              // console.log('localStorage', userData);
              // if(fcmToken !== user.data.notification_key) {
              //   axios.post(Constants.url + "/update_user", {...user.data, })
              // }
              console.log('ok', user.data);
              if (user.data.survey === false) {
                navigation.replace('Quiz', {_id: user.data._id});
                return;
              }
              await AsyncStorage.setItem('@user', userData);
              saveToAsyncStorage();
            } catch (e) {
              // saving error
              console.log('reeerrrr', e.message);
            }
          });
      } else {
        try {
          let user = await AsyncStorage.getItem('@user');
          let fin = JSON.parse(user);
          // console.log(fin, 'hi user data');
          console.log('ok');
          if (fin.survey === false) {
            console.log('ok');
            navigation.replace('Quiz', {_id: fin._id});
            return;
          }
          setUser(fin);
          // socket.emit('get_rooms' + fin._id);
          axios
            .get(Constants.url + '/chat/get_my_rooms', {
              params: {
                _id: fin._id,
              },
            })
            .then(data => {
              // console.log(data.data);
              setChatRoom(data.data);
            })
            .catch(err => console.log(err.message));
        } catch (e) {
          // read error
          console.log('userData', e.message);
        }
      }
    } catch (e) {
      // error reading value
    }
  }
}

const styles = StyleSheet.create({
  fab: {
    width: 60,
    height: 60,
    backgroundColor: '#0085D0',
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  card: {
    height: 100,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#C9C9C9',
  },
  avatar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});
