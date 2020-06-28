import React from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import axios from 'axios';
import Constants from './../../Constants';

import {Input} from 'galio-framework';
const RatingModal = (props) => {
  const [data, setData] = React.useState({
    rating: 5,
    details: '',
    counsalor: props.counsalor,
    client: props.client,
  });
  function handleChange(e, name) {
    setData({...data, [name]: e});
  }
  function onSubmit() {
    let {rating, details, counsalor, client} = data;

    if (details !== '') {
      console.log(counsalor, client)
      axios.post(Constants.url + '/user/add_review', data).then(() => {
        props.onClose();
      });
    }
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.onClose(false);
      }}>
      <View style={[styles.centeredView]}>
        <View style={styles.modalView}>
          <AirbnbRating
            count={5}
            reviews={['Terrible', 'Bad', 'Average', 'Good', 'Very Good']}
            defaultRating={5}
            onFinishRating={(e) => handleChange(e, 'rating')}
            size={40}
          />
          <Input
            placeholder="Details"
            value={data.details}
            multiline={true}
            numberOfLines={4}
            style={{height: 'auto'}}
            onChangeText={(e) => handleChange(e, 'details')}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => onSubmit()}
              style={{
                padding: 10,
                backgroundColor: '#B4D143',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                width: '49%',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#fff',
                  textAlign: 'center',
                }}>
                Rate
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onClose(false)}
              style={{
                padding: 10,
                backgroundColor: '#0085D0',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                width: '49%',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#fff',
                  textAlign: 'center',
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'column',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default RatingModal;
