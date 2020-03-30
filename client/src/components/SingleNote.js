import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const SingleNote = ({ item, navigation, active, setActive }) => {
  const setInfo = () => {
    navigation.navigate("EditNote", {
      title: item.title,
      content: item.content,
      active
    });
  };
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        paddingVertical: 20,
        backgroundColor: "#fff",
        borderWidth: 0.5,
        borderColor: "rgba(0, 0, 0, 0.5)"
      }}
      onPress={() => setInfo()}
    >
      <View
        style={{
          position: "absolute",
          backgroundColor: "red",
          left: 0,
          bottom: 0,
          top: 0,
          flex: 1,
          width: 10
        }}
      ></View>
      <Text style={{ fontSize: 18, paddingLeft: 20 }}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default SingleNote;
