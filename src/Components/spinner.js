import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Spinner() {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator size="large" color="#B4D143" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',backgroundColor: '#fff'
  },
});
