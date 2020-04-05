import React from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

const window = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <View
        style={{
          alignSelf: "center",
          width: window.width,
          overflow: "hidden",
          height: window.width / 1.7
        }}
      >
        <View
          style={{
            borderRadius: window.width,
            width: window.width * 2,
            height: window.width * 2,
            marginLeft: -(window.width / 2),
            position: "absolute",
            bottom: 0,
            overflow: "hidden",
            backgroundColor: "blue",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "blue"
          }}
        >
          <View
            style={{
              height: window.width / 1.7,
              width: window.width,
              position: "absolute",
              bottom: 0,
              marginLeft: window.width / 2,
              backgroundColor: "#9DD6EB",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name="user" size={70} />
            <Text style={{ paddingVertical: 20, fontSize: 17 }}>@Radz</Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          title="Calculator"
          onPress={() => {
            navigation.navigate("Calculator");
          }}
        >
          <Text>Calculator</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="Calculator"
          onPress={() => {
            navigation.navigate("Notes");
          }}
        >
          <Text>Notes</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeScreen;
