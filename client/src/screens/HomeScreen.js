import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        title="Calculator"
        onPress={() => {
          navigation.navigate("Calculator");
        }}
      >
        <Text>Calculator</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
