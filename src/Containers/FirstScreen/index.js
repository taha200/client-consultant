import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Button} from 'galio-framework';
import {useNavigation} from '@react-navigation/native';

export default function FirstScreen() {
  const navigation = useNavigation();
  return (
    <View
      style={{flex: 2, flexDirection: 'column', backgroundColor: '#0085D0'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.image_cont}>
          <Image
            style={{width:300, height: 105}}
            source={require('./../../Assets/logo.png')}
          />
          {/* <Text>Logo</Text> */}
        </View>
        <ImageBackground
          source={require('./../../Assets/bg_curve.png')}
          style={{padding: 20, flex: 1}}>
          <View
            style={{
              marginTop: 70,
              flex: 1,
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Button
                  round
                  size="small"
                  onPress={() => navigation.navigate('Signup')}
                  style={{backgroundColor: '#B4D143', marginTop: 20}}>
                  SIGN UP
                </Button>
              </View>
              <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.touchable_text}>
                    Already have an Account? Signin.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image_cont: {
    height: 370,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable_text: {
    color: '#fff',
    fontSize: 17,
    padding: 5,
    fontWeight: '500',
    textAlign: 'center',
  },
  footer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
