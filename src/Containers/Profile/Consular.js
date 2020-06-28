import React from 'react';

import {View, Text} from 'react-native';
import {Input, Button} from 'galio-framework';
import {useNavigation} from '@react-navigation/native';

export default function ProfileConsular() {
  const navigation = useNavigation()
  return (
    <View
      style={{
        margin: 20,
        marginTop: 35,
        alignItems: 'center',
        flex: 1,
        width: '100%',
      }}>
      <Input placeholder="Name" rounded />
      <Input placeholder="Sur Name" rounded />
      <Input
        placeholder="Description"
        rounded
        multiline={true}
        numberOfLines={4}
        style={{height: 'auto'}}
      />
      <Button
        round
        style={{backgroundColor: '#B4D143', marginTop: 20, width: '100%'}}
        onPress={() => navigation.navigate("Dashboard")}
        >
        Save Changes
      </Button>

      <Button
        round
        onPress={() => navigation.navigate("ConsultantReview")}
        style={{backgroundColor: '#0085D0', marginTop: 20, width: '100%'}}>
        My Reviews
      </Button>
    </View>
  );
}
