import React from 'react';
import {Modal, StyleSheet, View, ActivityIndicator} from 'react-native';
import Spinner from './spinner';
const ModalSpinner = props => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
    //   visible={true}
      onRequestClose={() => {
        null
      }}>
      <View style={[styles.centeredView]}>
        <View style={styles.modalView}>
        <ActivityIndicator size="large" color="#B4D143" />
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

export default ModalSpinner;
