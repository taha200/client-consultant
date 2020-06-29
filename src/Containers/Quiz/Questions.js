import React from 'react';

import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Button} from 'galio-framework';
import {useNavigation} from '@react-navigation/native';
import Constants from '../../Constants';
import axios from 'axios';
export default function Questions(props) {
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const [anwser, setAnswer] = React.useState([]);

  function handleQuizChange(question, selected, option, i) {
    if (props.data.length - 1 === i) {
      anwser.push({
        anwser: option,
        option: 'option' + (selected + 1),
        question,
        user: props._id,
      });
      setAnswer(anwser);

      axios.post(Constants.url + '/quiz/submit_anwsers', {anwser}).then(data => {
        navigation.replace('Dashboard');
      }).catch(err=>alert(err));
    } else {
      setIndex(i + 1);
      anwser.push({
        anwser: option,
        option: 'option' + (selected + 1),
        question,
        user: props._id,
      });
      setAnswer(anwser);
      axios.post(Constants.url + '/quiz/submit_anwsers', {anwser}).then(data => {
        navigation.replace('Dashboard');
      }).catch(err=>alert(err));
    }
  }
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View style={[styles.header_text_cont]}>
          <Text h3 style={[styles.header_text]}>
            Welcome to PHSC wellness, your mental health companion
          </Text>
        </View>
        <View
          style={[
            styles.header_text_cont,
            {paddingLeft: 50, paddingRight: 50},
          ]}>
          <Text h5 style={[styles.header_text]}>
            Help us match you to the right counselor.
          </Text>
        </View>
      </View>

      {props.data.map((v, i) => {
        if (i === index) {
          return (
            <View style={styles.body}>
              <View style={[styles.body_text_cont]}>
                <Text h5 style={[styles.qusetion_text]}>
                  {v.question}
                </Text>
              </View>
              <View style={[styles.body_text_cont]}>
                {[v.option1, v.option2, v.option3, v.option4].map(
                  (option, int) => {
                    if (option !== '') {
                      return (
                        <TouchableOpacity
                          key={int}
                          style={styles.answer_btn}
                          onPress={() =>
                            handleQuizChange(v._id, int, option, i)
                          }>
                          <Text style={styles.answer_btn_text}>{option}</Text>
                        </TouchableOpacity>
                      );
                    }
                  },
                )}
              </View>
            </View>
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0085D0',
    flex: 1,
    height: 160,
  },
  body: {
    flex: 2,
    alignItems: 'flex-start',
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
  },
  header_text_cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_text: {
    color: '#fff',
    textAlign: 'center',
  },
  body_text_cont: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  qusetion_text: {
    color: '#696969',
  },
  answer_btn: {
    backgroundColor: '#B4D143',
    marginTop: 10,
    width: '100%',
    textAlign: 'left',
    borderRadius: 5,
  },
  answer_btn_text: {
    padding: 12,
    color: '#fff',
    fontSize: 18,
  },
});
