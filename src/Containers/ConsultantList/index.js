import React from 'react';

import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from './../../Components/header';
import {Button, Text} from 'galio-framework';
import {Icon} from 'galio-framework';
import StarRating from 'react-native-star-rating';
import {useNavigation} from '@react-navigation/native';
import Constants from './../../Constants';
import axios from 'axios';
// import RatingModal from '../ChatRoom/ratingModal';

function Item({val}) {
  const navigation = useNavigation();
  // console.log(val);
  const [reviews, setReviews] = React.useState(null);
  axios
    .get(Constants.url + '/user/get_reviews', {
      params: {
        counsalor: val._id,
      },
    })
    .then((data) => {
      // console.log(data.data);

      setReviews(data.data);
    });
  let reviewRating = 0;

  if (reviews !== null) {
    reviews.map((v) => {
      reviewRating += v.rating;
    });
    reviewRating = reviewRating / reviews.length;
    return (
      <View style={styles.card}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            style={styles.avatar}
            source={{
              uri: val.avatar
                ? val.avatar
                : 'https://bootdey.com/img/Content/avatar/avatar6.png',
            }}
          />
        </View>
        <View
          style={{
            flex: 3,
            padding: 5,
            flexDirection: 'row',
          }}>
          <View style={{flex: 3, flexDirection: 'column'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text h5 style={{color: '#696969'}}>
                {val.user_name}
              </Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', paddingTop: 10}}>
              <StarRating
                disabled={false}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={reviews.length === 0 ? 5 : reviewRating}
                fullStarColor={'gold'}
                containerStyle={{width: 120}}
                starSize={25}
              />
            </View>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{padding: 10, width: 'auto'}}
              onPress={() =>
                navigation.navigate('ConsultantReview', {_id: val._id})
              }>
              <Icon
                name="profile"
                family="AntDesign"
                size={30}
                style={{color: '#0085D0'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return <View/>
  }
}

export default function ConsultantList() {
  const navigation = useNavigation();
  const [consultants, setConsultants] = React.useState([]);
  function fetchData() {
    axios
      .get(Constants.url + '/user/get_consalors')
      .then((data) => {
        setConsultants(data.data);
      })
      .catch((err) => console.log(err.message));
    // console.log('ok consulatants', consultants);
  }
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        title="Counselors List"
        back_btn={true}
        back_btn_func={() => navigation.goBack()}
      />

      <FlatList
        data={consultants}
        renderItem={({item}) => <Item val={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: 60,
    height: 60,
    backgroundColor: '#0085D0',
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  card: {
    height: 100,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#C9C9C9',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});
