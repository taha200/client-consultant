import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'galio-framework';
import {Icon} from 'galio-framework';
import {useNavigation} from '@react-navigation/native';
export default function Header({title, back_btn, back_btn_func, drawer_btn}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: 8,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#C9C9C9',
      }}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            {back_btn && (
              <TouchableOpacity
                style={{padding: 5}}
                onPress={() => back_btn_func()}>
                <Icon
                  name="chevron-left"
                  family="Entypo"
                  size={30}
                  style={{color: '#0085D0'}}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <Text h5 style={{color: '#0085D0', fontWeight: 'bold'}}>
          {title}
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
        {drawer_btn ? (
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => navigation.openDrawer()}>
            <Icon
              name="menu"
              family="Entypo"
              size={30}
              style={{color: '#0085D0'}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{padding: 5}}>
            <Icon
              name="menu"
              family="Entypo"
              size={30}
              style={{color: '#fff'}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
