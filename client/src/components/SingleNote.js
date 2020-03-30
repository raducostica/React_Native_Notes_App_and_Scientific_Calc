import React from "react";
import { Text, View, TouchableOpacity, Animated } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { NotesContext } from "../context/NotesContext";

const RightActions = ({ progress, dragX, onPress, item }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={{ backgroundColor: "red", justifyContent: "flex-end" }}>
        <Animated.Text
          style={[
            { fontSize: 18, padding: 20, fontWeight: "600" },
            { transform: [{ scale }] }
          ]}
        >
          Delete
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

const SingleNote = ({ item, navigation, active, delNote }) => {
  const { deleteNote } = React.useContext(NotesContext);
  const setInfo = () => {
    navigation.navigate("EditNote", {
      item,
      active
    });
  };

  return (
    <Swipeable
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          onPress={delNote}
          item={item}
        />
      )}
    >
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
    </Swipeable>
  );
};

export default SingleNote;
