import React from 'react';
import {
  // Text,
  View,
  // TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Button} from 'galio-framework';
import Questions from './Questions';
import Constants from './../../Constants';
import axios from 'axios';
export default function Quiz({navigation, route}) {
  const [status, setStatus] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(Constants.url + '/quiz/get_current_quiz')
      .then(quiz => {
        setQuestions(quiz.data);
      })
      .catch(err => console.log(err.message));
  });

  return (
    <View style={{flex: 2, flexDirection: 'column'}}>
      {status ? (
        <ScrollView
          contentContainerStyle={{flexGrow: 1, backgroundColor: '#0085D0'}}>
          <View style={styles.image_cont}>
            <Image
              style={{width: 250, height: 115}}
              source={require('./../../Assets/logo.png')}
            />
            {/* <Text>Logo</Text> */}
          </View>
          <ImageBackground
            source={require('./../../Assets/bg_curve.png')}
            style={{padding: 20, flex: 1}}>
            <View
              style={{
                margin: 20,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
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
                    onPress={() => setStatus(true)}
                    style={{backgroundColor: '#B4D143', marginTop: 20}}>
                    Start Quiz
                  </Button>
                </View>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Questions data={questions} _id={route.params?._id}/>
        </ScrollView>
      )}
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
