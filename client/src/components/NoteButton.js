import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const NoteButton = ({ str, fn }) => {
  return (
    <TouchableOpacity style={styles.addBtnView} onPress={() => fn()}>
      <Text style={{ fontSize: 25 }}>{str}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addBtnView: {
    backgroundColor: "red",
    height: 60,
    width: 60,
    position: "absolute",
    right: 15,
    bottom: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default NoteButton;
