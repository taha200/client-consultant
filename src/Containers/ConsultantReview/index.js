import React from 'react';
import Header from './../../Components/header';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Icon} from 'galio-framework';
import StarRating from 'react-native-star-rating';
import {AirbnbRating} from 'react-native-ratings';
import CardView from 'react-native-cardview';
import axios from 'axios';
import Constants from './../../Constants';
import Spinner from './../../Components/spinner';

function Item({item}) {
  let {client, details, rating} = item;
  // console.log(client);
  return (
    <View
      style={{
        borderBottomColor: '#C9C9C9',
        marginBottom: 15,
      }}>
      <View
        style={{
          flex: 3,
          flexDirection: 'column',
        }}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 15, fontWeight: '600', color: '#0085D0'}}>
            {client.user_name}
          </Text>
        </View>
        <View style={{flex: 1, paddingTop: 2}}>
          <StarRating
            disabled={true}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={rating}
            fullStarColor={'gold'}
            containerStyle={{width: 100}}
            starSize={20}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={[styles.description, {textAlign: 'left', marginTop: 2}]}>
            {details}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function ConsultantReview({navigation, route}) {
  // console.log(props);
  // const navigation = useNavigation();
  const [reviews, setReviews] = React.useState(null);
  const [aveReview, setAveReview] = React.useState(0);

  const [consular, setConsular] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(Constants.url + '/user/get_consalor_by_id', {
        params: {
          _id: route.params?._id,
        },
      })
      .then((data) => {
        // console.log(data.data);

        setConsular(data.data);
      })
      .catch((err) => console.log(err.message));

    axios
      .get(Constants.url + '/user/get_reviews', {
        params: {
          counsalor: route.params?._id,
        },
      })
      .then((data) => {
        // console.log(data.data);
        let aveReview = 0;
        data.data.map((v) => {
          aveReview += v.rating;
        });
        aveReview = aveReview / data.data.length;
        console.log(aveReview, "rating++++++++=", data.data.length)
        setReviews(data.data);
        setAveReview(aveReview);
      });
  }, []);

  if (consular === null || reviews === null) {
    return <Spinner />;
  } else {
    console.log(aveReview)
    return (
      <>
        <Header
          title="Counselor"
          back_btn={true}
          back_btn_func={() => navigation.goBack()}
          drawer_btn={false}
        />
        <ScrollView
          contentContainerStyle={{flexGrow: 1, backgroundColor: '#fff'}}>
          {/* <View style={styles.header}></View> */}
          <CardView
            cardElevation={5}
            cardMaxElevation={2}
            cornerRadius={5}
            style={{margin: 20, padding: 0, backgroundColor: '#0085D0'}}>
            <View style={styles.body}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: '#0085D0',
                  justifyContent: 'center',
                  marginTop: -20,
                  paddingBottom: 20,
                }}>
                <Image
                  style={[styles.avatar]}
                  source={{
                    uri: consular.avatar
                      ? consular.avatar
                      : 'https://bootdey.com/img/Content/avatar/avatar6.png',
                  }}
                />
              </View>
              <View
                style={
                  (styles.bodyContent, {backgroundColor: '#fff', padding: 10})
                }>
                <View style={{flexDirection: 'column'}}>
                  <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
                    <AirbnbRating
                      count={5}
                      reviews={[
                        'Terrible',
                        'Bad',
                        'Average',
                        'Good',
                        'Very Good',
                      ]}
                      defaultRating={aveReview}
                      size={30}
                      isDisabled={true}
                    />
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <View style={{flex: 1}}>
                      <View style={{flex: 1}}>
                        <View>
                          <Text style={[styles.name, {textAlign: 'center'}]}>
                            {consular.user_name}
                          </Text>
                          <Text style={{color: '#696969', textAlign: 'center'}}>
                            {consular.email}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <Text style={styles.description}>{consular.description}</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ChatRoom', {
                        counsalor_id: route.params?._id,
                      })
                    }
                    style={{
                      width: '100%',
                      borderRadius: 30,
                      padding: 15,
                      backgroundColor: '#B4D143',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="chat"
                      family="MaterialIcons"
                      size={25}
                      style={{color: '#fff'}}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#fff',
                      }}>
                      Start Chat
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </CardView>
          <View style={{margin: 20}}>
            <View style={{marginTop: 0}}>
              <Text style={[styles.name, {textAlign: 'center'}]}>
                {reviews.length === 0 && 'No'} Reviews
              </Text>
            </View>
            <View style={{width: '100%', flexDirection: 'column'}}>
              {reviews.map((v, i) => (
                <Item item={v} key={i} />
              ))}
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    color: '#0085D0',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#696969',
  },
  header: {
    backgroundColor: '#0085D0',
    height: 150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    // marginBottom: 10,
    // alignSelf: 'center',
    // position: 'absolute',
    // marginTop: 80,
  },
  name: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    // alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  cont: {padding: 20, alignItems: 'center', backgroundColor: '#fff'},
  button_group_text: {
    paddingTop: 12,
    paddingBottom: 12,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
});
