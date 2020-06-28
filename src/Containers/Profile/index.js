import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import ProfilePatient from './Patient';
import useForm from './../../Components/useForm';
import Spinner from './../../Components/spinner';
import Constants from './../../Constants';
import axios from 'axios';
import firebase from 'react-native-firebase';
import {validation, defaultValues} from './validate';

export default function Profile() {
  const {errors, handleSubmit, handleChange, values, setValues} = useForm(
    submit,
    validation,
    defaultValues,
  );
  React.useEffect(() => {
    axios
      .get(Constants.url + '/user/get_user', {
        params: {
          firebase_id: firebase.auth().currentUser.uid,
          user_type: 'Client',
        },
      })
      .then(user => {
        setValues(user.data);
        // console.log(user.data, 'desu');
      });
  }, []);

  function submit() {
    console.log(values);
    axios
      .post(Constants.url + '/user/update_user', {
        ...values,
      })
      .then(data => {
        alert('Profile Updated');
        setValues(data.data);
      });
  }

  if (!values._id) {
    return (
     <Spinner/>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.header} />
          <Image
            style={styles.avatar}
            source={{
              uri: !values.avatar
                ? 'https://bootdey.com/img/Content/avatar/avatar6.png'
                : values.avatar,
            }}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <ProfilePatient
                values={values}
                handleChange={handleChange}
                errors={errors}
                handleSubmit={handleSubmit}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0085D0',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 30,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  cont: {padding: 20, alignItems: 'center', backgroundColor: '#fff'},
  button_group_text: {
    paddingTop: 12,
    paddingBottom: 12,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
});
