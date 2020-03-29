import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import * as Font from "expo-font";

const Logo = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "monoton-regular": require("../../assets/fonts/Monoton-Regular.ttf")
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  return (
    <View style={styles.logo}>
      <View style={styles.triangleDesign}></View>
      <View style={styles.triangleDesign1}></View>
      <View style={styles.logoBG}>
        {fontLoaded ? <Text style={styles.logoText}>R</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    flex: 0.3,
    backgroundColor: "#444",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  logoBG: {
    backgroundColor: "#ff5c33",
    width: "43%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 55,
    zIndex: 999
  },
  logoText: {
    fontFamily: "monoton-regular",
    fontSize: 100,
    color: "#fff"
  },
  triangleDesign: {
    flex: 1,
    backgroundColor: "#ffd6cc",
    width: "150%",
    transform: [{ skewY: "20deg" }]
    // width: 0,
    // height: 0,
    // backgroundColor: "transparent",
    // borderStyle: "solid",
    // borderRightWidth: 320,
    // borderTopWidth: 320,
    // borderRightColor: "transparent",
    // borderTopColor: "#ffd6cc",
    // alignSelf: "flex-end",
    // position: "absolute",
    // top: 0,
    // zIndex: 5,
    // transform: [{ rotate: "90deg" }]
  },
  triangleDesign1: {
    backgroundColor: "#ffd6cc",
    height: "50%",
    width: "100%",
    position: "absolute",
    top: 0
  }
});

export default Logo;
