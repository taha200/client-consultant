import React from 'react';
import {Text, View, Image, ScrollView, StyleSheet} from 'react-native';
import LoginForm from './Login';
export default function Login() {
  return (
    <View
      style={{flex: 1, flexDirection: 'column', backgroundColor: '#0085D0'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.image_cont}>
          <Image
            style={{width: 300, height: 105}}
            source={require('./../../Assets/logo.png')}
          />
          {/* <Text>Logo</Text> */}
        </View>
        <LoginForm />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image_cont: {
    height: 350,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
