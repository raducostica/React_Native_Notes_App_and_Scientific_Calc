import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const AuthButtons = ({
  func,
  loginText,
  navigateText,
  navigateButtonText,
  navigation
}) => {
  return (
    <>
      <TouchableOpacity style={styles.signInBtn} onPress={() => func()}>
        <Text style={styles.signInBtnText}>{loginText}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navigateBtn}
        onPress={() => navigation.navigate(navigateText)}
      >
        <Text style={styles.navigateBtnText}>{navigateButtonText}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  navigateBtn: {
    marginVertical: 10
  },
  navigateBtnText: {
    color: "#fff",
    fontSize: 16
  },
  signInBtn: {
    backgroundColor: "#ff5c33",
    paddingVertical: 10,
    width: "60%",
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 10
  },
  signInBtnText: {
    color: "#fff",
    fontSize: 18
  }
});

export default AuthButtons;
