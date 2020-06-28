import React from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import SignupForm from './Signup';
import { useNavigation } from '@react-navigation/native';
export default function Signup() {
  const navigation = useNavigation();

  return (
    <View style={{backgroundColor: '#0085D0', flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={styles.imageCont}>
          <Image
            style={{width: 300, height: 105}}
            source={require('./../../Assets/logo.png')}
          />
          {/* <Text>Logo</Text> */}
          
        </View>
        <SignupForm />
        <View
          style={styles.footer}>
          <View style={{flex: 1, padding: 10}}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={styles.touchable_link}>
                Already have an account Sign In.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  touchable_link: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 13,
  },
  footer: {
    width: '100%',
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#0085D0',
    alignItems: 'center',
    textAlign: 'center',
  },
  imageCont: {
    height: 250,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});