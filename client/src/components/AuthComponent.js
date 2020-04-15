import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";

import Logo from "../components/Logo";

const AuthComponent = ({ component }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <Logo />
      <View
        // behavior={Platform.Os == "ios" ? "padding" : "height"}
        style={styles.signInStyles}
      >
        {component()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#444",
  },
  signInStyles: {
    flex: 0.7,
    backgroundColor: "#444",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
    zIndex: -1,
  },
});

export default AuthComponent;
