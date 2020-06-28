import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Input, Button} from 'galio-framework';
import {useNavigation} from '@react-navigation/native';
import {validation, defaultValues} from './validate';
import useForm from './../../Components/useForm';
import ModalSpinner from './../../Components/modalSpinner';
import firebase from 'react-native-firebase';
export default function LoginForm() {
  let [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const {errors, handleSubmit, handleChange, values} = useForm(
    submit,
    validation,
    defaultValues,
  );
  async function submit() {
    setLoading(true);
    console.log('values', values);
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(user => {
        console.log(user);
        setLoading(false);
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
  }
  return (
    <View style={{padding: 40, alignItems: 'center'}}>
      <Input
        color="#fff"
        placeholder={errors.email ? errors.email : 'Email'}
        placeholderTextColor={errors.email ? 'red' : '#fff'}
        onChangeText={text => {
          handleChange({target: {name: 'email', value: text}});
        }}
        value={values.email}
        style={[
          styles.inputStyle,
          {
            borderColor: errors.email ? 'red' : '#fff',
          },
        ]}
      />
      <Input
        color="#fff"
        placeholder={errors.password ? errors.password : 'Password'}
        placeholderTextColor={errors.password ? 'red' : '#fff'}
        onChangeText={text => {
          handleChange({target: {name: 'password', value: text}});
        }}
        value={values.password}
        style={[
          styles.inputStyle,
          {
            borderColor: errors.password ? 'red' : '#fff',
          },
        ]}
        password={true}
      />
      <Button
        size="small"
        round
        style={{backgroundColor: '#B4D143', marginTop: 10}}
        onPress={handleSubmit}>
        SIGN IN
      </Button>
      <View style={styles.footer}>
        <View style={{flex: 1, padding: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.touchable_text}>
              Don't have an account Sign Up.
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{flex: 1, padding: 10, justifyContent: 'flex-end'}}>
          <Text style={{textAlign: 'right', color: '#fff', fontSize: 13}}>
            Forgot Password?
          </Text>
        </View> */}
      </View>

      {loading && <ModalSpinner />}
    </View>
  );
}

const styles = StyleSheet.create({
  touchable_text: {
    textAlign: 'left',
    color: '#fff',
    fontSize: 13,
    width: '70%',
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#0085D0',
    alignItems: 'flex-end',
    textAlign: 'center',
    marginTop: 20,
  },
  inputStyle: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 2,
    backgroundColor: '#0085D0',
  },
});
