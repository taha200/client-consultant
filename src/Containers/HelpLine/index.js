import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import {Text, Button} from 'galio-framework';
import {useNavigation} from '@react-navigation/native';

export default function HelpLine() {
  const navigation = useNavigation();

  const dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:+263772108108';
    } else {
      phoneNumber = 'telprompt:+263772108108';
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <View style={{flex: 2, flexDirection: 'column', backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.image_cont}>
          <Image
            style={{width: 300, height: 105}}
            source={require('./../../Assets/logo.png')}
          />
          {/* <Text>Logo</Text> */}
        </View>
        <ImageBackground
          source={require('./../../Assets/bg_curve.png')}
          style={{padding: 20, flex: 1}}>
          <View style={{flex: 1}}>
            <View
              style={{
                paddingTop: 50,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center', paddingLeft: 50, paddingRight: 50
              }}>
              <Button
                round
                size="large"
                onPress={() => navigation.navigate('FirstScreen')}
                style={{backgroundColor: '#B4D143', width: "100%"}}>
                TALK TO A COUNSELOR
              </Button>
              <Text h5 style={{color: '#fff'}}>
                OR
              </Text>
              <Button
                round
                size="large"
                onPress={() => dialCall()}
                style={{backgroundColor: '#0085D0',width: "100%"}}>
                SUICIDE HELPLINE
              </Button>
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
