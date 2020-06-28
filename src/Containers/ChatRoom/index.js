import React from 'react';

import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import Header from './../../Components/header';
import Chat from './chats';
import {Icon} from 'galio-framework';
import RatingModal from './ratingModal';
import axios from 'axios';
import Constants from './../../Constants';
import Spinner from './../../Components/spinner';

import {SocketIOProvider, useSocket} from 'use-socketio';
import AsyncStorage from '@react-native-community/async-storage';

export default function ChatRoom({navigation, route}) {
  const [showModal, setShowModal] = React.useState(false);

  const [roomData, setRoomData] = React.useState(null);
  const [otherUser, setOtherUser] = React.useState(null);

  const {socket} = useSocket();

  React.useEffect(() => {
    getRoomData();
    // BackHandler.addEventListener('hardwareBackPress', () =>
    //   navigation.navigate('Dashboard'),
    // );
    // return () => BackHandler.removeEventListener('hardwareBackPress');
  }, []);
  // console.log('chatRoom', route.params?.counsalor_id);
  console.log("room Data",roomData, )

  if (roomData === null) {
    return <Spinner />;
  } else {
    return (
      <View style={{flex: 1}}>
        <Header
          title={otherUser && otherUser.user_name}
          back_btn={true}
          back_btn_func={() => navigation.navigate('Dashboard')}
        />
    {
      roomData._id &&     <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            width: '100%',
            padding: 5,
            backgroundColor: '#B4D143',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="star"
            family="MaterialIcons"
            size={25}
            style={{color: '#fff'}}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#fff',
            }}>
            Rate Consular
          </Text>
        </TouchableOpacity>

    }
        <Chat
          counsalor_id={route.params?.counsalor_id}
          roomData={roomData}
          chatRoomUpdate={(e) => {
            let obj = {...roomData, _id: e};
            setRoomData(obj)
            // console.log("shimata")
            // getRoomData()
            return obj
          }}
        />

        {showModal && <RatingModal onClose={() => setShowModal(false)} counsalor={roomData.counsalor._id} client={roomData.client._id}/>}
      </View>
    );
  }
  async function getRoomData() {
    console.log("lol")
    try {
      const value = await AsyncStorage.getItem('@user');
      if (value !== null) {
        let userData = JSON.parse(value);
        if (!route.params?.counsalor_id) {
          axios
            .get(Constants.url + '/chat/get_room_by_id', {
              params: {
                _id: route.params?.chatroom_id,
              },
            })
            .then((data) => {
              // console.log(data.data);
              // socket.emit('enter_chat_room', data.data._id);

              setRoomData({...data.data, currentUser: userData._id});
              setOtherUser(
                data.data.client._id === userData._id
                  ? data.data.counsalor
                  : data.data.client,
              );
            })
            .catch((err) => console.log(err.message));
        } else {
          axios
            .get(Constants.url + '/chat/get_room_data', {
              params: {
                counsalor: route.params?.counsalor_id,
                client: userData._id,
              },
            })
            .then((data) => {
              // console.log(data.data);
              setRoomData({...data.data, currentUser: userData._id});
              setOtherUser(
                data.data.client._id === userData._id
                  ? data.data.counsalor
                  : data.data.client,
              );
            })
            .catch((err) => console.log(err.message, 'get_room_data'));
        }
      }
    } catch (e) {
      // saving error
      console.log(e.message);
    }
  }
}
