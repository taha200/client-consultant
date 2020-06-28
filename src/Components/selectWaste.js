<View
  style={{
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 35,
  }}>
  <Picker
    selectedValue={'java'}
    style={{
      height: 50,
      width: '100%',
      color: '#C9C9D7',
      marginLeft: 10,
      fontSize: 10,
    }}
    itemStyle={{fontSize: 6, marginLeft: 20}}
    onValueChange={(itemValue, itemIndex) => console.log(itemValue)}>
    <Picker.Item label="Java" value="java" />
    <Picker.Item label="JavaScript" value="js" />
  </Picker>
</View>;
