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
          height: window.width / 1.7,
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
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "blue",
          }}
        >
          <View
            style={{
              height: window.width / 1.7,
              width: window.width,
              position: "absolute",
              bottom: 0,
              marginLeft: window.width / 2,
              backgroundColor: "#ff704d",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="user" size={70} />
            <Text style={{ paddingVertical: 20, fontSize: 17 }}>@Radz</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#333",
            height: "35%",
            width: "35%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <TouchableOpacity
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            title="Calculator"
            onPress={() => {
              navigation.navigate("Calculator");
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>Calculator</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "#333",
            height: "35%",
            width: "35%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <TouchableOpacity
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            title="Calculator"
            onPress={() => {
              navigation.navigate("Notes");
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>Notes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
