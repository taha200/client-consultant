import React from 'react';
import {View} from 'react-native';
import {Input, Button} from 'galio-framework';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';
import ModalSpinner from './../../Components/modalSpinner';

export default function ProfilePatient(props) {
  const {values, handleChange, errors, handleSubmit} = props;
  let [loading, setLoading] = React.useState(false);

  function selectImage() {
    let storage = firebase.storage();
    ImagePicker.openPicker({}).then((images) => {
      setLoading(true);
      let storageRef = storage.ref(`profile/` + +new Date());
      let task = storageRef.putFile(
        Platform.OS === 'android'
          ? images.path
          : images.path.replace('file://', ''),
      );
      task.on(
        'state_changed',
        function (snapshot) {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log(progress);
              break;
            default:
              return;
          }
        },
        function (error) {
          alert(error.message);
        },
        () => {
          storageRef.getDownloadURL().then((downloadURL) => {
            handleChange({target: {name: 'avatar', value: downloadURL}});
            handleSubmit();
            setLoading(false)
  
          });
        },
      );
    });
  }
  return (
    <View
      style={{
        margin: 20,
        marginTop: 15,
        alignItems: 'center',
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
      }}>
      <Button
        // round
        size="small"
        style={{backgroundColor: '#0085D0', marginBottom: 20}}
        onPress={() => selectImage()}>
        Update Profile Pic
      </Button>
      <Input
        placeholder={errors.user_name ? errors.user_name : 'User Name'}
        placeholderTextColor={errors.user_name ? 'red' : '#0085D0'}
        //  onChangeText={(text) => {
        //    handleChange({target: {name: 'user_name', value: text}});
        //  }}
        label={'User Name'}
        value={values.user_name}
        style={{
          borderRadius: 0,
          borderWidth: 0,
          borderBottomWidth: 1,
        }}
        editable={false}
      />
      <Button
        round
        size="small"
        style={{backgroundColor: '#B4D143', marginTop: 20}}
        onPress={() => handleSubmit()}>
        Save Changes
      </Button>
      {loading && <ModalSpinner />}
    </View>
  );
}
