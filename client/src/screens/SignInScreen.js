import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

import { AuthContext } from "../context/AuthContext";

const SignInScreen = ({ navigation }) => {
  const { authContext } = useContext(AuthContext);
  let navigate = useNavigation();

  const [fontLoaded, setFontLoaded] = useState(false);
  const { signIn } = authContext;

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "monoton-regular": require("../../assets/fonts/Monoton-Regular.ttf")
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const handleChange = (text, name) => {
    setState({
      ...state,
      [name]: text
    });
  };

  const handleSubmit = async () => {
    console.log(state.username, state.password);
    let formData = {
      username: state.username,
      password: state.password
    };
    try {
      signIn(formData);
    } catch (error) {
      console.log(error);
      setState({
        username: "",
        password: ""
      });
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.logo}>
        <View
          style={[
            {
              width: 500,
              height: 300,
              backgroundColor: "coral",
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderRightWidth: 350,
              borderTopWidth: 420,
              borderRightColor: "transparent",
              borderTopColor: "coral",
              alignSelf: "flex-end",
              position: "absolute",
              top: 0,
              zIndex: 5
            },
            {
              transform: [{ skewY: "30deg" }]
            }
          ]}
        ></View>
        <View
          style={{
            backgroundColor: "red",
            flex: 0.7,
            width: "40%",
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 80,
            zIndex: 999
          }}
        >
          {fontLoaded ? <Text style={styles.logoText}>R</Text> : null}
        </View>
      </View>
      <View style={styles.signInStyles}>
        <TextInput
          style={styles.inputs}
          name="username"
          maxLength={16}
          placeholder="username"
          value={state.username}
          onChangeText={text => handleChange(text, "username")}
        />

        <TextInput
          style={styles.inputs}
          name="password"
          maxLength={16}
          placeholder="password"
          value={state.password}
          onChangeText={text => handleChange(text, "password")}
        />

        <TouchableOpacity
          style={styles.navigateBtn}
          onPress={() => navigation.navigate("Sign Up")}
        >
          <Text>Not signed up? Sign Up Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signInBtn}
          onPress={() => handleSubmit()}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "red"
  },
  logo: {
    flex: 0.3,
    backgroundColor: "blue",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  logoText: {
    fontFamily: "monoton-regular",
    fontSize: 100
  },
  signInStyles: {
    flex: 0.7,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,
    zIndex: -1
  },
  inputs: {
    backgroundColor: "red",
    marginVertical: 18,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 1,
    fontSize: 18,
    paddingLeft: 15,
    width: "70%"
  },
  navigateBtn: {
    backgroundColor: "blue",
    marginVertical: 15
  },
  signInBtn: {
    backgroundColor: "red",
    paddingVertical: 10,
    width: "60%",
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 15
  }
});

export default SignInScreen;
