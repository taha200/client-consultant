import React from 'react';
import Spinner from './../../Components/spinner';
import {useNavigation} from '@react-navigation/native';

export default function VerificationScreen() {
  const navigation = useNavigation();
  const [user, setUser] = React.useState(false);
  if (user === null) {
    return <Spinner />;
  }
  if (user === false) {
    navigation.replace('FirstScreen');
    return <Spinner />;
  }
  if (user === true) {
    navigation.replace('Dashboard');
    return <Spinner />;
  }
}
