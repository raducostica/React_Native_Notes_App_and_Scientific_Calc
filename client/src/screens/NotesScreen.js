import React from "react";
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from "react-native";

const cols = 2;
const marginHorizontal = 5;
const marginVertical = 7;
const width = Dimensions.get("window").width / cols - marginHorizontal * cols;

const NotesScreen = () => {
  return (
    <SafeAreaView style={styles.mainView}>
      <View>Hello</View>
      <View>Hello</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default NotesScreen;
