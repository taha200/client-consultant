import React from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {useSocket} from 'use-socketio';
import {TouchableOpacity, View, Platform} from 'react-native';

import {Icon} from 'galio-framework';
import styles from './chatStyle';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import firebase from 'react-native-firebase';
import Constants from './../../Constants';
import {useNavigation} from '@react-navigation/native';

class ChatBubble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unRead:
        this.props.currentMessage.status !== 'Recieved' &&
        this.props.currentMessage.user._id === this.props.currentUser,
    };
  }

  componentDidMount() {
    if (
      this.props.currentMessage.status !== 'Recieved' &&
      this.props.currentMessage.user._id !== this.props.currentUser
    ) {
      this.props.socket.emit('messageRead', this.props.currentMessage._id);
    }
  }
  render() {
    console.log(
      this.props.currentMessage.status,
      this.props.currentMessage.text,
      'booooo/ooo',
    );
    return (
      <Bubble
        {...this.props}
        textStyle={{
          right: {
            fontWeight: this.state.unRead ? '700' : '500',
          },
        }}
      />
    );
  }
}

export default function Chat(props) {
  const [messages, setMessages] = React.useState([]);
  const navigation = useNavigation();
  const {socket} = useSocket();

  React.useEffect(() => {
    if (props.roomData._id) {
      socket.emit(
        'join',
        {room: props.roomData._id, name: props.roomData.client._id},
        error => {
          if (error) {
            alert(error);
          }
        },
      );
      socket.on('message', message => {
        // setMessages([...messages, message]);
        newMessage(message);
        // console.log('incoming msg');
      });
      socket.on('messageRead', id => {
        // console.log('recieved +++++++++++++++++++++++++++++++++++++++=');
        updateMessage(id);
      });
      axios
        .get(Constants.url + '/chat/chat_data', {
          params: {
            chatroom_id: props.roomData._id,
          },
        })
        .then(data => {
          // console.log('+++++++++++++++==', data.data);
          setMessages(GiftedChat.append([], data.data));
        })
        .catch(err => console.log(err.message, 'get_room_data'));

      return () => {
        socket.emit('disconnect');
        socket.off();
      };
    }
  }, []);
  const newMessage = React.useCallback(newMessages => {
    setMessages(prevMessages => [newMessages, ...prevMessages]);
  }, []);
  const updateMessage = React.useCallback(id => {
    let arr = messages;
    messages.map((v, i) => {
      console.log('desu', id, v._id);
      if (v._id === id) {
        arr[i].status = 'Recieved';
        console.log('desu', id);
        setMessages(GiftedChat.append([], [...arr]));
      }
    });
  }, []);
  function onSend(messageNew = [], images) {
    // console.log('okkosad', messageNew[0]);
    let fin = messageNew[0];
    // console.log('condition', fin.chatroom_id, props.roomData._id);
    socket.emit('sendMessage', {
      text: fin.text,
      user: props.roomData.currentUser,
      image: fin.image,
      // createdAt: fin.createdAt,
      chatroom_id: props.roomData._id,
    });
    axios.get(Constants.url + '/send_notification', {
      params: {
        title: props.roomData.client.user_name,
        body: fin.text,
        token: props.roomData.counsalor.notification_key,
      },
    });
  }

  async function onFirstMsg(messageNew = [], images) {
    let fin = messageNew[0];

    axios
      .post(Constants.url + '/chat/add_chatroom', {
        client: props.roomData.client._id,
        counsalor: props.roomData.counsalor._id,
      })
      .then(data => {
        socket.emit(
          'join',
          {room: data.data._id, name: props.roomData.client._id},
          error => {
            if (error) {
              alert(error);
            }
          },
        );
        socket.emit('sendMessage', {
          text: fin.text,
          user: props.roomData.currentUser,
          image: fin.image,
          chatroom_id: data.data._id,
        });
        // }
        axios.get(Constants.url + '/send_notification', {
          params: {
            title: props.roomData.client.user_name,
            body: fin.text,
            token: props.roomData.counsalor.notification_key,
          },
        });
        navigation.replace('ChatRoom', {chatroom_id: data.data._id});
      });
  }
  function selectImage() {
    let arr = [];
    let storage = firebase.storage();
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      images.map((v, i) => {
        let storageRef = storage.ref(`chat/` + (+new Date() + i));
        // console.log(v)
        // return
        let task = storageRef.putFile(
          Platform.OS === 'android' ? v.path : v.path.replace('file://', ''),
        );
        task.on(
          'state_changed',
          function(snapshot) {
            let progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log(progress);
                break;
              default:
                return;
            }
          },
          function(error) {
            alert(error.message);
          },
          () => {
            storageRef.getDownloadURL().then(downloadURL => {
              arr.push({path: downloadURL});
              if (arr.length === images.length) {
                onSend([
                  {
                    text: '',
                    createdAt: new Date(),
                    image: downloadURL,
                    user: props.roomData.currentUser,
                  },
                ]);
              }
            });
            console.log(images);
          },
        );
      });
    });
  }

  // console.log('rerender?', props.roomData.currentUser);
  return (
    <View style={styles.mainContainer}>
      <GiftedChat
        renderBubble={e => (
          <ChatBubble
            {...e}
            currentUser={props.roomData.currentUser}
            socket={socket}
          />
        )}
        // shouldUpdateMessage={(props, nextProps) => {
        //   console.log(
        //     props.currentMessage.text,
        //     props.currentMessage.status,
        //     nextProps.currentMessage.status,
        //   );
        //   return (
        //     props.currentMessage.status !== 'Recieved' &&
        //     nextProps.currentMessage.status === 'Recieved'
        //   );
        // }}
        messages={messages}
        onSend={messages =>
          props.roomData._id ? onSend(messages) : onFirstMsg(messages)
        }
        extraData={messages}
        user={{_id: props.roomData.currentUser}}
        renderActions={() => (
          <TouchableOpacity onPress={() => selectImage()}>
            <Icon
              style={styles.icon}
              name="image"
              family="MaterialIcons"
              size={26}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
