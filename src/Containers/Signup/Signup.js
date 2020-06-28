import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Input, Button, Text} from 'galio-framework';
import {useNavigation} from '@react-navigation/native';
import {validation, defaultValues} from './validate';
import useForm from './../../Components/useForm';
import Constants from './../../Constants';
import axios from 'axios';
import firebase from 'react-native-firebase';
import ModalSpinner from './../../Components/modalSpinner';
export default function SignupForm() {
  let [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const {errors, handleSubmit, handleChange, values, setValues} = useForm(
    submit,
    validation,
    defaultValues,
  );

  function submit() {
    setLoading(true);
    // console.log('values', values);
    // navigation.replace("Quiz");
    axios
      .get(Constants.url + '/user/check_if_exists', {
        param: {email: values.email, user_name: values.user_name},
      })
      .then(user => {
        console.log(user.data);
        if (user.data === null) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(user => {
              console.log('signup', user.user.uid);
              axios
                .post(Constants.url + '/user/add_user', {
                  ...values,
                  firebase_id: user.user.uid,
                  user_type: 'Client',
                })
                .then(() => {
                  setLoading(false);
                });
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              setLoading(false);
              // ...
              if ((errorCode = 'auth/wrong-password')) {
                alert('Email or Password is Wrong');
              } else {
                alert(errorCode);
              }
            });
        } else {
          alert('User Name Already Exists!');
        }
      });
  }
  return (
    <View style={styles.cont}>
      <>
        <Input
          placeholder={errors.user_name ? errors.user_name : 'User Name'}
          placeholderTextColor={errors.email ? 'red' : '#0085D0'}
          onChangeText={text => {
            handleChange({target: {name: 'user_name', value: text}});
          }}
          value={values.user_name}
          style={[
            styles.inputStyle,
            {
              borderColor: errors.user_name ? 'red' : '#0085D0',
            },
          ]}
        />

        <Input
          placeholder={errors.email ? errors.email : 'Email'}
          placeholderTextColor={errors.email ? 'red' : '#0085D0'}
          onChangeText={text => {
            handleChange({target: {name: 'email', value: text}});
          }}
          value={values.email}
          style={[
            styles.inputStyle,
            {
              borderColor: errors.email ? 'red' : '#0085D0',
            },
          ]}
        />

        <Input
          placeholder={errors.password ? errors.password : 'Password'}
          placeholderTextColor={errors.password ? 'red' : '#0085D0'}
          onChangeText={text => {
            handleChange({target: {name: 'password', value: text}});
          }}
          value={values.password}
          style={[
            styles.inputStyle,
            {
              borderColor: errors.password ? 'red' : '#0085D0',
            },
          ]}
          password={true}
        />
      </>

      <KeyboardAvoidingView>
        <Button
          size="small"
          round
          style={{backgroundColor: '#B4D143', marginTop: 10}}
          onPress={handleSubmit}>
          SIGN UP
        </Button>
      </KeyboardAvoidingView>

      {loading && <ModalSpinner />}
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {padding: 40, alignItems: 'center', backgroundColor: '#fff'},

  inputStyle: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
  },
});
